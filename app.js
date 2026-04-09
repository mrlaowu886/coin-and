const DEFAULT_TOKEN = "";
const CHAIN_ID = 56;
const CHAIN_LABEL = "BNB Chain";
const BSC_SCAN_BASE = "https://bscscan.com";
const DEXSCREENER_SEARCH_BASE = "https://dexscreener.com/search?q=";
const GECKOTERMINAL_API_BASE = "https://api.geckoterminal.com/api/v2";
const GECKOTERMINAL_WEB_BASE = "https://www.geckoterminal.com/bsc";
const COINGECKO_API_BASE = "https://api.coingecko.com/api/v3";
const COINGECKO_WEB_SEARCH_BASE = "https://www.coingecko.com/en/search?query=";
const COINGECKO_PLATFORM_ID = "binance-smart-chain";
const DEAD_ADDRESS = "0x000000000000000000000000000000000000dEaD";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const RPC_ENDPOINTS = [
  "https://bsc-dataseed.binance.org/",
  "https://bsc.publicnode.com",
  "https://rpc.ankr.com/bsc",
];

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint256)",
];

const OPTIONAL_ABI = [
  "function owner() view returns (address)",
  "function peakPrice() view returns (uint256)",
  "function totalNodes() view returns (uint256)",
  "function lastTotalLP() view returns (uint256)",
  "function littlePool() view returns (address)",
  "function techPool() view returns (address)",
  "function isStart() view returns (uint256)",
  "function usdt() view returns (address)",
  "function ecologyAddress() view returns (address)",
  "function projectOwner() view returns (address)",
  "function openPan() view returns (bool)",
  "function uniswapRouter() view returns (address)",
  "function uniswapPair() view returns (address)",
  "function minTime() view returns (uint256)",
  "function isBuyFee() view returns (bool)",
  "function isSellFee() view returns (bool)",
  "function buyFee() view returns (uint256)",
  "function sellFee() view returns (uint256)",
  "function sellFeeEcology() view returns (uint256)",
  "function ownLpU() view returns (uint256)",
  "function directAccumulation() view returns (uint256)",
  "function burnAddr() view returns (address)",
  "function profitFee() view returns (uint256)",
  "function profitFeeDead() view returns (uint256)",
  "function maxSellAmountIndex() view returns (uint256)",
  "function productionFactor() view returns (uint256)",
  "function crashReferencePrice() view returns (uint256)",
  "function effectiveLpU() view returns (uint256)",
  "function startTime() view returns (uint256)",
  "function lastUpdateTime() view returns (uint256)",
  "function totalLpU() view returns (uint256)",
  "function castingAddress() view returns (address)",
  "function effectiveLpCount() view returns (uint256)",
  "function queueLen() view returns (uint256)",
  "function currentIdx() view returns (uint256)",
  "function isSellBurn() view returns (bool)",
  "function recycleDay() view returns (uint256)",
  "function getTokenPrice() view returns (uint256)",
  "function pancakeFactory() view returns (address)",
  "function pancakePair() view returns (address)",
  "function globalIndex() view returns (uint256)",
  "function globalNodeIndex() view returns (uint256)",
  "function lastUpdate() view returns (uint256)",
];

const I18N_CONFIG = window.TOKEN_DASHBOARD_I18N || {
  defaultLocale: "en",
  storageKey: "token-dashboard-language",
  rtlLocales: [],
  options: [
    { value: "auto", nativeLabel: "Auto" },
    { value: "en", nativeLabel: "English" },
  ],
  translations: {},
};
const DEFAULT_LANGUAGE_PREFERENCE = "auto";
const RTL_LOCALES = new Set(I18N_CONFIG.rtlLocales || []);

const state = {
  currentToken: DEFAULT_TOKEN,
  chain: null,
  market: null,
  marketMeta: null,
  lastUpdated: null,
  languagePreference: DEFAULT_LANGUAGE_PREFERENCE,
  locale: I18N_CONFIG.defaultLocale || "en",
  searchHint: null,
  lookupNonce: 0,
};

function $(id) {
  return document.getElementById(id);
}

function setText(id, value) {
  const element = $(id);
  if (element) {
    element.textContent = value;
  }
}

function setHtml(id, value) {
  const element = $(id);
  if (element) {
    element.innerHTML = value;
  }
}

function setHref(id, href) {
  const element = $(id);
  if (element && href) {
    element.href = href;
  }
}

function setTitle(id, value) {
  const element = $(id);
  if (element) {
    if (value) {
      element.title = value;
    } else {
      element.removeAttribute("title");
    }
  }
}

function setWidth(id, percent) {
  const element = $(id);
  if (element) {
    element.style.width = `${Math.max(0, Math.min(100, percent))}%`;
  }
}

function setVisible(id, visible) {
  const element = $(id);
  if (element) {
    element.classList.toggle("hidden", !visible);
  }
}

function setSearchHint(text, tone = "neutral") {
  const element = $("search-hint");
  if (!element) return;

  if (!text) {
    element.textContent = "";
    element.className = "search-hint hidden";
    return;
  }

  element.textContent = text;
  element.className = `search-hint ${tone}`;
}

function resolveSupportedLocale(candidate) {
  if (!candidate) return null;
  const normalized = String(candidate).trim().toLowerCase();

  if (normalized.startsWith("zh-tw") || normalized.startsWith("zh-hk") || normalized.startsWith("zh-mo")) {
    return "zh-TW";
  }
  if (normalized.startsWith("zh")) return "zh-CN";
  if (normalized.startsWith("pt")) return "pt";
  if (normalized.startsWith("es")) return "es";
  if (normalized.startsWith("fr")) return "fr";
  if (normalized.startsWith("de")) return "de";
  if (normalized.startsWith("ru")) return "ru";
  if (normalized.startsWith("ja")) return "ja";
  if (normalized.startsWith("ko")) return "ko";
  if (normalized.startsWith("ar")) return "ar";
  if (normalized.startsWith("hi")) return "hi";
  if (normalized.startsWith("tr")) return "tr";
  if (normalized.startsWith("id")) return "id";
  if (normalized.startsWith("vi")) return "vi";
  if (normalized.startsWith("it")) return "it";
  if (normalized.startsWith("th")) return "th";
  if (normalized.startsWith("en")) return "en";
  return null;
}

function detectSystemLocale() {
  const candidates = [...(navigator.languages || []), navigator.language, navigator.userLanguage];
  for (const candidate of candidates) {
    const resolved = resolveSupportedLocale(candidate);
    if (resolved) return resolved;
  }
  return I18N_CONFIG.defaultLocale || "en";
}

function getLanguageBundle(locale = state.locale) {
  const englishBundle = I18N_CONFIG.translations?.en || {};
  const localeBundle = I18N_CONFIG.translations?.[locale] || {};
  return locale === "en" ? englishBundle : { ...englishBundle, ...localeBundle };
}

function interpolate(template, params = {}) {
  return String(template).replace(/\{(\w+)\}/g, (_, key) => {
    return params[key] ?? "";
  });
}

function t(key, params = {}, fallback = key) {
  const bundle = getLanguageBundle(state.locale);
  const template = bundle[key] ?? fallback ?? key;
  return interpolate(template, params);
}

function getLanguageNativeLabel(locale) {
  const item = (I18N_CONFIG.options || []).find((option) => option.value === locale);
  return item?.nativeLabel || locale || "English";
}

function getActiveLocale(preference = state.languagePreference) {
  return preference === DEFAULT_LANGUAGE_PREFERENCE ? detectSystemLocale() : resolveSupportedLocale(preference) || "en";
}

function persistLanguagePreference(value) {
  try {
    localStorage.setItem(I18N_CONFIG.storageKey || "token-dashboard-language", value);
  } catch (error) {
    console.warn("Unable to persist language preference.", error);
  }
}

function loadLanguagePreference() {
  try {
    return localStorage.getItem(I18N_CONFIG.storageKey || "token-dashboard-language") || DEFAULT_LANGUAGE_PREFERENCE;
  } catch (error) {
    return DEFAULT_LANGUAGE_PREFERENCE;
  }
}

function createAppError(key, params = {}, fallback = "") {
  const error = new Error(key);
  error.i18nKey = key;
  error.i18nParams = params;
  error.i18nFallback = fallback;
  return error;
}

function getErrorMessage(error) {
  if (error?.i18nKey) {
    return t(error.i18nKey, error.i18nParams, error.i18nFallback || error.i18nKey);
  }
  if (error instanceof Error) {
    return error.message;
  }
  return t("error.requestFailed", {}, "Request failed");
}

function updateDocumentMetadata(profile = state.chain) {
  document.title = profile?.symbol ? `${profile.symbol} · ${t("meta.title", {}, "BNB Chain Token Lookup Dashboard")}` : t("meta.title", {}, "BNB Chain Token Lookup Dashboard");

  const metaDescription = $("meta-description");
  if (metaDescription) {
    metaDescription.setAttribute(
      "content",
      t(
        "meta.description",
        {},
        "Enter a BscScan link or BNB Chain token contract address to view live price, liquidity, FDV, on-chain supply, and 24H activity.",
      ),
    );
  }
}

function rememberStaticFallbacks() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    if (!element.dataset.i18nFallback) {
      element.dataset.i18nFallback = element.textContent.trim();
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    if (!element.dataset.i18nPlaceholderFallback) {
      element.dataset.i18nPlaceholderFallback = element.getAttribute("placeholder") || "";
    }
  });
}

function renderLanguageOptions() {
  const trigger = $("language-trigger");
  const triggerLabel = $("language-trigger-label");
  const menu = $("language-menu");
  if (!trigger || !triggerLabel || !menu) return;

  const selectedValue =
    state.languagePreference === DEFAULT_LANGUAGE_PREFERENCE
      ? state.locale
      : resolveSupportedLocale(state.languagePreference) || state.locale || "en";

  const options = (I18N_CONFIG.options || []).map((option) => {
    const isSelected = option.value === selectedValue;
    return `<button class="language-option${isSelected ? " active" : ""}" type="button" role="option" data-language-option="${escapeHtml(
      option.value,
    )}" aria-selected="${isSelected ? "true" : "false"}">${escapeHtml(option.nativeLabel)}</button>`;
  });

  triggerLabel.textContent = getLanguageNativeLabel(selectedValue);
  trigger.setAttribute("aria-label", t("language.label", {}, "Language"));
  menu.setAttribute("aria-label", t("language.label", {}, "Language"));
  menu.innerHTML = options.join("");
}

function setLanguageMenuOpen(open) {
  const picker = $("language-picker");
  const trigger = $("language-trigger");
  const menu = $("language-menu");
  if (!picker || !trigger || !menu) return;

  picker.classList.toggle("open", open);
  menu.classList.toggle("hidden", !open);
  trigger.setAttribute("aria-expanded", open ? "true" : "false");
}

function applyI18nToDom() {
  document.documentElement.lang = state.locale;
  document.documentElement.dir = RTL_LOCALES.has(state.locale) ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const fallback = element.dataset.i18nFallback || element.textContent.trim();
    element.textContent = t(element.dataset.i18n, {}, fallback);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const fallback = element.dataset.i18nPlaceholderFallback || element.getAttribute("placeholder") || "";
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder, {}, fallback));
  });

  renderLanguageOptions();
  updateDocumentMetadata();
}

function setSearchHintMessage(key, params = {}, tone = "neutral", fallback = "") {
  state.searchHint = { type: "key", key, params, tone, fallback };
  setSearchHint(t(key, params, fallback), tone);
}

function setSearchHintRaw(text, tone = "neutral") {
  state.searchHint = text ? { type: "raw", text, tone } : null;
  setSearchHint(text, tone);
}

function clearSearchHint() {
  state.searchHint = null;
  setSearchHint("");
}

function refreshSearchHint() {
  if (!state.searchHint) {
    setSearchHint("");
    return;
  }

  if (state.searchHint.type === "key") {
    setSearchHint(t(state.searchHint.key, state.searchHint.params, state.searchHint.fallback), state.searchHint.tone);
    return;
  }

  setSearchHint(state.searchHint.text, state.searchHint.tone);
}

function applyLanguagePreference(preference) {
  state.languagePreference = preference || DEFAULT_LANGUAGE_PREFERENCE;
  state.locale = getActiveLocale(state.languagePreference);
  persistLanguagePreference(state.languagePreference);
  applyI18nToDom();
  refreshSearchHint();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function hasContent(value) {
  if (value === 0 || value === false) return true;
  return value !== null && value !== undefined && value !== "" && value !== "--";
}

function currentLocale() {
  return state.locale || I18N_CONFIG.defaultLocale || "en";
}

function formatNumber(value, digits = 2) {
  if (!Number.isFinite(value)) return "--";
  return new Intl.NumberFormat(currentLocale(), {
    maximumFractionDigits: digits,
  }).format(value);
}

function formatCompact(value, digits = 2) {
  if (!Number.isFinite(value)) return "--";
  return new Intl.NumberFormat(currentLocale(), {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: digits,
  }).format(value);
}

function formatCurrency(value, digits = 2) {
  if (!Number.isFinite(value)) return "--";
  return new Intl.NumberFormat(currentLocale(), {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: digits,
  }).format(value);
}

function formatCompactCurrency(value, digits = 2) {
  if (!Number.isFinite(value)) return "--";
  return new Intl.NumberFormat(currentLocale(), {
    style: "currency",
    currency: "USD",
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: digits,
  }).format(value);
}

function buildCurrencyDisplay(value, options = {}) {
  const { digits = 2, compactThreshold = 100000 } = options;

  if (!Number.isFinite(value)) {
    return {
      display: "--",
      full: "--",
      isCompact: false,
    };
  }

  const full = formatCurrency(value, digits);
  const isCompact = Math.abs(value) >= compactThreshold;

  return {
    display: isCompact ? formatCompactCurrency(value, digits) : full,
    full,
    isCompact,
  };
}

function formatPercent(value, digits = 2) {
  if (!Number.isFinite(value)) return "--";
  const sign = value > 0 ? "+" : "";
  return `${sign}${formatNumber(value, digits)}%`;
}

function formatDate(value) {
  if (!value) return "--";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  return new Intl.DateTimeFormat(currentLocale(), {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatTimeLabel(value) {
  if (!value) return "--";
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  return new Intl.DateTimeFormat(currentLocale(), {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function shortAddress(value) {
  if (!value || value === ZERO_ADDRESS) return "--";
  return `${value.slice(0, 6)}...${value.slice(-4)}`;
}

function formatTokenAmount(value, digits = 2) {
  if (!Number.isFinite(value)) return "--";
  if (value >= 1000) {
    return formatCompact(value, digits);
  }
  return formatNumber(value, digits);
}

function toBigIntValue(value) {
  if (typeof value === "bigint") return value;
  if (typeof value === "number" && Number.isFinite(value)) return BigInt(Math.trunc(value));
  if (typeof value === "string" && value.trim()) {
    try {
      return BigInt(value);
    } catch (error) {
      return null;
    }
  }
  return null;
}

function normalizeAddressValue(value) {
  return typeof value === "string" && ethers.isAddress(value) ? ethers.getAddress(value) : null;
}

function formatUnitsValue(value, decimals = 18, digits = 2) {
  const raw = toBigIntValue(value);
  if (raw === null) return "--";
  return formatTokenAmount(Number(ethers.formatUnits(raw, decimals)), digits);
}

function formatScaledCurrencyValue(value, decimals = 18) {
  const raw = toBigIntValue(value);
  if (raw === null) return "--";

  const numeric = Number(ethers.formatUnits(raw, decimals));
  if (!Number.isFinite(numeric)) return "--";
  return formatCurrency(numeric, numeric > 0 && numeric < 1 ? 6 : 2);
}

function formatPerMilleValue(value, digits = 1) {
  const raw = toBigIntValue(value);
  if (raw === null) return "--";
  return `${formatNumber(Number(raw) / 10, digits)}%`;
}

function formatMultiplierValue(value, decimals = 18, digits = 2) {
  const raw = toBigIntValue(value);
  if (raw === null) return "--";
  return `${formatNumber(Number(ethers.formatUnits(raw, decimals)), digits)}x`;
}

function formatTimestampValue(value) {
  const timestamp = Number(value);
  if (!Number.isFinite(timestamp) || timestamp <= 0) return "--";
  return formatDate(timestamp * 1000);
}

function formatSecondsValue(value) {
  const seconds = Number(value);
  if (!Number.isFinite(seconds)) return "--";
  if (seconds < 60) {
    return new Intl.NumberFormat(currentLocale(), {
      style: "unit",
      unit: "second",
      unitDisplay: "long",
      maximumFractionDigits: 0,
    }).format(seconds);
  }
  if (seconds < 3600) {
    return new Intl.NumberFormat(currentLocale(), {
      style: "unit",
      unit: "minute",
      unitDisplay: "long",
      maximumFractionDigits: 1,
    }).format(seconds / 60);
  }
  return new Intl.NumberFormat(currentLocale(), {
    style: "unit",
    unit: "hour",
    unitDisplay: "long",
    maximumFractionDigits: 1,
  }).format(seconds / 3600);
}

function formatDaysValue(value) {
  const days = Number(value);
  if (!Number.isFinite(days)) return "--";
  return new Intl.NumberFormat(currentLocale(), {
    style: "unit",
    unit: "day",
    unitDisplay: "long",
    maximumFractionDigits: 0,
  }).format(days);
}

function formatTradeCount(value) {
  return `${formatNumber(value, 0)} tx`;
}

function formatOwnerStatus(status) {
  if (status === "renounced") return t("owner.renounced", {}, "Renounced");
  if (status === "managed") return t("owner.managed", {}, "Managed");
  return t("owner.unreadable", {}, "Unreadable");
}

function getSourceLabel(sourceId, fallback = "") {
  if (sourceId === "lightweight") {
    return t("source.lightweight", {}, "On-chain Lightweight Mode");
  }
  return fallback || "Unknown";
}

function ratio(value, total) {
  if (!Number.isFinite(value) || !Number.isFinite(total) || total <= 0) return NaN;
  return (value / total) * 100;
}

function clipRatio(value, cap = 100) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(cap, value));
}

function formatDisplayCap(marketCap, fdv) {
  if (Number.isFinite(marketCap)) return formatCurrency(marketCap);
  if (Number.isFinite(fdv)) return `${formatCurrency(fdv)} FDV`;
  return "--";
}

function hostFromUrl(value) {
  try {
    return new URL(value).host;
  } catch (error) {
    return value || "--";
  }
}

function safeNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : NaN;
}

function formatDexId(value) {
  if (!value) return "--";
  return String(value)
    .replace(/-bsc$/i, "")
    .replaceAll("_", " ")
    .replaceAll("-", " ");
}

function parsePairName(name) {
  const text = String(name || "").trim();
  if (!text.includes("/")) {
    return { baseSymbol: "", quoteSymbol: "", pairLabel: text || "" };
  }

  const [leftRaw, rightRaw] = text.split("/");
  const baseSymbol = String(leftRaw || "").trim();
  const quoteSymbol = String(rightRaw || "")
    .replace(/\s+\d+(\.\d+)?%.*$/u, "")
    .trim();

  return {
    baseSymbol,
    quoteSymbol,
    pairLabel: baseSymbol && quoteSymbol ? `${baseSymbol}/${quoteSymbol}` : text,
  };
}

function formatChartPointLabel(timestamp) {
  if (!timestamp) return "--";
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "--";
  return new Intl.DateTimeFormat(currentLocale(), {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function normalizeChartPoints(points) {
  if (!Array.isArray(points)) return [];

  return points
    .map((item) => {
      const timestamp = Array.isArray(item) ? safeNumber(item[0]) : safeNumber(item?.timestamp);
      const value = Array.isArray(item) ? safeNumber(item[1]) : safeNumber(item?.value);
      return {
        timestamp,
        value,
        label: formatChartPointLabel(timestamp),
      };
    })
    .filter((item) => Number.isFinite(item.timestamp) && Number.isFinite(item.value) && item.value > 0)
    .sort((a, b) => a.timestamp - b.timestamp);
}

function findNearestChartPoint(points, hoursAgo) {
  if (!Array.isArray(points) || !points.length) return null;
  const latest = points[points.length - 1];
  const target = latest.timestamp - hoursAgo * 60 * 60 * 1000;

  let best = points[0];
  let bestDistance = Math.abs(points[0].timestamp - target);

  for (const point of points) {
    const distance = Math.abs(point.timestamp - target);
    if (distance < bestDistance) {
      best = point;
      bestDistance = distance;
    }
  }

  return best;
}

function derivePriceChangesFromChart(points) {
  if (!Array.isArray(points) || points.length < 2) {
    return {};
  }

  const latest = points[points.length - 1];
  const buildChange = (point) => {
    if (!point || !Number.isFinite(point.value) || point.value <= 0 || !Number.isFinite(latest.value)) {
      return NaN;
    }
    return ((latest.value - point.value) / point.value) * 100;
  };

  return {
    h1: buildChange(findNearestChartPoint(points, 1)),
    h6: buildChange(findNearestChartPoint(points, 6)),
    h24: buildChange(points[0]),
  };
}

function pickFirstFinite(...values) {
  for (const value of values) {
    if (Number.isFinite(value)) {
      return value;
    }
  }
  return NaN;
}

function hasMarketData(market) {
  if (!market) return false;

  return [
    safeNumber(market.priceUsd),
    safeNumber(market.volume?.h24),
    safeNumber(market.liquidity?.usd),
    safeNumber(market.marketCap),
    safeNumber(market.fdv),
  ].some((value) => Number.isFinite(value));
}

function getPairLabel(pair, profile) {
  if (pair?.pairLabel && pair.pairLabel !== "Token / USD") return pair.pairLabel;
  if (pair?.baseToken?.symbol && pair?.quoteToken?.symbol) {
    return `${pair.baseToken.symbol}/${pair.quoteToken.symbol}`;
  }
  if (profile?.symbol) {
    return `${profile.symbol}/USD`;
  }
  return t("status.result", {}, "Market Snapshot");
}

function resolveCapMetrics(pair, profile) {
  const price = pickFirstFinite(safeNumber(pair?.priceUsd), safeNumber(profile?.contractPriceUsd));
  const rawMarketCap = safeNumber(pair?.marketCap);
  const rawFdv = safeNumber(pair?.fdv);
  const derivedMarketCap =
    !Number.isFinite(rawMarketCap) && Number.isFinite(price) && Number.isFinite(profile?.circulatingSupply)
      ? price * profile.circulatingSupply
      : NaN;
  const derivedFdv =
    !Number.isFinite(rawFdv) && Number.isFinite(price) && Number.isFinite(profile?.totalSupply)
      ? price * profile.totalSupply
      : NaN;

  return {
    marketCap: Number.isFinite(rawMarketCap) ? rawMarketCap : derivedMarketCap,
    fdv: Number.isFinite(rawFdv) ? rawFdv : derivedFdv,
    marketCapDerived: !Number.isFinite(rawMarketCap) && Number.isFinite(derivedMarketCap),
    fdvDerived: !Number.isFinite(rawFdv) && Number.isFinite(derivedFdv),
  };
}

function daysSince(timestamp) {
  if (!timestamp) return NaN;
  return (Date.now() - Number(timestamp)) / (1000 * 60 * 60 * 24);
}

async function withTimeout(promise, ms, label) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timeout`)), ms);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

async function getProvider() {
  for (const url of RPC_ENDPOINTS) {
    try {
      const provider = new ethers.JsonRpcProvider(url, CHAIN_ID);
      await withTimeout(provider.getBlockNumber(), 7000, "rpc");
      return { provider, url };
    } catch (error) {
      console.warn(`RPC failed: ${url}`, error);
    }
  }

  throw createAppError("error.rpcUnavailable", {}, "Unable to connect to an available BNB Chain public RPC");
}

async function readOptional(contract, method, args = []) {
  try {
    return await contract[method](...args);
  } catch (error) {
    return null;
  }
}

async function readOptionalMap(contract, methods) {
  const entries = [];

  for (const method of methods) {
    entries.push([method, await readOptional(contract, method)]);
  }

  return Object.fromEntries(entries);
}

async function fetchJson(url, label) {
  const response = await withTimeout(fetch(url), 12000, label);

  if (!response.ok) {
    throw new Error(`${label} returned ${response.status}`);
  }

  return response.json();
}

function extractTokenAddress(input) {
  const trimmed = (input || "").trim();

  if (!trimmed) {
    throw createAppError("error.input.empty", {}, "Enter a token contract address or BscScan link.");
  }

  if (trimmed.includes("://") && !trimmed.includes("bscscan.com")) {
    throw createAppError(
      "error.input.unsupported",
      {},
      "This template currently supports BscScan links or BNB Chain contract addresses.",
    );
  }

  const match = trimmed.match(/0x[a-fA-F0-9]{40}/);
  if (!match) {
    throw createAppError("error.input.noAddress", {}, "No valid 0x contract address was detected.");
  }

  return ethers.getAddress(match[0]);
}

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
  window.scrollTo({ top: 0, behavior: "smooth" });
  window.setTimeout(() => {
    $("search-input").focus();
    $("search-input").select();
  }, 220);
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

async function readTokenProfile(address) {
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
    contractPriceUsd: Number.isFinite(contractPriceUsd) && contractPriceUsd > 0 ? contractPriceUsd : NaN,
    rpcUrl: url,
    checkedAt: new Date(),
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

async function fetchMarketData(address) {
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
        reason: t("error.noMarketFields", {}, "No usable market fields were returned"),
      });
    } catch (error) {
      attempts.push({
        id: source.id,
        label: source.label,
        reason: error instanceof Error ? error.message : t("error.requestFailed", {}, "Request failed"),
      });
    }
  }

  return {
    market: null,
    meta: buildLightweightMeta(attempts),
  };
}

async function runLookup(rawInput = state.currentToken) {
  const requestId = (state.lookupNonce += 1);
  let address;

  try {
    address = extractTokenAddress(rawInput);
  } catch (error) {
    setSearchHintMessage(error.i18nKey || "error.requestFailed", error.i18nParams || {}, "bad", getErrorMessage(error));
    return;
  }

  updateCurrentToken(address);
  showResults();
  resetDisplay();
  setText("summary-title", shortAddress(address));
  setText("summary-subtitle", t("status.loading", {}, "Reading on-chain and multi-source market data..."));
  setSearchHintMessage("hint.loading", {}, "neutral", "Loading on-chain and market data, please wait...");

  const [chainResult, marketResult] = await Promise.allSettled([readTokenProfile(address), fetchMarketData(address)]);

  if (requestId !== state.lookupNonce) {
    return;
  }

  const profile = chainResult.status === "fulfilled" ? chainResult.value : null;
  const marketPayload =
    marketResult.status === "fulfilled"
      ? marketResult.value
      : {
          market: null,
          meta: buildLightweightMeta([
            {
              id: "market",
              label: t("nav.market", {}, "Market"),
              reason: marketResult.reason instanceof Error ? marketResult.reason.message : t("error.requestFailed", {}, "Request failed"),
            },
          ]),
        };
  const pair = marketPayload.market;
  const marketMeta = marketPayload.meta;

  state.chain = profile;
  state.market = pair;
  state.marketMeta = marketMeta;
  state.lastUpdated = new Date();
  updateDocumentMetadata(profile);

  if (!profile) {
    const errorText =
      chainResult.status === "rejected"
        ? getErrorMessage(chainResult.reason)
        : t("status.chainReadFailed", {}, "Unable to read ERC-20 on-chain information for this address.");

    setText("summary-title", t("status.chainFailed", {}, "On-Chain Read Failed"));
    setText("summary-subtitle", errorText);
    setText("overview-note", t("status.chainReadFailed", {}, "On-chain data read failed"));
    setText("market-note", t("status.marketSkipped", {}, "The market panel stays collapsed because the on-chain read failed."));
    setText("risk-summary-note", t("status.riskLimited", {}, "Risk conclusions are limited when on-chain data fails."));
    setHtml("overview-grid", `<p class="empty-state">${escapeHtml(errorText)}</p>`);
    setHtml("pool-grid", "");
    setHtml("address-list", "");
    setHtml(
      "contract-grid",
      `<p class="empty-state">${escapeHtml(t("status.contractPanelFailed", {}, "Unable to build the contract field panel. Please confirm the input is a BNB Chain token contract address."))}</p>`,
    );
    setHtml(
      "risk-grid",
      `<div class="empty-state">${escapeHtml(t("status.riskPanelFailed", {}, "On-chain base data is unavailable, so risk conclusions cannot be generated for now."))}</div>`,
    );
    setHtml("insight-list", "");
    setVisible("market-chart-grid", false);
    setVisible("market-detail-panel", false);
    setVisible("market-empty", true);
    renderSources(false, pair, marketMeta, null);
    setSearchHintMessage("hint.lookupFailed", { message: errorText }, "bad", `Lookup failed: ${errorText}`);
    return;
  }

  renderSummary(profile, pair, marketMeta);
  renderOverview(profile, pair);
  renderMarket(pair, profile, marketMeta);
  renderContract(profile);
  renderRisk(profile, pair);
  renderSources(true, pair, marketMeta, profile);

  if (pair) {
    setSearchHintMessage(
      marketMeta?.fallbackUsed ? "hint.lookupDoneFallback" : "hint.lookupDonePrimary",
      {
        name: profile.name,
        source: getSourceLabel(marketMeta?.sourceId, marketMeta?.sourceLabel),
      },
      "good",
      marketMeta?.fallbackUsed
        ? `Lookup complete: on-chain fields for ${profile.name} are ready, and ${getSourceLabel(marketMeta?.sourceId, marketMeta?.sourceLabel)} is being used as the fallback market source.`
        : `Lookup complete: on-chain fields and main-pair market data for ${profile.name} are ready.`,
    );
  } else {
    setSearchHintMessage(
      "hint.lookupDoneLight",
      { symbol: profile.symbol },
      "neutral",
      `On-chain information is ready, but market data is unavailable, so ${profile.symbol} is shown in on-chain lightweight mode.`,
    );
  }
}

async function copyAddress() {
  if (!state.currentToken) {
    setSearchHintMessage("hint.copyUnavailable", {}, "bad", "There is no contract address available to copy yet.");
    return;
  }

  try {
    await navigator.clipboard.writeText(state.currentToken);
    setSearchHintMessage("hint.copySuccess", { address: state.currentToken }, "good", `Copied contract address: ${state.currentToken}`);
  } catch (error) {
    setSearchHintMessage("hint.copyFailed", {}, "bad", "Copy failed. Please copy the current contract address manually.");
  }
}

function init() {
  rememberStaticFallbacks();
  state.languagePreference = loadLanguagePreference();
  state.locale = getActiveLocale(state.languagePreference);
  applyI18nToDom();

  hideResults();
  $("search-input").value = "";
  clearSearchHint();

  if (!window.ethers) {
    setSearchHintMessage("hint.ethersMissing", {}, "bad", "ethers.js did not load successfully, so on-chain lookups are unavailable right now.");
  }

  $("language-trigger").addEventListener("click", (event) => {
    event.stopPropagation();
    const picker = $("language-picker");
    setLanguageMenuOpen(!picker?.classList.contains("open"));
  });

  $("language-menu").addEventListener("click", async (event) => {
    const option = event.target.closest("[data-language-option]");
    if (!option) return;

    setLanguageMenuOpen(false);
    applyLanguagePreference(option.dataset.languageOption);
    if (state.currentToken) {
      await runLookup(state.currentToken);
    }
  });

  document.addEventListener("click", (event) => {
    const picker = $("language-picker");
    if (picker && !picker.contains(event.target)) {
      setLanguageMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setLanguageMenuOpen(false);
    }
  });

  $("search-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    await runLookup($("search-input").value);
  });

  $("summary-refresh-button").addEventListener("click", async () => {
    if (!state.currentToken) {
      focusSearch();
      return;
    }
    await runLookup(state.currentToken);
  });

  $("summary-search-button").addEventListener("click", () => {
    hideResults();
    $("search-input").value = "";
    state.currentToken = "";
    state.chain = null;
    state.market = null;
    state.marketMeta = null;
    state.lastUpdated = null;
    clearSearchHint();
    resetDisplay();
    updateDocumentMetadata(null);
    focusSearch();
  });

  $("copy-address").addEventListener("click", copyAddress);

  const tokenParam = new URLSearchParams(window.location.search).get("token");
  if (tokenParam) {
    $("search-input").value = tokenParam;
    runLookup(tokenParam);
  }
}

window.addEventListener("languagechange", async () => {
  if (state.languagePreference !== DEFAULT_LANGUAGE_PREFERENCE) return;
  applyLanguagePreference(DEFAULT_LANGUAGE_PREFERENCE);
  if (state.currentToken) {
    await runLookup(state.currentToken);
  }
});

window.addEventListener("DOMContentLoaded", init);
