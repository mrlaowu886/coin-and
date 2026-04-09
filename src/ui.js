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
  I18N_CONFIG,
  DEFAULT_LANGUAGE_PREFERENCE,
  RTL_LOCALES,
  state,
  $,
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
  extractTokenAddress
} = core;

function updateCurrentToken(address) {
  state.currentToken = address;
  $("search-input").value = address;
  setText("token-address-link", t("summary.contractPrefix", { value: shortAddress(address) }, `Contract: ${shortAddress(address)}`));
  setHref("token-address-link", `${BSC_SCAN_BASE}/token/${address}`);
  setHref("bsc-link", `${BSC_SCAN_BASE}/token/${address}`);
  setHref("pair-link", `${DEXSCREENER_SEARCH_BASE}${address}`);
  setHref("dex-link", `${DEXSCREENER_SEARCH_BASE}${address}`);
}

function showResults() {
  document.body.classList.remove("search-mode");
  document.body.classList.add("results-mode");
  setVisible("results-shell", true);
}

function hideResults() {
  document.body.classList.add("search-mode");
  document.body.classList.remove("results-mode");
  setVisible("results-shell", false);
}

function focusSearch() {
  window.scrollTo({ top: 0, behavior: "auto" });
  window.setTimeout(() => {
    $("search-input").focus();
    $("search-input").select();
  }, 60);
}

function buildStatItems(items) {
  const filtered = items.filter((item) => item && (item.visible ?? true) && hasContent(item.value));

  if (!filtered.length) {
    return `<p class="empty-state">${escapeHtml(t("status.noFields", {}, "There are no fields to display right now."))}</p>`;
  }

  return filtered
    .map(
      (item) => `
        <div class="stat-item ${item.tone ? `tone-${item.tone}` : ""}">
          <span>${escapeHtml(item.label)}</span>
          <strong class="${item.mono ? "mono" : ""}">${escapeHtml(item.value)}</strong>
          ${item.note ? `<small>${escapeHtml(item.note)}</small>` : ""}
        </div>
      `,
    )
    .join("");
}

function buildAddressCards(items) {
  const filtered = items.filter((item) => item && (item.visible ?? true) && hasContent(item.value) && item.href);

  if (!filtered.length) {
    return "";
  }

  return filtered
    .map(
      (item) => `
        <a class="address-box" href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer">
          <span>${escapeHtml(item.label)}</span>
          <strong class="mono">${escapeHtml(item.value)}</strong>
          ${item.note ? `<small>${escapeHtml(item.note)}</small>` : ""}
        </a>
      `,
    )
    .join("");
}

function buildMetricCards(items) {
  const filtered = items.filter((item) => item && (item.visible ?? true) && hasContent(item.value));

  return filtered
    .map(
      (item, index) => `
        <article class="metric-card ${item.highlight || index === 0 ? "highlight" : ""}">
          <span class="metric-label">${escapeHtml(item.label)}</span>
          <strong class="metric-value ${item.tone ? `${item.tone}-text` : ""}"${item.title ? ` title="${escapeHtml(item.title)}"` : ""}>${escapeHtml(item.value)}</strong>
          <span class="metric-foot">${escapeHtml(item.note || "")}</span>
          ${item.detail ? `<span class="metric-subfoot">${escapeHtml(item.detail)}</span>` : ""}
        </article>
      `,
    )
    .join("");
}

function deriveHistoricalPrice(currentPrice, changePct) {
  if (!Number.isFinite(currentPrice) || !Number.isFinite(changePct)) return NaN;
  const denominator = 1 + changePct / 100;
  if (denominator <= 0) return NaN;
  return currentPrice / denominator;
}

function buildPriceSeries(pair) {
  if (Array.isArray(pair?.chartPoints) && pair.chartPoints.length >= 2) {
    return pair.chartPoints;
  }

  const currentPrice = Number(pair?.priceUsd || NaN);
  const changes = pair?.priceChange || {};

  return [
    { label: t("market.point.h24", {}, "24H Ago"), value: deriveHistoricalPrice(currentPrice, Number(changes.h24)) },
    { label: t("market.point.h6", {}, "6H Ago"), value: deriveHistoricalPrice(currentPrice, Number(changes.h6)) },
    { label: t("market.point.h1", {}, "1H Ago"), value: deriveHistoricalPrice(currentPrice, Number(changes.h1)) },
    { label: t("market.point.m5", {}, "5M Ago"), value: deriveHistoricalPrice(currentPrice, Number(changes.m5)) },
    { label: t("market.point.now", {}, "Now"), value: currentPrice },
  ].filter((item) => Number.isFinite(item.value) && item.value > 0);
}

function buildSparkline(points) {
  if (points.length < 2) {
    return `<p class="empty-state">${escapeHtml(
      t("status.noPricePoints", {}, "There are not enough price points yet to draw a trend line."),
    )}</p>`;
  }

  const width = 520;
  const height = 180;
  const paddingX = 22;
  const paddingY = 18;
  const min = Math.min(...points.map((item) => item.value));
  const max = Math.max(...points.map((item) => item.value));
  const range = max - min || 1;

  const coords = points.map((item, index) => {
    const x = paddingX + (index * (width - paddingX * 2)) / Math.max(points.length - 1, 1);
    const y = height - paddingY - ((item.value - min) / range) * (height - paddingY * 2);
    return { ...item, x, y };
  });

  const line = coords.map((item) => `${item.x},${item.y}`).join(" ");
  const area = `${coords.map((item) => `${item.x},${item.y}`).join(" ")} ${coords[coords.length - 1].x},${height - paddingY} ${coords[0].x},${height - paddingY}`;

  return `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="chart-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="rgba(224, 193, 106, 0.85)"></stop>
          <stop offset="100%" stop-color="rgba(73, 214, 194, 0.95)"></stop>
        </linearGradient>
        <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(73, 214, 194, 0.28)"></stop>
          <stop offset="100%" stop-color="rgba(73, 214, 194, 0.02)"></stop>
        </linearGradient>
      </defs>
      <polygon points="${area}" fill="url(#chart-fill)"></polygon>
      <polyline points="${line}" fill="none" stroke="url(#chart-line)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></polyline>
      ${coords
        .map(
          (item) => `
            <circle cx="${item.x}" cy="${item.y}" r="4.6" fill="#07131e" stroke="#49d6c2" stroke-width="2"></circle>
          `,
        )
        .join("")}
    </svg>
  `;
}

function buildPriceLegend(points) {
  const legendPoints =
    points.length <= 5
      ? points
      : Array.from({ length: 5 }, (_, index) => {
          const pointIndex = Math.round((index * (points.length - 1)) / 4);
          return points[pointIndex];
        });

  return legendPoints
    .map(
      (item) => `
        <span class="legend-pill">
          <strong>${escapeHtml(item.label || formatChartPointLabel(item.timestamp))}</strong>
          <span>${escapeHtml(formatCurrency(item.value, item.value < 1 ? 6 : 2))}</span>
        </span>
      `,
    )
    .join("");
}

function buildActivityBars(pair) {
  const items = [
    {
      label: t("market.activity.volume", {}, "24H Volume"),
      raw: Number(pair.volume?.h24 || NaN),
      display: formatCurrency(Number(pair.volume?.h24 || NaN)),
    },
    {
      label: t("market.activity.liquidity", {}, "Liquidity"),
      raw: Number(pair.liquidity?.usd || NaN),
      display: formatCurrency(Number(pair.liquidity?.usd || NaN)),
    },
    {
      label: t("market.activity.buys", {}, "24H Buys"),
      raw: Number(pair.txns?.h24?.buys || NaN),
      display: Number.isFinite(Number(pair.txns?.h24?.buys || NaN))
        ? t("market.tradeCountValue", { count: formatNumber(Number(pair.txns.h24.buys), 0) }, `${formatNumber(Number(pair.txns.h24.buys), 0)} tx`)
        : "--",
    },
    {
      label: t("market.activity.sells", {}, "24H Sells"),
      raw: Number(pair.txns?.h24?.sells || NaN),
      display: Number.isFinite(Number(pair.txns?.h24?.sells || NaN))
        ? t("market.tradeCountValue", { count: formatNumber(Number(pair.txns.h24.sells), 0) }, `${formatNumber(Number(pair.txns.h24.sells), 0)} tx`)
        : "--",
    },
  ].filter((item) => Number.isFinite(item.raw) && item.raw >= 0);

  if (!items.length) {
    return `<p class="empty-state">${escapeHtml(
      t("status.noActivityData", {}, "There is not enough 24H market activity data right now."),
    )}</p>`;
  }

  const max = Math.max(...items.map((item) => Math.log10(item.raw + 1)), 1);

  return items
    .map((item) => {
      const scaled = (Math.log10(item.raw + 1) / max) * 100;
      return `
        <div class="activity-item">
          <div class="activity-head">
            <span>${escapeHtml(item.label)}</span>
            <strong>${escapeHtml(item.display)}</strong>
          </div>
          <div class="activity-track">
            <div class="activity-fill" style="width: ${scaled}%"></div>
          </div>
        </div>
      `;
    })
    .join("");
}

function buildChangePills(pair) {
  const changes = pair?.priceChange || {};
  const items = [
    { label: "5m", value: Number(changes.m5) },
    { label: "1h", value: Number(changes.h1) },
    { label: "6h", value: Number(changes.h6) },
    { label: "24h", value: Number(changes.h24) },
  ];

  return items
    .map((item) => {
      const tone = item.value > 0 ? "positive" : item.value < 0 ? "negative" : "";
      const textTone = item.value > 0 ? "positive-text" : item.value < 0 ? "negative-text" : "";

      return `
        <div class="change-pill ${tone}">
          <span>${escapeHtml(item.label)}</span>
          <strong class="${textTone}">${escapeHtml(Number.isFinite(item.value) ? formatPercent(item.value) : "--")}</strong>
        </div>
      `;
    })
    .join("");
}

function riskToneLabel(tone) {
  if (tone === "good") return t("risk.toneLow", {}, "Lower");
  if (tone === "bad") return t("risk.toneHigh", {}, "Higher");
  return t("risk.toneWatch", {}, "Watch");
}

function buildRiskSignals(profile, pair) {
  const liquidityUsd = Number(pair?.liquidity?.usd || NaN);
  const totalTx = Number(pair?.txns?.h24?.buys || 0) + Number(pair?.txns?.h24?.sells || 0);
  const extrasCount = profile?.extras?.length || 0;
  const { marketCap, fdv } = resolveCapMetrics(pair, profile);
  const valueCap = pickFirstFinite(marketCap, fdv);
  const liqRatio = Number.isFinite(liquidityUsd) && Number.isFinite(valueCap) && valueCap > 0 ? (liquidityUsd / valueCap) * 100 : NaN;
  const sourceLabel = pair?.sourceLabel || getSourceLabel(pair?.sourceId, t("source.lightweight", {}, "On-chain Lightweight Mode"));
  const volume24h = Number(pair?.volume?.h24 || NaN);
  const ownerState = profile?.ownerStatus;

  const ownership =
    ownerState === "renounced"
      ? {
          tone: "good",
          title: t("risk.permission", {}, "Permission Structure"),
          value: t("risk.permissionRenounced", {}, "Owner Renounced"),
          body: t("risk.permissionRenouncedBody", {}, "The owner() call resolves to the zero address, so explicit admin control looks lower."),
        }
      : ownerState === "managed"
        ? {
            tone: "warn",
            title: t("risk.permission", {}, "Permission Structure"),
            value: t("risk.permissionManaged", {}, "Owner Still Active"),
            body: t(
              "risk.permissionManagedBody",
              {},
              "A public owner address still exists, so you should review the team's permissions alongside the contract.",
            ),
          }
        : {
            tone: "warn",
            title: t("risk.permission", {}, "Permission Structure"),
            value: t("risk.permissionUnreadable", {}, "Owner Unreadable"),
            body: t(
              "risk.permissionUnreadableBody",
              {},
              "owner() was not readable or the current node could not return it, so the source and permission design should be checked manually.",
            ),
          };

  const liquidity =
    !pair
      ? {
          tone: "bad",
          title: t("risk.liquidity", {}, "Liquidity"),
          value: t("risk.noMainPair", {}, "Main Pair Not Found"),
          body: t(
            "risk.noMainPairBody",
            {},
            "No market source returned a usable main pool, so only on-chain base fields can be shown right now.",
          ),
        }
      : !Number.isFinite(liquidityUsd)
        ? {
            tone: "warn",
            title: t("risk.liquidity", {}, "Liquidity"),
            value: t("risk.liquidityUnavailable", { source: sourceLabel }, `${sourceLabel} unavailable`),
            body: t(
              "risk.liquidityUnavailableBody",
              {},
              "The current market source did not provide public pool depth, so liquidity cannot be judged from depth yet.",
            ),
          }
      : liquidityUsd >= 100000
        ? {
            tone: "good",
            title: t("risk.liquidity", {}, "Liquidity"),
            value: formatCurrency(liquidityUsd),
            body: t(
              "risk.liquidityStrongBody",
              {},
              "The main pool is relatively deeper, so short-term large trades should have less price impact.",
            ),
          }
        : liquidityUsd >= 20000
          ? {
              tone: "warn",
              title: t("risk.liquidity", {}, "Liquidity"),
              value: formatCurrency(liquidityUsd),
              body: t(
                "risk.liquidityMidBody",
                {},
                "The main pool has some depth, but single-trade size and slippage still deserve attention.",
              ),
            }
          : {
              tone: "bad",
              title: t("risk.liquidity", {}, "Liquidity"),
              value: formatCurrency(liquidityUsd),
              body: t("risk.liquidityWeakBody", {}, "The main pool is shallow, so the price can move with relatively small capital."),
            };

  const activity =
    !pair
      ? {
          tone: "bad",
          title: t("risk.activity", {}, "Trading Activity"),
          value: t("risk.no24hMarket", {}, "No 24H Market Data"),
          body: t("risk.no24hMarketBody", {}, "Public trading activity for the last 24 hours is not available yet."),
        }
      : totalTx <= 0 && Number.isFinite(volume24h)
        ? {
            tone: "warn",
            title: t("risk.activity", {}, "Trading Activity"),
            value: formatCurrency(volume24h),
            body: t(
              "risk.activityVolumeOnlyBody",
              { source: sourceLabel },
              `${sourceLabel} returned 24H volume but did not return buy/sell counts, so activity can only be judged partially.`,
            ),
          }
      : totalTx <= 0
        ? {
            tone: "warn",
            title: t("risk.activity", {}, "Trading Activity"),
            value: t("risk.liquidityUnavailable", { source: sourceLabel }, `${sourceLabel} unavailable`),
            body: t(
              "risk.activityNoTxBody",
              {},
              "The current market source did not provide 24H buy/sell counts, so the activity judgment is weaker.",
            ),
          }
      : totalTx >= 200
        ? {
            tone: "good",
            title: t("risk.activity", {}, "Trading Activity"),
            value: t("risk.activityCountValue", { count: formatNumber(totalTx, 0) }, `${formatNumber(totalTx, 0)} tx / 24H`),
            body: t("risk.activityHighBody", {}, "The number of trades in the last 24 hours is relatively high, which points to healthier participation."),
          }
        : totalTx >= 30
          ? {
              tone: "warn",
              title: t("risk.activity", {}, "Trading Activity"),
              value: t("risk.activityCountValue", { count: formatNumber(totalTx, 0) }, `${formatNumber(totalTx, 0)} tx / 24H`),
              body: t("risk.activityMidBody", {}, "There is some activity, but not a very strong continuous trading band yet."),
            }
          : {
              tone: "bad",
              title: t("risk.activity", {}, "Trading Activity"),
              value: t("risk.activityCountValue", { count: formatNumber(totalTx, 0) }, `${formatNumber(totalTx, 0)} tx / 24H`),
              body: t("risk.activityLowBody", {}, "Trade frequency is low, so price discovery may still be weak."),
            };

  const complexity =
    extrasCount === 0
      ? {
          tone: "good",
          title: t("risk.complexity", {}, "Contract Complexity"),
          value: t("risk.simpleContract", {}, "Near Standard ERC-20"),
          body: t("risk.simpleContractBody", {}, "No extra public protocol fields were detected, so the structure looks relatively simple."),
        }
      : extrasCount <= 2
        ? {
            tone: "warn",
            title: t("risk.complexity", {}, "Contract Complexity"),
            value: t("risk.someExtras", { count: extrasCount }, `${extrasCount} extra fields`),
            body: t(
              "risk.someExtrasBody",
              {},
              "Some protocol-side logic exists, so interpretation should combine on-chain behavior with the source code.",
            ),
          }
        : {
            tone: "bad",
            title: t("risk.complexity", {}, "Contract Complexity"),
            value: t("risk.someExtras", { count: extrasCount }, `${extrasCount} extra fields`),
            body: t(
              "risk.manyExtrasBody",
              {},
              "The extension logic is relatively heavy, so trading, rewards, or permission paths may be more complex than a typical ERC-20.",
            ),
          };

  const signals = [ownership, liquidity, activity, complexity];
  const badCount = signals.filter((item) => item.tone === "bad").length;
  const warnCount = signals.filter((item) => item.tone === "warn").length;

  let summary = t(
    "risk.summaryClear",
    {},
    "The current structure looks relatively clear, so market volatility and liquidity changes deserve the main attention.",
  );
  if (badCount >= 2) {
    summary = t("risk.summaryElevated", {}, "The risk signal is elevated, and at least two key indicators need closer verification.");
  } else if (badCount === 1 || warnCount >= 2) {
    summary = t(
      "risk.summaryWatch",
      {},
      "This token has structural factors worth watching, so permissions, liquidity, and activity should be checked more closely.",
    );
  }

  if (Number.isFinite(liqRatio) && liqRatio < 2) {
    summary = t(
      "risk.summaryThinLiquidity",
      {},
      "Main-pool liquidity is thin relative to market value, so slippage and depth deserve extra attention before trading.",
    );
  }

  return { signals, summary };
}

function buildRiskCards(items) {
  return items
    .map(
      (item) => `
        <article class="risk-card ${item.tone}">
          <span class="risk-tone">${escapeHtml(riskToneLabel(item.tone))}</span>
          <h4>${escapeHtml(item.title)}</h4>
          <strong>${escapeHtml(item.value)}</strong>
          <p>${escapeHtml(item.body)}</p>
        </article>
      `,
    )
    .join("");
}

function buildInsights(profile, pair) {
  const insights = [];
  const liquidityUsd = Number(pair?.liquidity?.usd || NaN);
  const { marketCap, fdv } = resolveCapMetrics(pair, profile);
  const capValue = pickFirstFinite(marketCap, fdv);
  const liquidityRatio = Number.isFinite(liquidityUsd) && Number.isFinite(capValue) && capValue > 0 ? (liquidityUsd / capValue) * 100 : NaN;
  const ageDays = daysSince(pair?.pairCreatedAt);

  if (Number.isFinite(liquidityRatio)) {
    insights.push({
      title: t("risk.insightLiquidity", {}, "Liquidity Coverage"),
      body:
        liquidityRatio >= 10
          ? t(
              "risk.insightLiquidityStrong",
              { value: formatNumber(liquidityRatio, 2) },
              `Main-pool liquidity is about ${formatNumber(liquidityRatio, 2)}% of market cap/FDV, which looks sturdier.`,
            )
          : t(
              "risk.insightLiquidityWeak",
              { value: formatNumber(liquidityRatio, 2) },
              `Main-pool liquidity is about ${formatNumber(liquidityRatio, 2)}% of market cap/FDV, so thin depth deserves extra slippage attention.`,
            ),
    });
  }

  if (Number.isFinite(Number(pair?.priceChange?.h24))) {
    insights.push({
      title: t("risk.insightMomentum", {}, "24H Momentum"),
      body: t(
        "risk.insightMomentumBody",
        { value: formatPercent(Number(pair.priceChange.h24)) },
        `The price changed ${formatPercent(Number(pair.priceChange.h24))} over the last 24 hours, and the short-term move can be read together with the momentum chart above.`,
      ),
    });
  }

  if (Number.isFinite(ageDays)) {
    insights.push({
      title: t("risk.insightAge", {}, "Main Pair Age"),
      body:
        ageDays > 180
          ? t(
              "risk.insightAgeMature",
              { days: formatNumber(ageDays, 0) },
              `The public main pair has existed for about ${formatNumber(ageDays, 0)} days, so the market structure looks more mature.`,
            )
          : t(
              "risk.insightAgeYoung",
              { days: formatNumber(ageDays, 0) },
              `The public main pair appears to have been created about ${formatNumber(ageDays, 0)} days ago, so trade stability still deserves observation.`,
            ),
    });
  }

  if (Number.isFinite(profile?.burnRatio)) {
    insights.push({
      title: t("risk.insightSupply", {}, "Supply Structure"),
      body:
        profile.burnRatio > 20
          ? t(
              "risk.insightSupplyHighBurn",
              { value: formatNumber(profile.burnRatio, 2) },
              `About ${formatNumber(profile.burnRatio, 2)}% of supply sits in the zero or dead address.`,
            )
          : t(
              "risk.insightSupplyLowBurn",
              { value: formatNumber(profile.burnRatio, 2) },
              `The current burn ratio is about ${formatNumber(profile.burnRatio, 2)}%, which is not especially high.`,
            ),
    });
  }

  if ((profile?.extras?.length || 0) > 0) {
    insights.push({
      title: t("risk.insightExtras", {}, "Extra Fields"),
      body: t(
        "risk.insightExtrasBody",
        { count: profile.extras.length },
        `${profile.extras.length} public extra fields were detected, which suggests this contract may include protocol rewards, permissions, or custom business logic.`,
      ),
    });
  }

  return insights
    .slice(0, 4)
    .map(
      (item) => `
        <article class="insight-card">
          <span class="insight-kicker">${escapeHtml(item.title)}</span>
          <p>${escapeHtml(item.body)}</p>
        </article>
      `,
    )
    .join("");
}

function summarizeParts(parts) {
  return parts.filter(Boolean).join(" · ");
}

function buildAdvancedProtocolState(profile, pair) {
  const optional = profile?.optionalValuesRaw || {};
  const totalNodesRaw = toBigIntValue(optional.totalNodes);
  const lastTotalLpRaw = toBigIntValue(optional.lastTotalLP);
  const globalIndexRaw = toBigIntValue(optional.globalIndex);
  const globalNodeIndexRaw = toBigIntValue(optional.globalNodeIndex);
  const queueLenRaw = toBigIntValue(optional.queueLen);
  const currentIdxRaw = toBigIntValue(optional.currentIdx);
  const ownLpRaw = toBigIntValue(optional.ownLpU);
  const directAccumulationRaw = toBigIntValue(optional.directAccumulation);
  const effectiveLpRaw = toBigIntValue(optional.effectiveLpU);
  const totalLpThresholdRaw = toBigIntValue(optional.totalLpU);
  const effectiveLpCountRaw = toBigIntValue(optional.effectiveLpCount);
  const crashReferenceRaw = toBigIntValue(optional.crashReferencePrice);
  const peakPriceRaw = toBigIntValue(optional.peakPrice);
  const productionFactorRaw = toBigIntValue(optional.productionFactor);
  const buyFeeRaw = toBigIntValue(optional.buyFee);
  const sellFeeRaw = toBigIntValue(optional.sellFee);
  const ecologyFeeRaw = toBigIntValue(optional.sellFeeEcology);
  const profitFeeRaw = toBigIntValue(optional.profitFee);
  const profitBurnFeeRaw = toBigIntValue(optional.profitFeeDead);

  const flags = {
    nodeRewards: totalNodesRaw !== null || globalNodeIndexRaw !== null,
    lpRewards: lastTotalLpRaw !== null || globalIndexRaw !== null,
    queue: queueLenRaw !== null || currentIdxRaw !== null,
    thresholds:
      ownLpRaw !== null ||
      directAccumulationRaw !== null ||
      effectiveLpRaw !== null ||
      totalLpThresholdRaw !== null ||
      effectiveLpCountRaw !== null,
    fees:
      buyFeeRaw !== null ||
      sellFeeRaw !== null ||
      ecologyFeeRaw !== null ||
      profitFeeRaw !== null ||
      profitBurnFeeRaw !== null ||
      typeof optional.isBuyFee === "boolean" ||
      typeof optional.isSellFee === "boolean" ||
      typeof optional.isSellBurn === "boolean",
    lifecycle:
      optional.startTime !== null ||
      optional.lastUpdateTime !== null ||
      optional.lastUpdate !== null ||
      optional.minTime !== null ||
      optional.recycleDay !== null ||
      optional.isStart !== null ||
      typeof optional.openPan === "boolean",
    livePrice: Number.isFinite(profile?.contractPriceUsd) || crashReferenceRaw !== null || peakPriceRaw !== null || productionFactorRaw !== null,
  };

  const featureCount = Object.values(flags).filter(Boolean).length;
  if (!featureCount) {
    return null;
  }

  let engineValue = t("advanced.engineCustom", {}, "Custom protocol logic");
  if (flags.nodeRewards && flags.lpRewards) {
    engineValue = t("advanced.engineNodeLp", {}, "Node rewards + LP rewards");
  } else if (flags.nodeRewards) {
    engineValue = t("advanced.engineNode", {}, "Node rewards");
  } else if (flags.lpRewards) {
    engineValue = t("advanced.engineLp", {}, "LP rewards");
  }

  const queuePercent =
    currentIdxRaw !== null && queueLenRaw !== null && queueLenRaw > 0n
      ? Number((currentIdxRaw * 10000n) / queueLenRaw) / 100
      : NaN;
  const queueValue =
    currentIdxRaw !== null && queueLenRaw !== null
      ? `${formatNumber(Number(currentIdxRaw), 0)} / ${formatNumber(Number(queueLenRaw), 0)}${
          Number.isFinite(queuePercent) ? ` (${formatNumber(queuePercent, 2)}%)` : ""
        }`
      : currentIdxRaw !== null
        ? formatNumber(Number(currentIdxRaw), 0)
        : queueLenRaw !== null
          ? formatNumber(Number(queueLenRaw), 0)
          : "--";

  const contractPriceDisplay = buildCurrencyDisplay(safeNumber(profile?.contractPriceUsd), {
    digits: safeNumber(profile?.contractPriceUsd) > 0 && safeNumber(profile?.contractPriceUsd) < 1 ? 6 : 2,
    compactThreshold: 100000,
  });

  const noteParts = [];
  if (flags.nodeRewards) noteParts.push(t("advanced.nodeRewards", {}, "Node reward logic detected"));
  if (flags.lpRewards) noteParts.push(t("advanced.lpRewards", {}, "LP reward logic detected"));
  if (flags.queue) noteParts.push(t("advanced.queueDetected", {}, "Reward queue detected"));
  if (!noteParts.length) noteParts.push(t("advanced.customProtocol", {}, "Custom public protocol fields detected"));

  const overviewItems = [
    {
      label: t("advanced.detectedFeatures", {}, "Detected Features"),
      value: t("advanced.featureCountValue", { count: formatNumber(featureCount, 0) }, `${formatNumber(featureCount, 0)} feature groups`),
      note: summarizeParts(noteParts),
    },
    {
      label: t("advanced.rewardEngine", {}, "Reward Engine"),
      value: engineValue,
      note: t("advanced.rewardEngineNote", {}, "Inferred from public node / LP / index fields"),
    },
    {
      label: t("extra.totalNodes", {}, "Total Nodes"),
      value: totalNodesRaw !== null ? formatNumber(Number(totalNodesRaw), 0) : "--",
      note: "totalNodes()",
      visible: totalNodesRaw !== null,
    },
    {
      label: t("advanced.protocolLp", {}, "Protocol LP Snapshot"),
      value: lastTotalLpRaw !== null ? formatUnitsValue(lastTotalLpRaw, Number(profile?.decimals || 18)) : "--",
      note: "lastTotalLP()",
      visible: lastTotalLpRaw !== null,
    },
    {
      label: t("advanced.queueProgress", {}, "Queue Progress"),
      value: queueValue,
      note: summarizeParts(
        [
          currentIdxRaw !== null ? "currentIdx()" : "",
          queueLenRaw !== null ? "queueLen()" : "",
        ].filter(Boolean),
      ),
      visible: queueLenRaw !== null || currentIdxRaw !== null,
    },
    {
      label: t("extra.onchainPrice", {}, "On-Chain Price"),
      value: contractPriceDisplay.display,
      note: "getTokenPrice()",
      detail: contractPriceDisplay.isCompact ? t("common.fullValue", { value: contractPriceDisplay.full }, `Full: ${contractPriceDisplay.full}`) : "",
      title: contractPriceDisplay.full,
      visible: Number.isFinite(safeNumber(profile?.contractPriceUsd)),
    },
    {
      label: t("advanced.protocolSettlement", {}, "Protocol Settlement"),
      value:
        formatTimestampValue(optional.lastUpdateTime) !== "--"
          ? formatTimestampValue(optional.lastUpdateTime)
          : formatTimestampValue(optional.lastUpdate),
      note:
        formatTimestampValue(optional.lastUpdateTime) !== "--"
          ? "lastUpdateTime()"
          : formatTimestampValue(optional.lastUpdate) !== "--"
            ? "lastUpdate()"
            : "",
      visible: formatTimestampValue(optional.lastUpdateTime) !== "--" || formatTimestampValue(optional.lastUpdate) !== "--",
    },
  ];

  const thresholdValue = summarizeParts([
    ownLpRaw !== null ? `Own LP >= ${formatUnitsValue(ownLpRaw, Number(profile?.decimals || 18))}` : "",
    effectiveLpRaw !== null ? `Effective LP >= ${formatUnitsValue(effectiveLpRaw, Number(profile?.decimals || 18))}` : "",
    totalLpThresholdRaw !== null ? `Total LP ${formatUnitsValue(totalLpThresholdRaw, Number(profile?.decimals || 18))}` : "",
    directAccumulationRaw !== null ? `Direct >= ${formatUnitsValue(directAccumulationRaw, Number(profile?.decimals || 18))}` : "",
  ]);
  const feeValue = summarizeParts([
    buyFeeRaw !== null ? `${t("extra.buyFee", {}, "Buy Fee")} ${formatPerMilleValue(buyFeeRaw)}` : "",
    sellFeeRaw !== null ? `${t("extra.sellFee", {}, "Sell Fee")} ${formatPerMilleValue(sellFeeRaw)}` : "",
    ecologyFeeRaw !== null ? `${t("extra.sellFeeEcology", {}, "Ecology Fee")} ${formatPerMilleValue(ecologyFeeRaw)}` : "",
    profitFeeRaw !== null ? `${t("extra.profitFee", {}, "Profit Fee")} ${formatPerMilleValue(profitFeeRaw)}` : "",
  ]);
  const timeValue = summarizeParts([
    optional.isStart !== null
      ? BigInt(optional.isStart) === 1n
        ? t("state.started", {}, "Started")
        : t("state.notStarted", {}, "Not Started")
      : "",
    typeof optional.openPan === "boolean" ? (optional.openPan ? t("state.enabled", {}, "Enabled") : t("state.disabled", {}, "Disabled")) : "",
    optional.minTime !== null ? `${t("extra.minTime", {}, "Minimum Sell Cooldown")} ${formatSecondsValue(optional.minTime)}` : "",
    optional.recycleDay !== null ? `${t("extra.recycleDay", {}, "Recycle Trigger Days")} ${formatDaysValue(optional.recycleDay)}` : "",
  ]);
  const priceValue = summarizeParts([
    Number.isFinite(safeNumber(profile?.contractPriceUsd)) ? contractPriceDisplay.display : "",
    crashReferenceRaw !== null && crashReferenceRaw > 0n ? `${t("extra.crashReferencePrice", {}, "Crash Reference Price")} ${formatScaledCurrencyValue(crashReferenceRaw)}` : "",
    productionFactorRaw !== null ? `${t("extra.productionFactor", {}, "Production Factor")} ${formatMultiplierValue(productionFactorRaw)}` : "",
    peakPriceRaw !== null && peakPriceRaw > 0n ? `peakPrice ${peakPriceRaw.toString()}` : "",
  ]);
  const indexValue = summarizeParts([
    globalIndexRaw !== null ? `LP ${globalIndexRaw.toString()}` : "",
    globalNodeIndexRaw !== null ? `Node ${globalNodeIndexRaw.toString()}` : "",
  ]);

  const mechanicsItems = [
    {
      label: t("advanced.liveMechanics", {}, "Live Mechanics"),
      value: summarizeParts(noteParts),
      note: t("advanced.liveMechanicsNote", {}, "Auto-detected from public contract views"),
    },
    {
      label: t("advanced.thresholdSummary", {}, "Threshold Summary"),
      value: thresholdValue || "--",
      note: summarizeParts(
        [effectiveLpCountRaw !== null ? `${t("extra.effectiveLpCount", {}, "Effective LP Size")} ${formatUnitsValue(effectiveLpCountRaw, Number(profile?.decimals || 18))}` : ""],
      ),
      visible: Boolean(thresholdValue || effectiveLpCountRaw !== null),
    },
    {
      label: t("advanced.feeSummary", {}, "Fee Summary"),
      value: feeValue || "--",
      note: summarizeParts([
        typeof optional.isBuyFee === "boolean" ? `Buy ${optional.isBuyFee ? t("state.enabled", {}, "Enabled") : t("state.disabled", {}, "Disabled")}` : "",
        typeof optional.isSellFee === "boolean" ? `Sell ${optional.isSellFee ? t("state.enabled", {}, "Enabled") : t("state.disabled", {}, "Disabled")}` : "",
        typeof optional.isSellBurn === "boolean" ? `Burn ${optional.isSellBurn ? t("state.enabled", {}, "Enabled") : t("state.disabled", {}, "Disabled")}` : "",
      ]),
      visible: Boolean(feeValue) || typeof optional.isBuyFee === "boolean" || typeof optional.isSellFee === "boolean" || typeof optional.isSellBurn === "boolean",
    },
    {
      label: t("advanced.timeSummary", {}, "Time Controls"),
      value: timeValue || "--",
      note: summarizeParts([
        formatTimestampValue(optional.startTime) !== "--" ? `${t("extra.startTime", {}, "Start Time")} ${formatTimestampValue(optional.startTime)}` : "",
      ]),
      visible: Boolean(timeValue) || formatTimestampValue(optional.startTime) !== "--",
    },
    {
      label: t("advanced.priceSummary", {}, "Price Controls"),
      value: priceValue || "--",
      note: t("advanced.priceSummaryNote", {}, "On-chain price and protection-related views"),
      visible: Boolean(priceValue),
    },
    {
      label: t("advanced.indexSummary", {}, "Reward Indices"),
      value: indexValue || "--",
      note: summarizeParts([
        globalIndexRaw !== null ? "globalIndex()" : "",
        globalNodeIndexRaw !== null ? "globalNodeIndex()" : "",
      ]),
      visible: Boolean(indexValue),
      mono: Boolean(indexValue),
    },
  ];

  return {
    supported: true,
    supportsAddressAnalyzer: flags.nodeRewards || flags.lpRewards,
    note: t("advanced.note", { summary: summarizeParts(noteParts) }, summarizeParts(noteParts)),
    overviewItems,
    mechanicsItems,
  };
}

function buildAdvancedAddressItems(snapshot, profile) {
  const decimals = Number(profile?.decimals || 18);
  const lpShare =
    snapshot?.lpBalanceRaw !== null && snapshot?.lastTotalLpRaw !== null
      ? ratio(Number(ethers.formatUnits(snapshot.lpBalanceRaw, decimals)), Number(ethers.formatUnits(snapshot.lastTotalLpRaw, decimals)))
      : NaN;

  return [
    {
      label: t("advanced.participantAddress", {}, "Participant Address"),
      value: snapshot?.address || "--",
      note: t("advanced.addressValue", {}, "Public address-level view snapshot"),
      mono: true,
    },
    {
      label: t("advanced.pendingReward", {}, "Pending Reward"),
      value: snapshot?.pendingRewardRaw !== null ? formatUnitsValue(snapshot.pendingRewardRaw, decimals) : "--",
      note: snapshot?.pendingRewardRaw !== null ? "unclaimed(address)" : "",
      visible: snapshot?.pendingRewardRaw !== null,
    },
    {
      label: t("advanced.nodeCount", {}, "Node Count"),
      value: snapshot?.nodeCountRaw !== null ? formatNumber(Number(snapshot.nodeCountRaw), 0) : "--",
      note: snapshot?.nodeCountRaw !== null ? "nodes(address)" : "",
      visible: snapshot?.nodeCountRaw !== null,
    },
    {
      label: t("advanced.lpBalance", {}, "LP Balance"),
      value: snapshot?.lpBalanceRaw !== null ? formatUnitsValue(snapshot.lpBalanceRaw, decimals) : "--",
      note: snapshot?.lpBalanceRaw !== null ? "lptOf(address)" : "",
      visible: snapshot?.lpBalanceRaw !== null,
    },
    {
      label: t("advanced.lpShare", {}, "LP Share"),
      value: Number.isFinite(lpShare) ? formatPercent(lpShare) : "--",
      note: Number.isFinite(lpShare)
        ? t("advanced.lpShareNote", {}, "Compared with the current protocol LP snapshot")
        : "",
      visible: Number.isFinite(lpShare),
    },
    {
      label: t("advanced.lpContribution", {}, "LP Contribution"),
      value: snapshot?.contributionRaw !== null ? formatUnitsValue(snapshot.contributionRaw, decimals) : "--",
      note: snapshot?.contributionRaw !== null ? "LPContribution(address)" : "",
      visible: snapshot?.contributionRaw !== null,
    },
    {
      label: t("advanced.sharedLp", {}, "Shared LP"),
      value: snapshot?.sharedLpRaw !== null ? formatUnitsValue(snapshot.sharedLpRaw, decimals) : "--",
      note: snapshot?.sharedLpRaw !== null ? "sharedLP(address)" : "",
      visible: snapshot?.sharedLpRaw !== null,
    },
    {
      label: t("advanced.sharedEquity", {}, "Shared Equity"),
      value: snapshot?.sharedEquityRaw !== null ? formatUnitsValue(snapshot.sharedEquityRaw, decimals) : "--",
      note: snapshot?.sharedEquityRaw !== null ? "sharedEquity(address)" : "",
      visible: snapshot?.sharedEquityRaw !== null,
    },
    {
      label: t("advanced.nodePendingEstimate", {}, "Node Pending Estimate"),
      value: snapshot?.nodePendingEstimateRaw !== null ? formatUnitsValue(snapshot.nodePendingEstimateRaw, decimals) : "--",
      note: snapshot?.nodePendingEstimateRaw !== null ? t("advanced.indexEstimateNote", {}, "Estimated from node count and reward indices") : "",
      visible: snapshot?.nodePendingEstimateRaw !== null,
    },
    {
      label: t("advanced.lpPendingEstimate", {}, "LP Pending Estimate"),
      value: snapshot?.lpPendingEstimateRaw !== null ? formatUnitsValue(snapshot.lpPendingEstimateRaw, decimals) : "--",
      note: snapshot?.lpPendingEstimateRaw !== null ? t("advanced.indexEstimateNote", {}, "Estimated from node count and reward indices") : "",
      visible: snapshot?.lpPendingEstimateRaw !== null,
    },
    {
      label: t("advanced.referrer", {}, "Referrer"),
      value: snapshot?.referrer || "--",
      note: snapshot?.referrer ? "referee(address)" : "",
      mono: true,
      visible: Boolean(snapshot?.referrer),
    },
  ];
}

function renderAdvanced(profile, pair, addressSnapshot) {
  const advanced = buildAdvancedProtocolState(profile, pair);

  if (!advanced) {
    setVisible("advanced-section", false);
    setVisible("advanced-nav-link", false);
    setVisible("advanced-address-panel", false);
    setVisible("advanced-address-grid", false);
    setText("advanced-note", t("advanced.waiting", {}, "Waiting for advanced protocol fields"));
    setText("advanced-address-note", t("advanced.addressPrompt", {}, "Enter a wallet address to read public protocol-side reward fields."));
    setHtml("advanced-grid", "");
    setHtml("advanced-mechanics", "");
    setHtml("advanced-address-grid", "");
    return;
  }

  setVisible("advanced-section", true);
  setVisible("advanced-nav-link", true);
  setText("advanced-note", advanced.note);
  setHtml("advanced-grid", buildStatItems(advanced.overviewItems));
  setHtml("advanced-mechanics", buildStatItems(advanced.mechanicsItems));

  const addressPanelVisible = advanced.supportsAddressAnalyzer;
  setVisible("advanced-address-panel", addressPanelVisible);
  if (!addressPanelVisible) {
    setVisible("advanced-address-grid", false);
    setHtml("advanced-address-grid", "");
    return;
  }

  if ($("advanced-address-input") && state.advancedAddressTarget) {
    $("advanced-address-input").value = state.advancedAddressTarget;
  }

  if (addressSnapshot?.supported) {
    const checkedAt = formatDate(addressSnapshot.checkedAt);
    setText(
      "advanced-address-note",
      t("advanced.addressReady", { time: checkedAt }, `Address snapshot ready · ${checkedAt}`),
    );
    setHtml("advanced-address-grid", buildStatItems(buildAdvancedAddressItems(addressSnapshot, profile)));
    setVisible("advanced-address-grid", true);
    return;
  }

  if (state.advancedAddressTarget && addressSnapshot && !addressSnapshot.supported) {
    setText(
      "advanced-address-note",
      t("advanced.addressNoData", {}, "This contract did not return usable address-level reward fields for the current input."),
    );
    setVisible("advanced-address-grid", false);
    setHtml("advanced-address-grid", "");
    return;
  }

  setText(
    "advanced-address-note",
    t("advanced.addressPrompt", {}, "Enter a wallet address to read public protocol-side reward fields."),
  );
  setVisible("advanced-address-grid", false);
  setHtml("advanced-address-grid", "");
}

function resetDisplay() {
  setText("summary-title", "--");
  setText("summary-subtitle", t("summary.waiting", {}, "Waiting for lookup"));
  setText("summary-price", "--");
  setText("summary-change", "--");
  setText("summary-liquidity", "--");
  setText("summary-marketcap", "--");
  setText("overview-note", t("overview.waiting", {}, "Waiting for on-chain data"));
  setText("market-note", t("market.waiting", {}, "Waiting for market data"));
  setText("price-chart-meta", t("market.waiting", {}, "Waiting for market data"));
  setText("activity-chart-meta", t("market.waiting", {}, "Waiting for market data"));
  setText("buy-sell-caption", "--");
  setText("risk-summary-note", t("risk.waiting", {}, "Waiting for risk analysis"));
  setText(
    "source-note",
    t("status.sourceWaiting", {}, "Data source details and update time will appear here after lookup."),
  );
  setText(
    "market-empty",
    t(
      "market.empty",
      {},
      "No public BNB Chain trading pair has been found yet. The market panel will expand automatically once a main pair is available.",
    ),
  );

  setHtml("overview-grid", "");
  setHtml("pool-grid", "");
  setHtml("address-list", "");
  setHtml("market-metric-grid", "");
  setHtml("price-chart", `<p class="empty-state">${escapeHtml(t("status.preparingPrice", {}, "Preparing the price momentum chart."))}</p>`);
  setHtml("price-chart-legend", "");
  setHtml("activity-chart", `<p class="empty-state">${escapeHtml(t("status.preparingActivity", {}, "Preparing the activity bars."))}</p>`);
  setHtml("market-pills", "");
  setHtml("contract-grid", "");
  setHtml("source-list", "");
  setHtml("risk-grid", "");
  setHtml("insight-list", "");
  setHtml("advanced-grid", "");
  setHtml("advanced-mechanics", "");
  setHtml("advanced-address-grid", "");

  setWidth("buy-bar", 0);
  setWidth("sell-bar", 0);

  const summaryChange = $("summary-change");
  if (summaryChange) {
    summaryChange.className = "";
  }

  const contractEmpty = $("contract-empty");
  if (contractEmpty) {
    contractEmpty.textContent = "";
    contractEmpty.classList.add("hidden");
  }

  setVisible("market-empty", false);
  setVisible("market-chart-grid", true);
  setVisible("market-detail-panel", true);
  setVisible("advanced-section", false);
  setVisible("advanced-nav-link", false);
  setVisible("advanced-address-panel", false);
  setVisible("advanced-address-grid", false);

  setText("token-address-link", t("summary.contractPrefix", { value: "--" }, "Contract: --"));
  setHref("token-address-link", "#");
  setHref("bsc-link", "#");
  setText("pair-link", t("summary.openPair", {}, "View Main Pair"));
  setHref("pair-link", "#");
  setText("dex-link", t("summary.openDex", {}, "Open DexScreener"));
  setHref("dex-link", "#");
  setTitle("summary-price", "");
  setTitle("summary-liquidity", "");
  setTitle("summary-marketcap", "");
  setText("advanced-note", t("advanced.waiting", {}, "Waiting for advanced protocol fields"));
  setText("advanced-address-note", t("advanced.addressPrompt", {}, "Enter a wallet address to read public protocol-side reward fields."));
  if ($("advanced-address-input")) {
    $("advanced-address-input").value = "";
  }
}

function renderSources(chainOk, market, marketMeta, profile) {
  const marketSourceLabel = getSourceLabel(marketMeta?.sourceId, marketMeta?.sourceLabel || t("source.lightweight", {}, "On-chain Lightweight Mode"));
  const chips = [
    {
      label: chainOk
        ? t("source.chainOnline", {}, "On-chain RPC Connected")
        : t("source.chainOffline", {}, "On-chain RPC Unavailable"),
      active: chainOk,
    },
    {
      label: t("source.marketSource", { source: marketSourceLabel }, `Market Source: ${marketSourceLabel}`),
      active: Boolean(market) || marketMeta?.sourceId === "lightweight",
    },
  ];

  if (profile?.rpcUrl) {
    chips.push({
      label: t("source.rpcHost", { host: hostFromUrl(profile.rpcUrl) }, `RPC: ${hostFromUrl(profile.rpcUrl)}`),
      active: true,
    });
  }

  if (marketMeta?.fallbackUsed) {
    chips.push({
      label: t("source.fallbackUsed", {}, "Fallback Enabled"),
      active: true,
    });
  }

  if (market?.dexId && market.dexId !== "--") {
    chips.push({
      label: t("source.dex", { dex: market.dexId }, `DEX: ${market.dexId}`),
      active: true,
    });
  }

  setHtml(
    "source-list",
    chips
      .map(
        (item) =>
          `<span class="source-chip ${item.active ? "active" : ""}">${escapeHtml(item.label)}</span>`,
      )
      .join(""),
  );

  const sourceParts = [
    t("source.lastUpdated", { time: formatDate(state.lastUpdated) }, `Last Updated: ${formatDate(state.lastUpdated)}`),
  ];
  sourceParts.push(
    chainOk
      ? t("source.onchainRpc", {}, "On-chain fields came from a public BNB Chain RPC.")
      : t("source.onchainFailed", {}, "On-chain fields were not read successfully this time."),
  );

  if (marketMeta?.sourceId === "dexscreener") {
    sourceParts.push(t("source.fromDex", {}, "Market fields came from the public DexScreener API."));
  } else if (marketMeta?.sourceId === "geckoterminal") {
    sourceParts.push(
      t("source.fromGeckoTerminal", {}, "DexScreener was unavailable or returned no usable pair, so GeckoTerminal was used."),
    );
  } else if (marketMeta?.sourceId === "coingecko") {
    sourceParts.push(
      t(
        "source.fromCoinGecko",
        {},
        "DexScreener and GeckoTerminal returned no usable result, so CoinGecko was used. Some pool fields may be missing.",
      ),
    );
  } else {
    sourceParts.push(
      t(
        "source.fromLightweight",
        {},
        "DexScreener, GeckoTerminal, and CoinGecko returned no usable market data, so the dashboard is in on-chain lightweight mode.",
      ),
    );
  }

  if (Array.isArray(marketMeta?.attempts) && marketMeta.attempts.length) {
    const attemptSummary = marketMeta.attempts
      .map((item) => `${item.label}: ${item.reason}`)
      .join("; ");
    sourceParts.push(t("source.fallbackTrail", { trail: attemptSummary }, `Fallback Trail: ${attemptSummary}`));
  }

  setText("source-note", sourceParts.join(" "));
}

function renderSummary(profile, pair, marketMeta) {
  const title = profile?.symbol ? `${profile.name} (${profile.symbol})` : profile?.name || t("status.result", {}, "Lookup Result");
  const subtitleBits = [CHAIN_LABEL];

  if (Number.isFinite(profile?.decimals)) {
    subtitleBits.push(`Decimals ${profile.decimals}`);
  }

  if (marketMeta?.sourceLabel) {
    subtitleBits.push(
      t(
        "summary.marketSource",
        { source: getSourceLabel(marketMeta.sourceId, marketMeta.sourceLabel) },
        `Market Source ${getSourceLabel(marketMeta.sourceId, marketMeta.sourceLabel)}`,
      ),
    );
  }

  if (pair?.dexId && pair?.dexId !== "--") {
    subtitleBits.push(`${pair.dexId} · ${getPairLabel(pair, profile)}`);
  } else if (pair) {
    subtitleBits.push(getPairLabel(pair, profile));
  }

  if (state.lastUpdated) {
    subtitleBits.push(t("summary.updatedAt", { time: formatDate(state.lastUpdated) }, `Updated ${formatDate(state.lastUpdated)}`));
  }

  setText("summary-title", title);
  setText("summary-subtitle", subtitleBits.join(" / "));
  const summaryPrice = pickFirstFinite(safeNumber(pair?.priceUsd), safeNumber(profile?.contractPriceUsd));
  const priceDisplay = buildCurrencyDisplay(summaryPrice, {
    digits: summaryPrice > 0 && summaryPrice < 1 ? 6 : 2,
    compactThreshold: 100000,
  });
  setText("summary-price", priceDisplay.display);
  setTitle("summary-price", priceDisplay.full);

  const changeValue = Number(pair?.priceChange?.h24 || NaN);
  const summaryChange = $("summary-change");
  if (summaryChange) {
    summaryChange.textContent = Number.isFinite(changeValue) ? formatPercent(changeValue) : "--";
    summaryChange.className = "";
    if (changeValue > 0) {
      summaryChange.classList.add("positive-text");
    } else if (changeValue < 0) {
      summaryChange.classList.add("negative-text");
    }
  }

  const liquidityDisplay = buildCurrencyDisplay(Number(pair?.liquidity?.usd || NaN));
  setText("summary-liquidity", liquidityDisplay.display);
  setTitle("summary-liquidity", liquidityDisplay.full);

  const { marketCap, fdv } = resolveCapMetrics(pair, profile);
  let summaryCap = "--";
  let summaryCapTitle = "";
  if (Number.isFinite(marketCap) && Number.isFinite(fdv) && Math.abs(marketCap - fdv) > 1) {
    const marketCapDisplay = buildCurrencyDisplay(marketCap);
    const fdvDisplay = buildCurrencyDisplay(fdv);
    summaryCap = `${marketCapDisplay.display} / ${fdvDisplay.display}`;
    summaryCapTitle = `${marketCapDisplay.full} / ${fdvDisplay.full}`;
  } else {
    const capDisplay = buildCurrencyDisplay(Number.isFinite(marketCap) ? marketCap : fdv);
    summaryCap = Number.isFinite(marketCap) || Number.isFinite(fdv) ? capDisplay.display : formatDisplayCap(marketCap, fdv);
    summaryCapTitle = capDisplay.full;
  }
  setText("summary-marketcap", summaryCap);
  setTitle("summary-marketcap", summaryCapTitle);

  setText("token-address-link", t("summary.contractPrefix", { value: profile.address }, `Contract: ${profile.address}`));
  setHref("token-address-link", `${BSC_SCAN_BASE}/token/${profile.address}`);
  setHref("bsc-link", `${BSC_SCAN_BASE}/token/${profile.address}`);

  if (pair?.url) {
    const pairLabel = getPairLabel(pair, profile);
    setText(
      "pair-link",
      pair.pairAddress
        ? t("summary.mainPair", { pair: pairLabel }, `Main Pair: ${pairLabel}`)
        : t("summary.marketPage", { pair: pairLabel }, `Market Page: ${pairLabel}`),
    );
    setHref("pair-link", pair.url);
    setText(
      "dex-link",
      t(
        "summary.openSource",
        { source: `${pair.sourceLabel}${pair.dexId && pair.dexId !== "--" ? ` · ${pair.dexId}` : ""}` },
        `Open ${pair.sourceLabel}${pair.dexId && pair.dexId !== "--" ? ` · ${pair.dexId}` : ""}`,
      ),
    );
    setHref("dex-link", pair.sourceUrl || pair.url);
  } else {
    setText("pair-link", t("summary.findPair", {}, "Find Main Pair"));
    setHref("pair-link", `${DEXSCREENER_SEARCH_BASE}${profile.address}`);
    setText("dex-link", t("summary.openDex", {}, "Open DexScreener"));
    setHref("dex-link", `${DEXSCREENER_SEARCH_BASE}${profile.address}`);
  }
}

function renderOverview(profile, pair) {
  setText("overview-note", t("overview.onchainReady", { time: formatDate(state.lastUpdated) }, `On-chain read completed · ${formatDate(state.lastUpdated)}`));
  const poolLiquidityDisplay = buildCurrencyDisplay(Number(pair?.liquidity?.usd || NaN));
  const poolVolumeDisplay = buildCurrencyDisplay(Number(pair?.volume?.h24 || NaN));

  const overviewItems = [
    {
      label: t("overview.totalSupply", {}, "Total Supply"),
      value: formatTokenAmount(profile.totalSupply),
      note: t("overview.totalSupplyNote", {}, "Calculated from contract decimals"),
    },
    {
      label: t("overview.circulatingSupply", {}, "Circulating Supply"),
      value: formatTokenAmount(profile.circulatingSupply),
      note: t("overview.circulatingSupplyNote", {}, "Total supply minus burn-address balances"),
    },
    {
      label: t("overview.burnedSupply", {}, "Burned Supply"),
      value: formatTokenAmount(profile.burnedSupply),
      note: t("overview.burnedSupplyNote", {}, "Zero + dead address combined"),
    },
    { label: t("overview.burnRatio", {}, "Burn Ratio"), value: Number.isFinite(profile.burnRatio) ? formatPercent(profile.burnRatio) : "--" },
    { label: t("overview.ownerStatus", {}, "Owner Status"), value: formatOwnerStatus(profile.ownerStatus) },
    { label: "Decimals", value: Number.isFinite(profile.decimals) ? String(profile.decimals) : "--" },
  ];

  const poolItems = pair
    ? [
        {
          label: pair.pairAddress ? t("summary.openPair", {}, "Main Pair") : t("status.marketSnapshot", {}, "Market Snapshot"),
          value: getPairLabel(pair, profile),
          note: pair.dexId && pair.dexId !== "--" ? `${pair.sourceLabel} · ${pair.dexId}` : pair.sourceLabel,
        },
        {
          label: t("market.liquidity", {}, "Liquidity"),
          value: poolLiquidityDisplay.display,
          note: poolLiquidityDisplay.isCompact
            ? `${t("overview.poolLiquiditySnapshot", {}, "Public Main Pair Snapshot")} · ${poolLiquidityDisplay.full}`
            : t("overview.poolLiquiditySnapshot", {}, "Public Main Pair Snapshot"),
        },
        {
          label: t("overview.volume24h", {}, "24H Volume"),
          value: poolVolumeDisplay.display,
          note: poolVolumeDisplay.isCompact
            ? `${t("market.note24h", {}, "Past 24 hours")} · ${poolVolumeDisplay.full}`
            : t("market.note24h", {}, "Past 24 hours"),
        },
        {
          label: t("overview.mainPairAge", {}, "Main Pair Age"),
          value: Number.isFinite(daysSince(pair.pairCreatedAt))
            ? formatDaysValue(daysSince(pair.pairCreatedAt))
            : "--",
          note: Number.isFinite(Number(pair.pairCreatedAt))
            ? t("overview.createdAt", { time: formatDate(Number(pair.pairCreatedAt)) }, `Created ${formatDate(Number(pair.pairCreatedAt))}`)
            : t("overview.mainPairAgeMissing", {}, "The DEX did not return a pair creation time"),
        },
      ]
    : [
        {
          label: t("summary.openPair", {}, "Main Pair"),
          value: t("overview.noMainPair", {}, "Not found yet"),
          note: t("overview.noMainPairNote", {}, "The current market source did not return a public BNB Chain pair"),
        },
      ];

  const baseAddressItems = [
    {
      label: t("overview.tokenContract", {}, "Token Contract"),
      value: profile.address,
      href: `${BSC_SCAN_BASE}/token/${profile.address}`,
      note: t("overview.bscScan", {}, "BscScan Contract Page"),
    },
    {
      label: t("overview.ownerAddress", {}, "Owner Address"),
      value: profile.owner,
      href: profile.owner && profile.owner !== ZERO_ADDRESS ? `${BSC_SCAN_BASE}/address/${profile.owner}` : null,
      note: formatOwnerStatus(profile.ownerStatus),
      visible: Boolean(profile.owner && profile.owner !== ZERO_ADDRESS),
    },
    {
      label: t("overview.mainPairAddress", {}, "Main Pair Address"),
      value: pair?.pairAddress,
      href: pair?.url || null,
      note: pair?.dexId || "DexScreener",
      visible: Boolean(pair?.pairAddress && pair?.url),
    },
    {
      label: t("overview.sourcePage", { source: pair?.sourceLabel || "DexScreener" }, `${pair?.sourceLabel || "DexScreener"} Page`),
      value: profile.symbol || shortAddress(profile.address),
      href: pair?.sourceUrl || `${DEXSCREENER_SEARCH_BASE}${profile.address}`,
      note: t("overview.sourceEntry", { source: pair?.sourceLabel || "DexScreener" }, `${pair?.sourceLabel || "DexScreener"} Entry`),
    },
  ];

  const baseAddressKeys = new Set(
    baseAddressItems
      .filter((item) => item && item.value)
      .map((item) => `${String(item.value).toLowerCase()}::${String(item.href || "").toLowerCase()}`),
  );
  const baseAddressValues = new Set(
    baseAddressItems
      .map((item) => normalizeAddressValue(item?.value))
      .filter(Boolean)
      .map((item) => item.toLowerCase()),
  );
  const addressItems = [
    ...baseAddressItems,
    ...(profile.addressLinks || []).filter((item) => {
      const key = `${String(item.value).toLowerCase()}::${String(item.href || "").toLowerCase()}`;
      const normalizedValue = normalizeAddressValue(item?.value);
      return !baseAddressKeys.has(key) && !(normalizedValue && baseAddressValues.has(normalizedValue.toLowerCase()));
    }),
  ];

  setHtml("overview-grid", buildStatItems(overviewItems));
  setHtml("pool-grid", buildStatItems(poolItems));
  setHtml("address-list", buildAddressCards(addressItems));
}

function renderMarket(pair, profile, marketMeta) {
  if (!pair) {
    const contractPrice = safeNumber(profile?.contractPriceUsd);
    const contractPriceDisplay = buildCurrencyDisplay(contractPrice, {
      digits: contractPrice > 0 && contractPrice < 1 ? 6 : 2,
      compactThreshold: 100000,
    });
    const { marketCap, fdv } = resolveCapMetrics(null, profile);
    const contractCapDisplay = buildCurrencyDisplay(marketCap);
    const contractFdvDisplay = buildCurrencyDisplay(fdv);
    const lightweightMetrics = [
      {
        label: t("market.currentPrice", {}, "On-Chain Price"),
        value: contractPriceDisplay.display,
        note: t("market.currentPriceNote", {}, "Returned by contract getTokenPrice()"),
        detail: contractPriceDisplay.isCompact ? t("common.fullValue", { value: contractPriceDisplay.full }, `Full: ${contractPriceDisplay.full}`) : "",
        title: contractPriceDisplay.full,
        highlight: true,
        visible: Number.isFinite(contractPrice),
      },
      {
        label: t("market.estimatedMarketCap", {}, "Circulating Market Cap"),
        value: contractCapDisplay.display,
        note: t("market.estimatedMarketCapNote", {}, "Derived from on-chain price × circulating supply"),
        detail: contractCapDisplay.isCompact ? t("common.fullValue", { value: contractCapDisplay.full }, `Full: ${contractCapDisplay.full}`) : "",
        title: contractCapDisplay.full,
        visible: Number.isFinite(marketCap),
      },
      {
        label: t("market.fdv", {}, "FDV"),
        value: contractFdvDisplay.display,
        note: t("market.estimatedFdvNote", {}, "Derived from on-chain price × total supply"),
        detail: contractFdvDisplay.isCompact ? t("common.fullValue", { value: contractFdvDisplay.full }, `Full: ${contractFdvDisplay.full}`) : "",
        title: contractFdvDisplay.full,
        visible: Number.isFinite(fdv),
      },
    ];

    if (lightweightMetrics.some((item) => item.visible !== false)) {
      setText(
        "market-note",
        t(
          "market.lightweightWithValues",
          {},
          "The dashboard is in on-chain lightweight mode, so the cards below come from public contract view values and derived estimates.",
        ),
      );
      setHtml("market-metric-grid", buildMetricCards(lightweightMetrics));
      setVisible("market-chart-grid", false);
      setVisible("market-detail-panel", false);
      setVisible("market-empty", false);
      return;
    }

    setText(
      "market-note",
      t("market.lightweightNoSource", {}, "The dashboard is in on-chain lightweight mode because no usable market source was available."),
    );
    setText(
      "market-empty",
      t(
        "market.lightweightEmpty",
        {},
        "DexScreener, GeckoTerminal, and CoinGecko returned no usable market data, so only base on-chain information remains.",
      ),
    );
    setHtml("market-metric-grid", "");
    setVisible("market-chart-grid", false);
    setVisible("market-detail-panel", false);
    setVisible("market-empty", true);
    return;
  }

  const price = Number(pair.priceUsd || NaN);
  const priceDisplay = buildCurrencyDisplay(price, {
    digits: price > 0 && price < 1 ? 6 : 2,
    compactThreshold: 100000,
  });
  const volumeDisplay = buildCurrencyDisplay(Number(pair.volume?.h24 || NaN));
  const liquidityDisplay = buildCurrencyDisplay(Number(pair.liquidity?.usd || NaN));
  const { marketCap, fdv, marketCapDerived, fdvDerived } = resolveCapMetrics(pair, profile);
  const marketCapDisplay = buildCurrencyDisplay(marketCap);
  const fdvDisplay = buildCurrencyDisplay(fdv);
  const metrics = [
    {
      label: t("market.price", {}, "Price"),
      value: priceDisplay.display,
      note:
        pair.dexId && pair.dexId !== "--"
          ? `${pair.sourceLabel} · ${pair.dexId}`
          : `${pair.sourceLabel} · ${pair.quoteToken?.symbol || "USD"}`,
      title: priceDisplay.full,
      highlight: true,
    },
    {
      label: t("market.change24h", {}, "24H Change"),
      value: Number.isFinite(Number(pair.priceChange?.h24)) ? formatPercent(Number(pair.priceChange.h24)) : "--",
      note: t("market.note24hChange", { source: pair.sourceLabel }, `${pair.sourceLabel} over the last 24H`),
      tone: Number(pair.priceChange?.h24) > 0 ? "positive" : Number(pair.priceChange?.h24) < 0 ? "negative" : "",
    },
    {
      label: t("overview.volume24h", {}, "24H Volume"),
      value: volumeDisplay.display,
      note: t("market.note24h", {}, "Past 24 hours"),
      detail: volumeDisplay.isCompact ? t("common.fullValue", { value: volumeDisplay.full }, `Full: ${volumeDisplay.full}`) : "",
      title: volumeDisplay.full,
    },
    {
      label: t("market.liquidity", {}, "Liquidity"),
      value: liquidityDisplay.display,
      note: pair.pairAddress
        ? t("market.liquidityDepth", {}, "Main pair depth")
        : t("market.liquidityUnavailable", { source: pair.sourceLabel }, `${pair.sourceLabel} did not return public pool depth`),
      detail: liquidityDisplay.isCompact ? t("common.fullValue", { value: liquidityDisplay.full }, `Full: ${liquidityDisplay.full}`) : "",
      title: liquidityDisplay.full,
      visible: Number.isFinite(Number(pair.liquidity?.usd || NaN)),
    },
    {
      label: t("market.marketCap", {}, "Market Cap"),
      value: marketCapDisplay.display,
      note: marketCapDerived ? t("market.marketCapDerived", {}, "Derived from circulating supply × price") : `${pair.sourceLabel} market cap`,
      detail: marketCapDisplay.isCompact ? t("common.fullValue", { value: marketCapDisplay.full }, `Full: ${marketCapDisplay.full}`) : "",
      title: marketCapDisplay.full,
      visible: Number.isFinite(marketCap),
    },
    {
      label: t("market.fdv", {}, "FDV"),
      value: fdvDisplay.display,
      note: fdvDerived ? t("market.fdvDerived", {}, "Derived from total supply × price") : `${pair.sourceLabel} FDV`,
      detail: fdvDisplay.isCompact ? t("common.fullValue", { value: fdvDisplay.full }, `Full: ${fdvDisplay.full}`) : "",
      title: fdvDisplay.full,
      visible: Number.isFinite(fdv),
    },
    {
      label: t("market.buys24h", {}, "24H Buys"),
      value: Number.isFinite(Number(pair.txns?.h24?.buys || NaN))
        ? t("market.tradeCountValue", { count: formatNumber(Number(pair.txns.h24.buys), 0) }, `${formatNumber(Number(pair.txns.h24.buys), 0)} tx`)
        : "--",
      note: t("market.txCountNote", {}, "24H transaction count"),
      visible: Number.isFinite(Number(pair.txns?.h24?.buys || NaN)),
    },
    {
      label: t("market.sells24h", {}, "24H Sells"),
      value: Number.isFinite(Number(pair.txns?.h24?.sells || NaN))
        ? t("market.tradeCountValue", { count: formatNumber(Number(pair.txns.h24.sells), 0) }, `${formatNumber(Number(pair.txns.h24.sells), 0)} tx`)
        : "--",
      note: t("market.txCountNote", {}, "24H transaction count"),
      visible: Number.isFinite(Number(pair.txns?.h24?.sells || NaN)),
    },
  ];

  const notePrefix = pair.pairAddress
    ? t("market.noteFromMainPair", { source: pair.sourceLabel }, `Main pair from ${pair.sourceLabel}`)
    : t("market.noteFromMarket", { source: pair.sourceLabel }, `Market data from ${pair.sourceLabel}`);
  setText(
    "market-note",
    `${notePrefix}${pair.dexId && pair.dexId !== "--" ? ` · ${pair.dexId}` : ""} · ${getPairLabel(pair, profile)}`,
  );
  setHtml("market-metric-grid", buildMetricCards(metrics));
  setVisible("market-chart-grid", true);
  setVisible("market-detail-panel", true);
  setVisible("market-empty", false);

  const priceSeries = buildPriceSeries(pair);
  setHtml("price-chart", buildSparkline(priceSeries));
  setHtml("price-chart-legend", buildPriceLegend(priceSeries));
  setText(
    "price-chart-meta",
    priceSeries.length >= 2
      ? pair.chartMeta || t("market.chartReady", {}, "Price points are ready")
      : t("market.chartInsufficient", { source: pair.sourceLabel }, `${pair.sourceLabel} does not have enough data for a reliable trend line yet`),
  );

  setHtml("activity-chart", buildActivityBars(pair));
  setText(
    "activity-chart-meta",
    Number.isFinite(Number(pair.txns?.h24?.buys || NaN)) || Number.isFinite(Number(pair.txns?.h24?.sells || NaN))
      ? t("market.activityNormalized", { source: pair.sourceLabel }, `Log-normalized · Source ${pair.sourceLabel}`)
      : t("market.activityPartial", { source: pair.sourceLabel }, `Source ${pair.sourceLabel} returned only partial activity fields`),
  );

  setHtml("market-pills", buildChangePills(pair));

  const buys = Number(pair.txns?.h24?.buys || 0);
  const sells = Number(pair.txns?.h24?.sells || 0);
  const total = buys + sells;
  const buyRatio = total > 0 ? (buys / total) * 100 : 50;
  const sellRatio = total > 0 ? (sells / total) * 100 : 50;

  setWidth("buy-bar", clipRatio(buyRatio));
  setWidth("sell-bar", clipRatio(sellRatio));
  setText(
    "buy-sell-caption",
    total > 0
      ? t("market.buySellRatio", { buy: formatNumber(buyRatio, 1), sell: formatNumber(sellRatio, 1) }, `Buy ${formatNumber(buyRatio, 1)}% / Sell ${formatNumber(sellRatio, 1)}%`)
      : t("market.buySellUnavailable", { source: pair.sourceLabel }, `${pair.sourceLabel} did not return buy/sell counts`),
  );
}

function renderContract(profile) {
  const contractItems = [
    {
      label: t("contract.address", {}, "Contract Address"),
      value: profile.address,
      note: t("contract.addressNote", {}, "BNB Chain token contract"),
      mono: true,
    },
    {
      label: t("overview.ownerStatus", {}, "Owner Status"),
      value: formatOwnerStatus(profile.ownerStatus),
      note:
        profile.owner && profile.owner !== ZERO_ADDRESS
          ? shortAddress(profile.owner)
          : profile.owner === ZERO_ADDRESS
            ? t("contract.ownerZero", {}, "owner() returned the zero address")
            : t("contract.ownerMissing", {}, "No manageable owner address was returned"),
    },
    {
      label: t("contract.ownerAddress", {}, "Owner Address"),
      value: profile.owner && profile.owner !== ZERO_ADDRESS ? profile.owner : "--",
      note: t("contract.ownerValue", {}, "Public owner() return value"),
      mono: true,
      visible: Boolean(profile.owner && profile.owner !== ZERO_ADDRESS),
    },
    {
      label: t("contract.extraCount", {}, "Extra Field Count"),
      value: t("risk.someExtras", { count: profile.extras.length }, `${profile.extras.length} extra fields`),
      note: profile.extras.length
        ? t("contract.extraCountDetected", {}, "This contract exposes additional public logic fields")
        : t("contract.extraCountNone", {}, "No extra public fields were detected"),
    },
    ...profile.extras,
  ];

  setHtml("contract-grid", buildStatItems(contractItems));

  const contractEmpty = $("contract-empty");
  if (contractEmpty) {
    if (!profile.extras.length) {
      contractEmpty.textContent = t(
        "contract.noExtras",
        {},
        "No additional public extension fields were detected, so the structure looks closer to a standard ERC-20.",
      );
      contractEmpty.classList.remove("hidden");
    } else {
      contractEmpty.textContent = "";
      contractEmpty.classList.add("hidden");
    }
  }
}

function renderRisk(profile, pair) {
  const { signals, summary } = buildRiskSignals(profile, pair);
  setText("risk-summary-note", summary);
  setHtml("risk-grid", buildRiskCards(signals));

  const insights = buildInsights(profile, pair);
  setHtml(
    "insight-list",
    insights || `<div class="empty-state">${escapeHtml(t("status.noConclusions", {}, "There is not enough market and supply data yet to generate conclusion cards."))}</div>`,
  );
}

export {
  updateCurrentToken,
  showResults,
  hideResults,
  focusSearch,
  resetDisplay,
  renderSources,
  renderSummary,
  renderOverview,
  renderMarket,
  renderContract,
  renderAdvanced,
  renderRisk
};




