import * as core from './core.js';
const {
  DEFAULT_TOKEN,
  CHAIN_ID,
  CHAIN_LABEL,
  BSC_SCAN_BASE,
  DEXSCREENER_SEARCH_BASE,
  GECKOTERMINAL_API_BASE,
  GECKOTERMINAL_WEB_BASE,
  COINGECKO_API_BASE,
  COINGECKO_WEB_SEARCH_BASE,
  COINGECKO_PLATFORM_ID,
  DEAD_ADDRESS,
  ZERO_ADDRESS,
  ethers,
  RPC_ENDPOINTS,
  ERC20_ABI,
  OPTIONAL_ABI,
  RETURN_QUEUE_ABI,
  I18N_CONFIG,
  DEFAULT_LANGUAGE_PREFERENCE,
  RTL_LOCALES,
  state,
  setText,
  setHtml,
  setHref,
  setTitle,
  setWidth,
  setVisible,
  setSearchHint,
  resolveSupportedLocale,
  detectSystemLocale,
  getLanguageBundle,
  interpolate,
  t,
  getLanguageNativeLabel,
  getActiveLocale,
  persistLanguagePreference,
  loadLanguagePreference,
  createAppError,
  getErrorMessage,
  updateDocumentMetadata,
  rememberStaticFallbacks,
  renderLanguageOptions,
  setLanguageMenuOpen,
  applyI18nToDom,
  setSearchHintMessage,
  setSearchHintRaw,
  clearSearchHint,
  refreshSearchHint,
  applyLanguagePreference,
  escapeHtml,
  hasContent,
  currentLocale,
  formatNumber,
  formatCompact,
  formatCurrency,
  formatCompactCurrency,
  buildCurrencyDisplay,
  formatPercent,
  formatDate,
  formatTimeLabel,
  shortAddress,
  formatTokenAmount,
  toBigIntValue,
  normalizeAddressValue,
  formatUnitsValue,
  formatScaledCurrencyValue,
  formatPerMilleValue,
  formatMultiplierValue,
  formatTimestampValue,
  formatSecondsValue,
  formatDaysValue,
  formatTradeCount,
  formatOwnerStatus,
  getSourceLabel,
  ratio,
  clipRatio,
  formatDisplayCap,
  hostFromUrl,
  safeNumber,
  formatDexId,
  parsePairName,
  formatChartPointLabel,
  normalizeChartPoints,
  findNearestChartPoint,
  derivePriceChangesFromChart,
  pickFirstFinite,
  hasMarketData,
  getPairLabel,
  resolveCapMetrics,
  daysSince,
  getProvider,
  readOptional,
  readOptionalMap,
  fetchJson,
  extractTokenAddress
} = core;

const CHAIN_CACHE_TTL_MS = 5 * 60 * 1000;
const MARKET_CACHE_TTL_MS = 30 * 1000;
const ADDRESS_CACHE_TTL_MS = 30 * 1000;
const INDEX_SCALE = 1000000000000000000n;
const RETURN_QUEUE_SCAN_LIMIT = 240;
const RETURN_QUEUE_SCAN_BATCH = 24;
const chainCache = new Map();
const marketCache = new Map();
const addressCache = new Map();
const pendingChainRequests = new Map();
const pendingMarketRequests = new Map();
const pendingAddressRequests = new Map();

function getCacheKey(address) {
  return String(address || "").toLowerCase();
}

function getCachedValue(cache, key, ttlMs) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > ttlMs) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

function setCachedValue(cache, key, value) {
  cache.set(key, { value, timestamp: Date.now() });
  return value;
}

function deriveIndexReward(positionRaw, globalIndexRaw, userIndexRaw) {
  const position = toBigIntValue(positionRaw);
  const globalIndex = toBigIntValue(globalIndexRaw);
  const userIndex = toBigIntValue(userIndexRaw);

  if (position === null || globalIndex === null || userIndex === null || position <= 0n || globalIndex <= userIndex) {
    return null;
  }

  return (position * (globalIndex - userIndex)) / INDEX_SCALE;
}

async function readReturnQueueSnapshot(tokenAddress, tokenContract, poolAddress, provider) {
  const normalizedPoolAddress = normalizeAddressValue(poolAddress);
  if (!normalizedPoolAddress) {
    return null;
  }

  const queueContract = new ethers.Contract(normalizedPoolAddress, RETURN_QUEUE_ABI, provider);
  const baseRaw = await readOptionalMap(queueContract, [
    "token",
    "queueLen",
    "currentIdx",
    "MAX_LOOP",
    ["amountBefore", [ZERO_ADDRESS]],
  ]);
  const balanceRawMap = await readOptionalMap(tokenContract, [["balanceOf", [normalizedPoolAddress]]]);

  const queueLenRaw = toBigIntValue(baseRaw.queueLen);
  const currentIdxRaw = toBigIntValue(baseRaw.currentIdx);
  const maxLoopRaw = toBigIntValue(baseRaw.MAX_LOOP);
  const totalPendingRaw = toBigIntValue(baseRaw.amountBefore);
  const poolBalanceRaw = toBigIntValue(balanceRawMap.balanceOf);
  const queueToken = normalizeAddressValue(baseRaw.token);

  let headAmountRaw = null;
  let headClaimedRaw = null;
  let headRemainingRaw = null;
  let headAddress = null;

  if (queueLenRaw !== null && currentIdxRaw !== null && currentIdxRaw >= 0n && currentIdxRaw < queueLenRaw) {
    const headRaw = await readOptionalMap(queueContract, [
      ["amountQueue", [currentIdxRaw]],
      ["claimedQueue", [currentIdxRaw]],
      ["addressQueue", [currentIdxRaw]],
    ]);

    headAmountRaw = toBigIntValue(headRaw.amountQueue);
    headClaimedRaw = toBigIntValue(headRaw.claimedQueue);
    headAddress = normalizeAddressValue(headRaw.addressQueue);
    if (headAmountRaw !== null) {
      headRemainingRaw = headAmountRaw - (headClaimedRaw || 0n);
      if (headRemainingRaw < 0n) {
        headRemainingRaw = 0n;
      }
    }
  }

  const remainingEntriesRaw =
    queueLenRaw !== null && currentIdxRaw !== null && queueLenRaw >= currentIdxRaw ? queueLenRaw - currentIdxRaw : null;
  const coveragePercent =
    totalPendingRaw !== null && totalPendingRaw > 0n && poolBalanceRaw !== null
      ? Number((poolBalanceRaw * 10000n) / totalPendingRaw) / 100
      : NaN;
  const normalizedTokenAddress = normalizeAddressValue(tokenAddress);
  const supportsQueue =
    queueLenRaw !== null ||
    currentIdxRaw !== null ||
    totalPendingRaw !== null ||
    headAmountRaw !== null ||
    headAddress !== null;

  if (!supportsQueue) {
    return null;
  }

  return {
    supported: true,
    address: normalizedPoolAddress,
    queueToken,
    queueMatchesToken: !queueToken || !normalizedTokenAddress ? true : queueToken === normalizedTokenAddress,
    queueLenRaw,
    currentIdxRaw,
    remainingEntriesRaw,
    totalPendingRaw,
    poolBalanceRaw,
    coveragePercent,
    maxLoopRaw,
    headAmountRaw,
    headClaimedRaw,
    headRemainingRaw,
    headAddress,
  };
}

async function scanReturnQueueAheadMetrics(queueAddress, userAddress, returnQueueMeta, provider) {
  const currentIdxRaw = toBigIntValue(returnQueueMeta?.currentIdxRaw);
  const queueLenRaw = toBigIntValue(returnQueueMeta?.queueLenRaw);
  const normalizedUserAddress = normalizeAddressValue(userAddress);

  if (!queueAddress || !normalizedUserAddress || currentIdxRaw === null || queueLenRaw === null || currentIdxRaw >= queueLenRaw) {
    return null;
  }

  const remainingEntriesRaw = queueLenRaw - currentIdxRaw;
  if (remainingEntriesRaw <= 0n) {
    return {
      found: false,
      truncated: false,
      scannedEntriesCount: 0,
      uniqueAddressesAheadCount: 0,
      entryCountAhead: 0,
    };
  }

  const scanLimit = Math.min(Number(remainingEntriesRaw), RETURN_QUEUE_SCAN_LIMIT);
  const queueContract = new ethers.Contract(queueAddress, RETURN_QUEUE_ABI, provider);
  const aheadAddresses = new Set();
  let found = false;
  let entryCountAhead = 0;
  let scannedEntriesCount = 0;

  for (let offset = 0; offset < scanLimit && !found; offset += RETURN_QUEUE_SCAN_BATCH) {
    const batchSize = Math.min(RETURN_QUEUE_SCAN_BATCH, scanLimit - offset);
    const calls = [];

    for (let index = 0; index < batchSize; index += 1) {
      calls.push(readOptional(queueContract, "addressQueue", [currentIdxRaw + BigInt(offset + index)]));
    }

    const addresses = await Promise.all(calls);
    for (const rawAddress of addresses) {
      const candidate = normalizeAddressValue(rawAddress);
      if (!candidate) {
        scannedEntriesCount += 1;
        entryCountAhead += 1;
        continue;
      }

      if (candidate === normalizedUserAddress) {
        found = true;
        break;
      }

      aheadAddresses.add(candidate);
      scannedEntriesCount += 1;
      entryCountAhead += 1;
    }
  }

  return {
    found,
    truncated: !found && scanLimit < Number(remainingEntriesRaw),
    scannedEntriesCount,
    uniqueAddressesAheadCount: aheadAddresses.size,
    entryCountAhead,
  };
}

async function readProtocolAddressSnapshotFresh(tokenAddress, userAddress, profile) {
  const { provider } = await getProvider();
  const contract = new ethers.Contract(tokenAddress, [...ERC20_ABI, ...OPTIONAL_ABI], provider);

  const userMethods = [
    ["unclaimed", [userAddress]],
    ["nodes", [userAddress]],
    ["lptOf", [userAddress]],
    ["LPContribution", [userAddress]],
    ["userIndex", [userAddress]],
    ["userNodeIndex", [userAddress]],
    ["sharedLP", [userAddress]],
    ["sharedEquity", [userAddress]],
    ["referee", [userAddress]],
  ];
  const raw = await readOptionalMap(contract, userMethods);

  const lastTotalLpRaw = toBigIntValue(profile?.optionalValuesRaw?.lastTotalLP);
  const globalIndexRaw = toBigIntValue(profile?.optionalValuesRaw?.globalIndex);
  const globalNodeIndexRaw = toBigIntValue(profile?.optionalValuesRaw?.globalNodeIndex);
  const lpBalanceRaw = toBigIntValue(raw.lptOf);
  const nodeCountRaw = toBigIntValue(raw.nodes);
  const contributionRaw = toBigIntValue(raw.LPContribution);
  const sharedLpRaw = toBigIntValue(raw.sharedLP);
  const sharedEquityRaw = toBigIntValue(raw.sharedEquity);
  const totalPendingRaw = toBigIntValue(raw.unclaimed);
  const lpPendingEstimateRaw = deriveIndexReward(lpBalanceRaw, globalIndexRaw, raw.userIndex);
  const nodePendingEstimateRaw = deriveIndexReward(nodeCountRaw, globalNodeIndexRaw, raw.userNodeIndex);
  const referrer = normalizeAddressValue(raw.referee);
  const returnQueue = profile?.returnQueue;
  let returnQueueAheadRaw = null;
  let returnQueueActive = false;
  let returnQueueIsHead = false;
  let returnQueueGapRaw = null;
  let returnQueueAheadAddressCount = null;
  let returnQueueAheadEntryCount = null;
  let returnQueueScanTruncated = false;
  let returnQueueScanFound = false;
  let returnQueueScannedEntriesCount = 0;

  if (returnQueue?.supported && returnQueue.address) {
    const queueContract = new ethers.Contract(returnQueue.address, RETURN_QUEUE_ABI, provider);
    const queueRaw = await readOptionalMap(queueContract, [["amountBefore", [userAddress]]]);
    returnQueueAheadRaw = toBigIntValue(queueRaw.amountBefore);

    const totalPendingRaw = toBigIntValue(returnQueue.totalPendingRaw);
    const poolBalanceRaw = toBigIntValue(returnQueue.poolBalanceRaw);
    const headAddress = normalizeAddressValue(returnQueue.headAddress);
    const normalizedUserAddress = normalizeAddressValue(userAddress);

    if (
      normalizedUserAddress &&
      totalPendingRaw !== null &&
      totalPendingRaw > 0n &&
      returnQueueAheadRaw !== null
    ) {
      returnQueueIsHead = Boolean(headAddress && headAddress === normalizedUserAddress);
      returnQueueActive = returnQueueIsHead || returnQueueAheadRaw < totalPendingRaw;

      if (returnQueueActive && poolBalanceRaw !== null) {
        returnQueueGapRaw = returnQueueAheadRaw > poolBalanceRaw ? returnQueueAheadRaw - poolBalanceRaw : 0n;
      }
    }

    if (returnQueueIsHead) {
      returnQueueAheadAddressCount = 0;
      returnQueueAheadEntryCount = 0;
      returnQueueScanFound = true;
    } else if (returnQueueActive) {
      const aheadMetrics = await scanReturnQueueAheadMetrics(returnQueue.address, userAddress, returnQueue, provider);
      if (aheadMetrics) {
        returnQueueAheadAddressCount = aheadMetrics.uniqueAddressesAheadCount;
        returnQueueAheadEntryCount = aheadMetrics.entryCountAhead;
        returnQueueScanTruncated = aheadMetrics.truncated;
        returnQueueScanFound = aheadMetrics.found;
        returnQueueScannedEntriesCount = aheadMetrics.scannedEntriesCount;
      }
    }
  }

  const availableFields = [
    totalPendingRaw !== null && totalPendingRaw >= 0n ? "pending" : "",
    nodeCountRaw !== null ? "nodes" : "",
    lpBalanceRaw !== null ? "lp" : "",
    contributionRaw !== null ? "contribution" : "",
    sharedLpRaw !== null ? "sharedLp" : "",
    sharedEquityRaw !== null ? "sharedEquity" : "",
    referrer ? "referrer" : "",
    lpPendingEstimateRaw !== null ? "lpPending" : "",
    nodePendingEstimateRaw !== null ? "nodePending" : "",
    returnQueueAheadRaw !== null ? "returnQueue" : "",
  ].filter(Boolean);

  return {
    tokenAddress,
    address: userAddress,
    availableFields,
    supported: availableFields.length > 0,
    pendingRewardRaw: totalPendingRaw,
    nodeCountRaw,
    lpBalanceRaw,
    contributionRaw,
    sharedLpRaw,
    sharedEquityRaw,
    lpPendingEstimateRaw,
    nodePendingEstimateRaw,
    referrer,
    returnQueueAheadRaw,
    returnQueueActive,
    returnQueueIsHead,
    returnQueueGapRaw,
    returnQueueAheadAddressCount,
    returnQueueAheadEntryCount,
    returnQueueScanTruncated,
    returnQueueScanFound,
    returnQueueScannedEntriesCount,
    lastTotalLpRaw,
    checkedAt: new Date(),
  };
}
async function readTokenProfileFresh(address) {
  const { provider, url } = await getProvider();
  const contract = new ethers.Contract(address, [...ERC20_ABI, ...OPTIONAL_ABI], provider);

  const [nameRaw, symbolRaw, decimalsRaw, totalSupplyRaw, deadBalanceRaw, zeroBalanceRaw] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.decimals(),
    contract.totalSupply(),
    contract.balanceOf(DEAD_ADDRESS),
    contract.balanceOf(ZERO_ADDRESS),
  ]);

  const decimals = Number(decimalsRaw);
  const totalSupply = Number(ethers.formatUnits(totalSupplyRaw, decimals));
  const burnedRaw = BigInt(deadBalanceRaw || 0) + BigInt(zeroBalanceRaw || 0);
  const burnedSupply = Number(ethers.formatUnits(burnedRaw, decimals));
  const circulatingSupply = Math.max(totalSupply - burnedSupply, 0);
  const burnRatio = ratio(burnedSupply, totalSupply);

  const optionalMethods = [
    "owner",
    "peakPrice",
    "totalNodes",
    "lastTotalLP",
    "littlePool",
    "techPool",
    "isStart",
    "usdt",
    "ecologyAddress",
    "projectOwner",
    "openPan",
    "uniswapRouter",
    "uniswapPair",
    "minTime",
    "isBuyFee",
    "isSellFee",
    "buyFee",
    "sellFee",
    "sellFeeEcology",
    "ownLpU",
    "directAccumulation",
    "burnAddr",
    "profitFee",
    "profitFeeDead",
    "maxSellAmountIndex",
    "productionFactor",
    "crashReferencePrice",
    "effectiveLpU",
    "startTime",
    "lastUpdateTime",
    "totalLpU",
    "castingAddress",
    "effectiveLpCount",
    "queueLen",
    "currentIdx",
    "isSellBurn",
    "recycleDay",
    "getTokenPrice",
    "pancakeFactory",
    "pancakePair",
    "globalIndex",
    "globalNodeIndex",
    "lastUpdate",
  ];
  const optionalValues = await readOptionalMap(contract, optionalMethods);
  const returnQueue = await readReturnQueueSnapshot(address, contract, optionalValues.littlePool, provider);

  const ownerRaw = optionalValues.owner;

  const owner = typeof ownerRaw === "string" && ethers.isAddress(ownerRaw) ? ethers.getAddress(ownerRaw) : null;
  let ownerStatus = "unreadable";
  if (owner) {
    ownerStatus = owner === ZERO_ADDRESS ? "renounced" : "managed";
  }

  const extras = [];
  const addressLinks = [];
  const seenAddressValues = new Set();
  const pushExtra = (item) => {
    if (item && hasContent(item.value)) {
      extras.push(item);
    }
  };
  const pushAddressLink = (label, rawValue, note) => {
    const addressValue = normalizeAddressValue(rawValue);
    if (!addressValue || addressValue === ZERO_ADDRESS) return;
    const addressKey = addressValue.toLowerCase();
    if (seenAddressValues.has(addressKey)) return;

    addressLinks.push({
      label,
      value: addressValue,
      href: `${BSC_SCAN_BASE}/address/${addressValue}`,
      note,
    });
    seenAddressValues.add(addressKey);
  };

  if (optionalValues.peakPrice !== null && optionalValues.peakPrice !== undefined) {
    pushExtra({
      label: "peakPrice",
      value: BigInt(optionalValues.peakPrice) === 0n ? "0" : BigInt(optionalValues.peakPrice).toString(),
      note: t("common.publicField", {}, "Public extra field"),
      mono: true,
    });
  }

  if (optionalValues.totalNodes !== null && optionalValues.totalNodes !== undefined) {
    pushExtra({
      label: t("extra.totalNodes", {}, "Total Nodes"),
      value: formatNumber(Number(optionalValues.totalNodes), 0),
      note: "totalNodes()",
    });
  }

  if (optionalValues.lastTotalLP !== null && optionalValues.lastTotalLP !== undefined) {
    pushExtra({
      label: t("extra.lastTotalLP", {}, "Last Total LP"),
      value: formatUnitsValue(optionalValues.lastTotalLP, decimals),
      note: "lastTotalLP()",
    });
  }

  if (optionalValues.isStart !== null && optionalValues.isStart !== undefined) {
    const startValue = BigInt(optionalValues.isStart);
    pushExtra({
      label: t("extra.startState", {}, "Start State"),
      value:
        startValue === 1n
          ? t("state.started", {}, "Started")
          : startValue === 0n
            ? t("state.notStarted", {}, "Not Started")
            : startValue.toString(),
      note: "isStart()",
    });
  }

  if (typeof optionalValues.openPan === "boolean") {
    pushExtra({
      label: t("extra.openPan", {}, "Trading Switch"),
      value: optionalValues.openPan ? t("state.enabled", {}, "Enabled") : t("state.disabled", {}, "Disabled"),
      note: "openPan()",
    });
  }

  if (optionalValues.minTime !== null && optionalValues.minTime !== undefined) {
    pushExtra({
      label: t("extra.minTime", {}, "Minimum Sell Cooldown"),
      value: formatSecondsValue(optionalValues.minTime),
      note: "minTime()",
    });
  }

  if (typeof optionalValues.isBuyFee === "boolean") {
    pushExtra({
      label: t("extra.isBuyFee", {}, "Buy Fee Switch"),
      value: optionalValues.isBuyFee ? t("state.enabled", {}, "Enabled") : t("state.disabled", {}, "Disabled"),
      note: "isBuyFee()",
    });
  }

  if (typeof optionalValues.isSellFee === "boolean") {
    pushExtra({
      label: t("extra.isSellFee", {}, "Sell Fee Switch"),
      value: optionalValues.isSellFee ? t("state.enabled", {}, "Enabled") : t("state.disabled", {}, "Disabled"),
      note: "isSellFee()",
    });
  }

  if (typeof optionalValues.isSellBurn === "boolean") {
    pushExtra({
      label: t("extra.isSellBurn", {}, "Sell Burn Switch"),
      value: optionalValues.isSellBurn ? t("state.enabled", {}, "Enabled") : t("state.disabled", {}, "Disabled"),
      note: "isSellBurn()",
    });
  }

  if (optionalValues.buyFee !== null && optionalValues.buyFee !== undefined) {
    pushExtra({
      label: t("extra.buyFee", {}, "Buy Fee Rate"),
      value: formatPerMilleValue(optionalValues.buyFee),
      note: "buyFee() / 1000",
    });
  }

  if (optionalValues.sellFee !== null && optionalValues.sellFee !== undefined) {
    pushExtra({
      label: t("extra.sellFee", {}, "Sell Fee Rate"),
      value: formatPerMilleValue(optionalValues.sellFee),
      note: "sellFee() / 1000",
    });
  }

  if (optionalValues.sellFeeEcology !== null && optionalValues.sellFeeEcology !== undefined) {
    pushExtra({
      label: t("extra.sellFeeEcology", {}, "Ecology Fee Rate"),
      value: formatPerMilleValue(optionalValues.sellFeeEcology),
      note: "sellFeeEcology() / 1000",
    });
  }

  if (optionalValues.profitFee !== null && optionalValues.profitFee !== undefined) {
    pushExtra({
      label: t("extra.profitFee", {}, "Profit Fee"),
      value: formatPerMilleValue(optionalValues.profitFee),
      note: "profitFee() / 1000",
    });
  }

  if (optionalValues.profitFeeDead !== null && optionalValues.profitFeeDead !== undefined) {
    pushExtra({
      label: t("extra.profitFeeDead", {}, "Profit Burn Fee"),
      value: formatPerMilleValue(optionalValues.profitFeeDead),
      note: "profitFeeDead() / 1000",
    });
  }

  if (optionalValues.ownLpU !== null && optionalValues.ownLpU !== undefined) {
    pushExtra({
      label: t("extra.ownLpU", {}, "Owned LP Threshold"),
      value: formatUnitsValue(optionalValues.ownLpU, decimals),
      note: "ownLpU()",
    });
  }

  if (optionalValues.directAccumulation !== null && optionalValues.directAccumulation !== undefined) {
    pushExtra({
      label: t("extra.directAccumulation", {}, "Direct Accumulation Threshold"),
      value: formatUnitsValue(optionalValues.directAccumulation, decimals),
      note: "directAccumulation()",
    });
  }

  if (optionalValues.effectiveLpU !== null && optionalValues.effectiveLpU !== undefined) {
    pushExtra({
      label: t("extra.effectiveLpU", {}, "Effective LP Threshold"),
      value: formatUnitsValue(optionalValues.effectiveLpU, decimals),
      note: "effectiveLpU()",
    });
  }

  if (optionalValues.effectiveLpCount !== null && optionalValues.effectiveLpCount !== undefined) {
    pushExtra({
      label: t("extra.effectiveLpCount", {}, "Effective LP Size"),
      value: formatUnitsValue(optionalValues.effectiveLpCount, decimals),
      note: "effectiveLpCount()",
    });
  }

  if (optionalValues.totalLpU !== null && optionalValues.totalLpU !== undefined) {
    pushExtra({
      label: t("extra.totalLpU", {}, "Total LP Size"),
      value: formatUnitsValue(optionalValues.totalLpU, decimals),
      note: "totalLpU()",
    });
  }

  if (optionalValues.maxSellAmountIndex !== null && optionalValues.maxSellAmountIndex !== undefined) {
    pushExtra({
      label: t("extra.maxSellAmountIndex", {}, "Max Sell Divisor"),
      value: `1 / ${formatNumber(Number(optionalValues.maxSellAmountIndex), 0)}`,
      note: "maxSellAmountIndex()",
    });
  }

  if (optionalValues.productionFactor !== null && optionalValues.productionFactor !== undefined) {
    pushExtra({
      label: t("extra.productionFactor", {}, "Production Factor"),
      value: formatMultiplierValue(optionalValues.productionFactor),
      note: "productionFactor()",
    });
  }

  const crashReferencePrice = toBigIntValue(optionalValues.crashReferencePrice);
  if (crashReferencePrice !== null && crashReferencePrice > 0n) {
    pushExtra({
      label: t("extra.crashReferencePrice", {}, "Crash Reference Price"),
      value: formatScaledCurrencyValue(crashReferencePrice),
      note: "crashReferencePrice()",
    });
  }

  const contractPriceUsd = Number(ethers.formatUnits(toBigIntValue(optionalValues.getTokenPrice) || 0n, 18));
  if (Number.isFinite(contractPriceUsd) && contractPriceUsd > 0) {
    pushExtra({
      label: t("extra.onchainPrice", {}, "On-Chain Price"),
      value: formatCurrency(contractPriceUsd, contractPriceUsd < 1 ? 6 : 2),
      note: "getTokenPrice()",
    });
  }

  if (optionalValues.startTime !== null && optionalValues.startTime !== undefined) {
    const formattedStartTime = formatTimestampValue(optionalValues.startTime);
    if (formattedStartTime !== "--") {
      pushExtra({
        label: t("extra.startTime", {}, "Start Time"),
        value: formattedStartTime,
        note: "startTime()",
      });
    }
  }

  if (optionalValues.lastUpdateTime !== null && optionalValues.lastUpdateTime !== undefined) {
    const formattedLastUpdate = formatTimestampValue(optionalValues.lastUpdateTime);
    if (formattedLastUpdate !== "--") {
      pushExtra({
        label: t("extra.lastUpdateTime", {}, "Last Settlement"),
        value: formattedLastUpdate,
        note: "lastUpdateTime()",
      });
    }
  }

  if (optionalValues.lastUpdate !== null && optionalValues.lastUpdate !== undefined) {
    const formattedProtocolUpdate = formatTimestampValue(optionalValues.lastUpdate);
    if (formattedProtocolUpdate !== "--") {
      pushExtra({
        label: t("extra.lastUpdate", {}, "Protocol Updated At"),
        value: formattedProtocolUpdate,
        note: "lastUpdate()",
      });
    }
  }

  if (optionalValues.globalIndex !== null && optionalValues.globalIndex !== undefined) {
    pushExtra({
      label: t("extra.globalIndex", {}, "Global LP Index"),
      value: BigInt(optionalValues.globalIndex).toString(),
      note: "globalIndex()",
      mono: true,
    });
  }

  if (optionalValues.globalNodeIndex !== null && optionalValues.globalNodeIndex !== undefined) {
    pushExtra({
      label: t("extra.globalNodeIndex", {}, "Global Node Index"),
      value: BigInt(optionalValues.globalNodeIndex).toString(),
      note: "globalNodeIndex()",
      mono: true,
    });
  }

  if (optionalValues.recycleDay !== null && optionalValues.recycleDay !== undefined) {
    pushExtra({
      label: t("extra.recycleDay", {}, "Recycle Trigger Days"),
      value: formatDaysValue(optionalValues.recycleDay),
      note: "recycleDay()",
    });
  }

  if (optionalValues.queueLen !== null && optionalValues.queueLen !== undefined) {
    pushExtra({
      label: t("extra.queueLen", {}, "Reward Queue Length"),
      value: formatNumber(Number(optionalValues.queueLen), 0),
      note: "queueLen()",
    });
  }

  if (optionalValues.currentIdx !== null && optionalValues.currentIdx !== undefined) {
    pushExtra({
      label: t("extra.currentIdx", {}, "Reward Queue Progress"),
      value: formatNumber(Number(optionalValues.currentIdx), 0),
      note: "currentIdx()",
    });
  }

  pushAddressLink(t("address.uniswapPair", {}, "On-Chain LP Pair"), optionalValues.uniswapPair, "uniswapPair()");
  pushAddressLink(t("address.uniswapRouter", {}, "Router"), optionalValues.uniswapRouter, "uniswapRouter()");
  pushAddressLink(t("address.usdt", {}, "Quote Token"), optionalValues.usdt, "usdt()");
  pushAddressLink(t("address.ecologyAddress", {}, "Ecology Address"), optionalValues.ecologyAddress, "ecologyAddress()");
  pushAddressLink(t("address.projectOwner", {}, "Project Share Address"), optionalValues.projectOwner, "projectOwner()");
  pushAddressLink(t("address.castingAddress", {}, "Casting / Recycle Address"), optionalValues.castingAddress, "castingAddress()");
  pushAddressLink(t("address.burnAddr", {}, "Burn Address"), optionalValues.burnAddr, "burnAddr()");
  pushAddressLink(t("address.pancakeFactory", {}, "Pancake Factory"), optionalValues.pancakeFactory, "pancakeFactory()");
  pushAddressLink(t("address.pancakePair", {}, "Pancake Pair"), optionalValues.pancakePair, "pancakePair()");
  pushAddressLink(t("address.littlePool", {}, "littlePool"), optionalValues.littlePool, "littlePool()");
  pushAddressLink(t("address.techPool", {}, "techPool"), optionalValues.techPool, "techPool()");

  return {
    address,
    name: String(nameRaw || "Unknown Token"),
    symbol: String(symbolRaw || "TOKEN"),
    decimals,
    totalSupply,
    burnedSupply,
    circulatingSupply,
    burnRatio,
    owner,
    ownerStatus,
    extras,
    addressLinks,
    optionalValuesRaw: optionalValues,
    returnQueue,
    contractPriceUsd: Number.isFinite(contractPriceUsd) && contractPriceUsd > 0 ? contractPriceUsd : NaN,
    rpcUrl: url,
    checkedAt: new Date(),
  };
}

function buildProfileDynamicFields(optionalValues = {}, decimals = 18) {
  const extras = [];
  const addressLinks = [];
  const seenAddressValues = new Set();

  const pushExtra = (item) => {
    if (item && hasContent(item.value)) {
      extras.push(item);
    }
  };

  const pushAddressLink = (translationKey, fallback, rawValue, note) => {
    const addressValue = normalizeAddressValue(rawValue);
    if (!addressValue || addressValue === ZERO_ADDRESS) return;
    const addressKey = addressValue.toLowerCase();
    if (seenAddressValues.has(addressKey)) return;

    addressLinks.push({
      label: t(translationKey, {}, fallback),
      value: addressValue,
      href: `${BSC_SCAN_BASE}/address/${addressValue}`,
      note,
    });
    seenAddressValues.add(addressKey);
  };

  if (optionalValues.peakPrice !== null && optionalValues.peakPrice !== undefined) {
    pushExtra({
      label: "peakPrice",
      value: BigInt(optionalValues.peakPrice) === 0n ? "0" : BigInt(optionalValues.peakPrice).toString(),
      note: t("common.publicField", {}, "Public extra field"),
      mono: true,
    });
  }

  if (optionalValues.totalNodes !== null && optionalValues.totalNodes !== undefined) {
    pushExtra({
      label: t("extra.totalNodes", {}, "Total Nodes"),
      value: formatNumber(Number(optionalValues.totalNodes), 0),
      note: "totalNodes()",
    });
  }

  if (optionalValues.lastTotalLP !== null && optionalValues.lastTotalLP !== undefined) {
    pushExtra({
      label: t("extra.lastTotalLP", {}, "Last Total LP"),
      value: formatUnitsValue(optionalValues.lastTotalLP, decimals),
      note: "lastTotalLP()",
    });
  }

  if (optionalValues.isStart !== null && optionalValues.isStart !== undefined) {
    const startValue = BigInt(optionalValues.isStart);
    pushExtra({
      label: t("extra.startState", {}, "Start State"),
      value:
        startValue === 1n
          ? t("state.started", {}, "Started")
          : startValue === 0n
            ? t("state.notStarted", {}, "Not Started")
            : startValue.toString(),
      note: "isStart()",
    });
  }

  if (typeof optionalValues.openPan === "boolean") {
    pushExtra({
      label: t("extra.openPan", {}, "Trading Switch"),
      value: optionalValues.openPan ? t("state.enabled", {}, "Enabled") : t("state.disabled", {}, "Disabled"),
      note: "openPan()",
    });
  }

  if (optionalValues.minTime !== null && optionalValues.minTime !== undefined) {
    pushExtra({
      label: t("extra.minTime", {}, "Minimum Sell Cooldown"),
      value: formatSecondsValue(optionalValues.minTime),
      note: "minTime()",
    });
  }

  if (typeof optionalValues.isBuyFee === "boolean") {
    pushExtra({
      label: t("extra.isBuyFee", {}, "Buy Fee Switch"),
      value: optionalValues.isBuyFee ? t("state.enabled", {}, "Enabled") : t("state.disabled", {}, "Disabled"),
      note: "isBuyFee()",
    });
  }

  if (typeof optionalValues.isSellFee === "boolean") {
    pushExtra({
      label: t("extra.isSellFee", {}, "Sell Fee Switch"),
      value: optionalValues.isSellFee ? t("state.enabled", {}, "Enabled") : t("state.disabled", {}, "Disabled"),
      note: "isSellFee()",
    });
  }

  if (typeof optionalValues.isSellBurn === "boolean") {
    pushExtra({
      label: t("extra.isSellBurn", {}, "Sell Burn Switch"),
      value: optionalValues.isSellBurn ? t("state.enabled", {}, "Enabled") : t("state.disabled", {}, "Disabled"),
      note: "isSellBurn()",
    });
  }

  if (optionalValues.buyFee !== null && optionalValues.buyFee !== undefined) {
    pushExtra({
      label: t("extra.buyFee", {}, "Buy Fee Rate"),
      value: formatPerMilleValue(optionalValues.buyFee),
      note: "buyFee() / 1000",
    });
  }

  if (optionalValues.sellFee !== null && optionalValues.sellFee !== undefined) {
    pushExtra({
      label: t("extra.sellFee", {}, "Sell Fee Rate"),
      value: formatPerMilleValue(optionalValues.sellFee),
      note: "sellFee() / 1000",
    });
  }

  if (optionalValues.sellFeeEcology !== null && optionalValues.sellFeeEcology !== undefined) {
    pushExtra({
      label: t("extra.sellFeeEcology", {}, "Ecology Fee Rate"),
      value: formatPerMilleValue(optionalValues.sellFeeEcology),
      note: "sellFeeEcology() / 1000",
    });
  }

  if (optionalValues.profitFee !== null && optionalValues.profitFee !== undefined) {
    pushExtra({
      label: t("extra.profitFee", {}, "Profit Fee"),
      value: formatPerMilleValue(optionalValues.profitFee),
      note: "profitFee() / 1000",
    });
  }

  if (optionalValues.profitFeeDead !== null && optionalValues.profitFeeDead !== undefined) {
    pushExtra({
      label: t("extra.profitFeeDead", {}, "Profit Burn Fee"),
      value: formatPerMilleValue(optionalValues.profitFeeDead),
      note: "profitFeeDead() / 1000",
    });
  }

  if (optionalValues.ownLpU !== null && optionalValues.ownLpU !== undefined) {
    pushExtra({
      label: t("extra.ownLpU", {}, "Owned LP Threshold"),
      value: formatUnitsValue(optionalValues.ownLpU, decimals),
      note: "ownLpU()",
    });
  }

  if (optionalValues.directAccumulation !== null && optionalValues.directAccumulation !== undefined) {
    pushExtra({
      label: t("extra.directAccumulation", {}, "Direct Accumulation Threshold"),
      value: formatUnitsValue(optionalValues.directAccumulation, decimals),
      note: "directAccumulation()",
    });
  }

  if (optionalValues.effectiveLpU !== null && optionalValues.effectiveLpU !== undefined) {
    pushExtra({
      label: t("extra.effectiveLpU", {}, "Effective LP Threshold"),
      value: formatUnitsValue(optionalValues.effectiveLpU, decimals),
      note: "effectiveLpU()",
    });
  }

  if (optionalValues.effectiveLpCount !== null && optionalValues.effectiveLpCount !== undefined) {
    pushExtra({
      label: t("extra.effectiveLpCount", {}, "Effective LP Size"),
      value: formatUnitsValue(optionalValues.effectiveLpCount, decimals),
      note: "effectiveLpCount()",
    });
  }

  if (optionalValues.totalLpU !== null && optionalValues.totalLpU !== undefined) {
    pushExtra({
      label: t("extra.totalLpU", {}, "Total LP Size"),
      value: formatUnitsValue(optionalValues.totalLpU, decimals),
      note: "totalLpU()",
    });
  }

  if (optionalValues.maxSellAmountIndex !== null && optionalValues.maxSellAmountIndex !== undefined) {
    pushExtra({
      label: t("extra.maxSellAmountIndex", {}, "Max Sell Divisor"),
      value: `1 / ${formatNumber(Number(optionalValues.maxSellAmountIndex), 0)}`,
      note: "maxSellAmountIndex()",
    });
  }

  if (optionalValues.productionFactor !== null && optionalValues.productionFactor !== undefined) {
    pushExtra({
      label: t("extra.productionFactor", {}, "Production Factor"),
      value: formatMultiplierValue(optionalValues.productionFactor),
      note: "productionFactor()",
    });
  }

  const crashReferencePrice = toBigIntValue(optionalValues.crashReferencePrice);
  if (crashReferencePrice !== null && crashReferencePrice > 0n) {
    pushExtra({
      label: t("extra.crashReferencePrice", {}, "Crash Reference Price"),
      value: formatScaledCurrencyValue(crashReferencePrice),
      note: "crashReferencePrice()",
    });
  }

  const contractPriceUsd = Number(ethers.formatUnits(toBigIntValue(optionalValues.getTokenPrice) || 0n, 18));
  if (Number.isFinite(contractPriceUsd) && contractPriceUsd > 0) {
    pushExtra({
      label: t("extra.onchainPrice", {}, "On-Chain Price"),
      value: formatCurrency(contractPriceUsd, contractPriceUsd < 1 ? 6 : 2),
      note: "getTokenPrice()",
    });
  }

  if (optionalValues.startTime !== null && optionalValues.startTime !== undefined) {
    const formattedStartTime = formatTimestampValue(optionalValues.startTime);
    if (formattedStartTime !== "--") {
      pushExtra({
        label: t("extra.startTime", {}, "Start Time"),
        value: formattedStartTime,
        note: "startTime()",
      });
    }
  }

  if (optionalValues.lastUpdateTime !== null && optionalValues.lastUpdateTime !== undefined) {
    const formattedLastUpdate = formatTimestampValue(optionalValues.lastUpdateTime);
    if (formattedLastUpdate !== "--") {
      pushExtra({
        label: t("extra.lastUpdateTime", {}, "Last Settlement"),
        value: formattedLastUpdate,
        note: "lastUpdateTime()",
      });
    }
  }

  if (optionalValues.lastUpdate !== null && optionalValues.lastUpdate !== undefined) {
    const formattedProtocolUpdate = formatTimestampValue(optionalValues.lastUpdate);
    if (formattedProtocolUpdate !== "--") {
      pushExtra({
        label: t("extra.lastUpdate", {}, "Protocol Updated At"),
        value: formattedProtocolUpdate,
        note: "lastUpdate()",
      });
    }
  }

  if (optionalValues.globalIndex !== null && optionalValues.globalIndex !== undefined) {
    pushExtra({
      label: t("extra.globalIndex", {}, "Global LP Index"),
      value: BigInt(optionalValues.globalIndex).toString(),
      note: "globalIndex()",
      mono: true,
    });
  }

  if (optionalValues.globalNodeIndex !== null && optionalValues.globalNodeIndex !== undefined) {
    pushExtra({
      label: t("extra.globalNodeIndex", {}, "Global Node Index"),
      value: BigInt(optionalValues.globalNodeIndex).toString(),
      note: "globalNodeIndex()",
      mono: true,
    });
  }

  if (optionalValues.recycleDay !== null && optionalValues.recycleDay !== undefined) {
    pushExtra({
      label: t("extra.recycleDay", {}, "Recycle Trigger Days"),
      value: formatDaysValue(optionalValues.recycleDay),
      note: "recycleDay()",
    });
  }

  if (optionalValues.queueLen !== null && optionalValues.queueLen !== undefined) {
    pushExtra({
      label: t("extra.queueLen", {}, "Reward Queue Length"),
      value: formatNumber(Number(optionalValues.queueLen), 0),
      note: "queueLen()",
    });
  }

  if (optionalValues.currentIdx !== null && optionalValues.currentIdx !== undefined) {
    pushExtra({
      label: t("extra.currentIdx", {}, "Reward Queue Progress"),
      value: formatNumber(Number(optionalValues.currentIdx), 0),
      note: "currentIdx()",
    });
  }

  pushAddressLink("address.uniswapPair", "On-Chain LP Pair", optionalValues.uniswapPair, "uniswapPair()");
  pushAddressLink("address.uniswapRouter", "Router", optionalValues.uniswapRouter, "uniswapRouter()");
  pushAddressLink("address.usdt", "Quote Token", optionalValues.usdt, "usdt()");
  pushAddressLink("address.ecologyAddress", "Ecology Address", optionalValues.ecologyAddress, "ecologyAddress()");
  pushAddressLink("address.projectOwner", "Project Share Address", optionalValues.projectOwner, "projectOwner()");
  pushAddressLink("address.castingAddress", "Casting / Recycle Address", optionalValues.castingAddress, "castingAddress()");
  pushAddressLink("address.burnAddr", "Burn Address", optionalValues.burnAddr, "burnAddr()");
  pushAddressLink("address.pancakeFactory", "Pancake Factory", optionalValues.pancakeFactory, "pancakeFactory()");
  pushAddressLink("address.pancakePair", "Pancake Pair", optionalValues.pancakePair, "pancakePair()");
  pushAddressLink("address.littlePool", "littlePool", optionalValues.littlePool, "littlePool()");
  pushAddressLink("address.techPool", "techPool", optionalValues.techPool, "techPool()");

  return {
    extras,
    addressLinks,
    contractPriceUsd: Number.isFinite(contractPriceUsd) && contractPriceUsd > 0 ? contractPriceUsd : NaN,
  };
}

function getLocalizedMarketChartMeta(market) {
  if (!market?.sourceId) return market?.chartMeta || "";

  if (market.sourceId === "dexscreener") {
    return t("market.chart.dex", {}, "Approximate curve derived from DexScreener discrete price changes");
  }

  if (market.sourceId === "geckoterminal") {
    return market?.pairAddress
      ? t("market.chart.geckoTerminal", {}, "Approximate curve derived from GeckoTerminal discrete price changes")
      : t(
          "market.chart.geckoTerminalSnapshot",
          {},
          "GeckoTerminal returned only a price snapshot, so a full trend line is not available.",
        );
  }

  if (market.sourceId === "coingecko") {
    return market?.chartMode === "actual"
      ? t("market.chart.coinGecko", {}, "24H hourly price points from CoinGecko")
      : t("market.chart.coinGeckoSnapshot", {}, "CoinGecko returned only a price snapshot");
  }

  return market?.chartMeta || "";
}

function relocalizeCachedProfile(profile) {
  if (!profile?.optionalValuesRaw) {
    return profile;
  }

  return {
    ...profile,
    ...buildProfileDynamicFields(profile.optionalValuesRaw, Number(profile.decimals || 18)),
  };
}

function relocalizeCachedMarket(market) {
  if (!market) return market;

  return {
    ...market,
    chartMeta: getLocalizedMarketChartMeta(market),
  };
}

function relocalizeCachedMarketMeta(meta) {
  if (!meta) return meta;

  return {
    ...meta,
    sourceLabel: meta.sourceId === "lightweight" ? t("source.lightweight", {}, "On-chain Lightweight Mode") : meta.sourceLabel,
    attempts: Array.isArray(meta.attempts)
      ? meta.attempts.map((attempt) => ({
          ...attempt,
          reason: attempt.reasonKey ? t(attempt.reasonKey, attempt.reasonParams || {}, attempt.reasonFallback || attempt.reason || "") : attempt.reason,
        }))
      : [],
  };
}

function relocalizeCachedMarketPayload(payload) {
  if (!payload) return payload;

  return {
    ...payload,
    market: relocalizeCachedMarket(payload.market),
    meta: relocalizeCachedMarketMeta(payload.meta),
  };
}
function scoreMarketPair(item) {
  const liquidity = safeNumber(item?.liquidity?.usd);
  const volume = safeNumber(item?.volume?.h24);
  const buys = safeNumber(item?.txns?.h24?.buys);
  const sells = safeNumber(item?.txns?.h24?.sells);
  const txns = (Number.isFinite(buys) ? buys : 0) + (Number.isFinite(sells) ? sells : 0);
  return (Number.isFinite(liquidity) ? liquidity * 100 : 0) + (Number.isFinite(volume) ? volume : 0) + (Number.isFinite(txns) ? txns * 10 : 0);
}

function normalizeDexPair(rawPair, address) {
  if (!rawPair) return null;

  return {
    sourceId: "dexscreener",
    sourceLabel: "DexScreener",
    sourceUrl: `${DEXSCREENER_SEARCH_BASE}${address}`,
    quality: "full",
    dexId: rawPair.dexId || "--",
    pairAddress: rawPair.pairAddress || null,
    pairCreatedAt: safeNumber(rawPair.pairCreatedAt),
    pairLabel:
      rawPair.baseToken?.symbol && rawPair.quoteToken?.symbol
        ? `${rawPair.baseToken.symbol}/${rawPair.quoteToken.symbol}`
        : "",
    priceUsd: safeNumber(rawPair.priceUsd),
    volume: {
      h24: safeNumber(rawPair.volume?.h24),
    },
    liquidity: {
      usd: safeNumber(rawPair.liquidity?.usd),
    },
    marketCap: safeNumber(rawPair.marketCap),
    fdv: safeNumber(rawPair.fdv),
    priceChange: {
      m5: safeNumber(rawPair.priceChange?.m5),
      h1: safeNumber(rawPair.priceChange?.h1),
      h6: safeNumber(rawPair.priceChange?.h6),
      h24: safeNumber(rawPair.priceChange?.h24),
    },
    txns: {
      h24: {
        buys: safeNumber(rawPair.txns?.h24?.buys),
        sells: safeNumber(rawPair.txns?.h24?.sells),
      },
    },
    baseToken: {
      symbol: rawPair.baseToken?.symbol || "",
    },
    quoteToken: {
      symbol: rawPair.quoteToken?.symbol || "",
    },
    url: rawPair.url || `${DEXSCREENER_SEARCH_BASE}${address}`,
    chartMode: "derived",
    chartMeta: t("market.chart.dex", {}, "Approximate curve derived from DexScreener discrete price changes"),
  };
}

async function fetchDexMarket(address) {
  const payload = await fetchJson(`https://api.dexscreener.com/latest/dex/tokens/${address}`, "DexScreener");
  const pairs = Array.isArray(payload?.pairs)
    ? payload.pairs.filter((item) => String(item?.chainId || "").toLowerCase() === "bsc")
    : [];

  if (!pairs.length) {
    return null;
  }

  const bestPair = [...pairs].sort((a, b) => scoreMarketPair(b) - scoreMarketPair(a))[0];
  return normalizeDexPair(bestPair, address);
}

function normalizeGeckoTerminalMarket(tokenPayload, poolsPayload, address) {
  const tokenAttributes = tokenPayload?.data?.attributes;
  const pools = Array.isArray(poolsPayload?.data) ? poolsPayload.data : [];

  if (!tokenAttributes && !pools.length) {
    return null;
  }

  const bestPool = [...pools]
    .map((pool) => {
      const attributes = pool?.attributes || {};
      const parsedName = parsePairName(attributes.name);
      const dexId = formatDexId(pool?.relationships?.dex?.data?.id);

      return {
        sourceId: "geckoterminal",
        sourceLabel: "GeckoTerminal",
        sourceUrl: `${GECKOTERMINAL_WEB_BASE}/tokens/${address}`,
        quality: "full",
        dexId,
        pairAddress: attributes.address || null,
        pairCreatedAt: attributes.pool_created_at ? Date.parse(attributes.pool_created_at) : NaN,
        pairLabel: parsedName.pairLabel,
        priceUsd: pickFirstFinite(
          safeNumber(attributes.token_price_usd),
          safeNumber(attributes.base_token_price_usd),
          safeNumber(tokenAttributes?.price_usd),
        ),
        volume: {
          h24: pickFirstFinite(safeNumber(attributes.volume_usd?.h24), safeNumber(tokenAttributes?.volume_usd?.h24)),
        },
        liquidity: {
          usd: pickFirstFinite(safeNumber(attributes.reserve_in_usd), safeNumber(tokenAttributes?.total_reserve_in_usd)),
        },
        marketCap: pickFirstFinite(safeNumber(attributes.market_cap_usd), safeNumber(tokenAttributes?.market_cap_usd)),
        fdv: pickFirstFinite(safeNumber(attributes.fdv_usd), safeNumber(tokenAttributes?.fdv_usd)),
        priceChange: {
          m5: safeNumber(attributes.price_change_percentage?.m5),
          h1: safeNumber(attributes.price_change_percentage?.h1),
          h6: safeNumber(attributes.price_change_percentage?.h6),
          h24: safeNumber(attributes.price_change_percentage?.h24),
        },
        txns: {
          h24: {
            buys: safeNumber(attributes.transactions?.h24?.buys),
            sells: safeNumber(attributes.transactions?.h24?.sells),
          },
        },
        baseToken: {
          symbol: parsedName.baseSymbol,
        },
        quoteToken: {
          symbol: parsedName.quoteSymbol,
        },
        url: attributes.address ? `${GECKOTERMINAL_WEB_BASE}/pools/${attributes.address}` : `${GECKOTERMINAL_WEB_BASE}/tokens/${address}`,
        chartMode: "derived",
        chartMeta: t("market.chart.geckoTerminal", {}, "Approximate curve derived from GeckoTerminal discrete price changes"),
      };
    })
    .sort((a, b) => scoreMarketPair(b) - scoreMarketPair(a))[0];

  if (bestPool) {
    return bestPool;
  }

  return {
    sourceId: "geckoterminal",
    sourceLabel: "GeckoTerminal",
    sourceUrl: `${GECKOTERMINAL_WEB_BASE}/tokens/${address}`,
    quality: "partial",
    dexId: "--",
    pairAddress: null,
    pairCreatedAt: NaN,
    pairLabel: "Token / USD",
    priceUsd: safeNumber(tokenAttributes?.price_usd),
    volume: {
      h24: safeNumber(tokenAttributes?.volume_usd?.h24),
    },
    liquidity: {
      usd: safeNumber(tokenAttributes?.total_reserve_in_usd),
    },
    marketCap: safeNumber(tokenAttributes?.market_cap_usd),
    fdv: safeNumber(tokenAttributes?.fdv_usd),
    priceChange: {},
    txns: {
      h24: {
        buys: NaN,
        sells: NaN,
      },
    },
    baseToken: {
      symbol: String(tokenAttributes?.symbol || ""),
    },
    quoteToken: {
      symbol: "USD",
    },
    url: `${GECKOTERMINAL_WEB_BASE}/tokens/${address}`,
    chartMode: "derived",
    chartMeta: t(
      "market.chart.geckoTerminalSnapshot",
      {},
      "GeckoTerminal returned only a price snapshot, so a full trend line is not available.",
    ),
  };
}

async function fetchGeckoTerminalMarket(address) {
  const [tokenResult, poolsResult] = await Promise.allSettled([
    fetchJson(`${GECKOTERMINAL_API_BASE}/networks/bsc/tokens/${address}`, "GeckoTerminal"),
    fetchJson(`${GECKOTERMINAL_API_BASE}/networks/bsc/tokens/${address}/pools`, "GeckoTerminal"),
  ]);

  const tokenPayload = tokenResult.status === "fulfilled" ? tokenResult.value : null;
  const poolsPayload = poolsResult.status === "fulfilled" ? poolsResult.value : null;

  if (!tokenPayload && !poolsPayload) {
    const reason =
      tokenResult.status === "rejected" && tokenResult.reason instanceof Error
        ? tokenResult.reason.message
        : poolsResult.status === "rejected" && poolsResult.reason instanceof Error
          ? poolsResult.reason.message
          : t("error.requestFailed", {}, "Request failed");
    throw new Error(reason);
  }

  return normalizeGeckoTerminalMarket(tokenPayload, poolsPayload, address);
}

function normalizeCoinGeckoMarket(pricePayload, chartPayload, address) {
  const key = Object.keys(pricePayload || {})[0];
  const attributes = key ? pricePayload[key] : null;
  const chartPoints = normalizeChartPoints(chartPayload?.prices);
  const derivedChanges = derivePriceChangesFromChart(chartPoints);

  if (!attributes && !chartPoints.length) {
    return null;
  }

  return {
    sourceId: "coingecko",
    sourceLabel: "CoinGecko",
    sourceUrl: `${COINGECKO_WEB_SEARCH_BASE}${address}`,
    quality: "partial",
    dexId: "--",
    pairAddress: null,
    pairCreatedAt: NaN,
    pairLabel: "Token / USD",
    priceUsd: pickFirstFinite(safeNumber(attributes?.usd), chartPoints[chartPoints.length - 1]?.value),
    volume: {
      h24: safeNumber(attributes?.usd_24h_vol),
    },
    liquidity: {
      usd: NaN,
    },
    marketCap: safeNumber(attributes?.usd_market_cap),
    fdv: NaN,
    priceChange: {
      m5: NaN,
      h1: safeNumber(derivedChanges.h1),
      h6: safeNumber(derivedChanges.h6),
      h24: pickFirstFinite(safeNumber(attributes?.usd_24h_change), safeNumber(derivedChanges.h24)),
    },
    txns: {
      h24: {
        buys: NaN,
        sells: NaN,
      },
    },
    baseToken: {
      symbol: "",
    },
    quoteToken: {
      symbol: "USD",
    },
    url: `${COINGECKO_WEB_SEARCH_BASE}${address}`,
    chartPoints,
    chartMode: chartPoints.length >= 2 ? "actual" : "snapshot",
    chartMeta:
      chartPoints.length >= 2
        ? t("market.chart.coinGecko", {}, "24H hourly price points from CoinGecko")
        : t("market.chart.coinGeckoSnapshot", {}, "CoinGecko returned only a price snapshot"),
  };
}

async function fetchCoinGeckoMarket(address) {
  const lowerAddress = String(address || "").toLowerCase();
  const [priceResult, chartResult] = await Promise.allSettled([
    fetchJson(
      `${COINGECKO_API_BASE}/simple/token_price/${COINGECKO_PLATFORM_ID}?contract_addresses=${lowerAddress}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`,
      "CoinGecko",
    ),
    fetchJson(
      `${COINGECKO_API_BASE}/coins/${COINGECKO_PLATFORM_ID}/contract/${lowerAddress}/market_chart?vs_currency=usd&days=1&interval=hourly`,
      "CoinGecko Chart",
    ),
  ]);

  const pricePayload = priceResult.status === "fulfilled" ? priceResult.value : null;
  const chartPayload = chartResult.status === "fulfilled" ? chartResult.value : null;

  if (!pricePayload && !chartPayload) {
    const reason =
      priceResult.status === "rejected" && priceResult.reason instanceof Error
        ? priceResult.reason.message
        : chartResult.status === "rejected" && chartResult.reason instanceof Error
          ? chartResult.reason.message
          : t("error.requestFailed", {}, "Request failed");
    throw new Error(reason);
  }

  return normalizeCoinGeckoMarket(pricePayload, chartPayload, lowerAddress);
}

function buildLightweightMeta(attempts) {
  return {
    sourceId: "lightweight",
    sourceLabel: t("source.lightweight", {}, "On-chain Lightweight Mode"),
    quality: "lightweight",
    fallbackUsed: true,
    attempts,
  };
}

async function fetchMarketDataFresh(address) {
  const attempts = [];
  const sources = [
    { id: "dexscreener", label: "DexScreener", fetcher: fetchDexMarket },
    { id: "geckoterminal", label: "GeckoTerminal", fetcher: fetchGeckoTerminalMarket },
    { id: "coingecko", label: "CoinGecko", fetcher: fetchCoinGeckoMarket },
  ];

  for (let index = 0; index < sources.length; index += 1) {
    const source = sources[index];

    try {
      const market = await source.fetcher(address);
      if (hasMarketData(market)) {
        return {
          market,
          meta: {
            sourceId: market.sourceId,
            sourceLabel: market.sourceLabel,
            quality: market.quality || "partial",
            fallbackUsed: index > 0,
            attempts,
          },
        };
      }

      attempts.push({
        id: source.id,
        label: source.label,
        reasonKey: "error.noMarketFields",
        reasonFallback: "No usable market fields were returned",
        reason: t("error.noMarketFields", {}, "No usable market fields were returned"),
      });
    } catch (error) {
      attempts.push({
        id: source.id,
        label: source.label,
        reasonKey: error instanceof Error ? "" : "error.requestFailed",
        reasonFallback: "Request failed",
        reason: error instanceof Error ? error.message : t("error.requestFailed", {}, "Request failed"),
      });
    }
  }

  return {
    market: null,
    meta: buildLightweightMeta(attempts),
  };
}

async function readTokenProfile(address, options = {}) {
  const { forceRefresh = false } = options;
  const cacheKey = getCacheKey(address);

  if (!forceRefresh) {
    const cached = getCachedValue(chainCache, cacheKey, CHAIN_CACHE_TTL_MS);
    if (cached) {
      return relocalizeCachedProfile(cached);
    }

    const pending = pendingChainRequests.get(cacheKey);
    if (pending) {
      return pending.then(relocalizeCachedProfile);
    }
  }

  const request = readTokenProfileFresh(address)
    .then((profile) => setCachedValue(chainCache, cacheKey, profile))
    .finally(() => {
      pendingChainRequests.delete(cacheKey);
    });

  pendingChainRequests.set(cacheKey, request);
  return request.then(relocalizeCachedProfile);
}

async function fetchMarketData(address, options = {}) {
  const { forceRefresh = false } = options;
  const cacheKey = getCacheKey(address);

  if (!forceRefresh) {
    const cached = getCachedValue(marketCache, cacheKey, MARKET_CACHE_TTL_MS);
    if (cached) {
      return relocalizeCachedMarketPayload(cached);
    }

    const pending = pendingMarketRequests.get(cacheKey);
    if (pending) {
      return pending.then(relocalizeCachedMarketPayload);
    }
  }

  const request = fetchMarketDataFresh(address)
    .then((payload) => setCachedValue(marketCache, cacheKey, payload))
    .finally(() => {
      pendingMarketRequests.delete(cacheKey);
    });

  pendingMarketRequests.set(cacheKey, request);
  return request.then(relocalizeCachedMarketPayload);
}

async function readProtocolAddressSnapshot(tokenAddress, userAddress, profile, options = {}) {
  const { forceRefresh = false } = options;
  const tokenKey = getCacheKey(tokenAddress);
  const userKey = getCacheKey(userAddress);
  const cacheKey = `${tokenKey}:${userKey}`;

  if (!forceRefresh) {
    const cached = getCachedValue(addressCache, cacheKey, ADDRESS_CACHE_TTL_MS);
    if (cached) {
      return cached;
    }

    const pending = pendingAddressRequests.get(cacheKey);
    if (pending) {
      return pending;
    }
  }

  const request = readProtocolAddressSnapshotFresh(tokenAddress, userAddress, profile)
    .then((snapshot) => setCachedValue(addressCache, cacheKey, snapshot))
    .finally(() => {
      pendingAddressRequests.delete(cacheKey);
    });

  pendingAddressRequests.set(cacheKey, request);
  return request;
}
export {
  readTokenProfile,
  fetchMarketData,
  readProtocolAddressSnapshot,
  buildLightweightMeta,
  relocalizeCachedProfile,
  relocalizeCachedMarket,
  relocalizeCachedMarketMeta
};




