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
const ethers = window.ethers;
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
  "function unclaimed(address) view returns (uint256)",
  "function nodes(address) view returns (uint256)",
  "function lptOf(address) view returns (uint256)",
  "function LPContribution(address) view returns (uint256)",
  "function userIndex(address) view returns (uint256)",
  "function userNodeIndex(address) view returns (uint256)",
  "function sharedLP(address) view returns (uint256)",
  "function sharedEquity(address) view returns (uint256)",
  "function referee(address) view returns (address)",
];

const RETURN_QUEUE_ABI = [
  "function token() view returns (address)",
  "function queueLen() view returns (uint256)",
  "function currentIdx() view returns (uint256)",
  "function amountBefore(address) view returns (uint256)",
  "function amountQueue(uint256) view returns (uint256)",
  "function addressQueue(uint256) view returns (address)",
  "function claimedQueue(uint256) view returns (uint256)",
  "function MAX_LOOP() view returns (uint256)",
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
  advancedAddressTarget: "",
  advancedAddressSnapshot: null,
  languagePreference: DEFAULT_LANGUAGE_PREFERENCE,
  locale: I18N_CONFIG.defaultLocale || "en",
  searchHint: null,
  lookupNonce: 0,
};

let cachedProviderConnection = null;

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

function getAutoLanguageLabel(locale = state.locale || detectSystemLocale()) {
  const resolvedLocale = resolveSupportedLocale(locale) || detectSystemLocale();
  const nativeLabel = getLanguageNativeLabel(resolvedLocale);
  return t("language.auto", { language: nativeLabel }, `Follow System (${nativeLabel})`);
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

  const isAutoSelected = state.languagePreference === DEFAULT_LANGUAGE_PREFERENCE;
  const selectedValue = isAutoSelected
    ? DEFAULT_LANGUAGE_PREFERENCE
    : resolveSupportedLocale(state.languagePreference) || state.locale || "en";

  const options = (I18N_CONFIG.options || []).map((option) => {
    const isSelected = option.value === selectedValue;
    const optionLabel = option.value === DEFAULT_LANGUAGE_PREFERENCE ? getAutoLanguageLabel() : option.nativeLabel;
    return `<button class="language-option${isSelected ? " active" : ""}" type="button" role="option" data-language-option="${escapeHtml(
      option.value,
    )}" aria-selected="${isSelected ? "true" : "false"}">${escapeHtml(optionLabel)}</button>`;
  });

  triggerLabel.textContent = isAutoSelected ? getAutoLanguageLabel() : getLanguageNativeLabel(selectedValue);
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
  document.body.classList.toggle("menu-open", open);
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

async function getProvider(forceRefresh = false) {
  if (!forceRefresh && cachedProviderConnection) {
    return cachedProviderConnection;
  }

  cachedProviderConnection = null;

  for (const url of RPC_ENDPOINTS) {
    try {
      const provider = new ethers.JsonRpcProvider(url, CHAIN_ID);
      await withTimeout(provider.getBlockNumber(), 7000, "rpc");
      cachedProviderConnection = { provider, url };
      return cachedProviderConnection;
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

  for (const descriptor of methods) {
    const method = Array.isArray(descriptor) ? descriptor[0] : descriptor;
    const args = Array.isArray(descriptor) ? descriptor[1] || [] : [];
    entries.push([method, await readOptional(contract, method, args)]);
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

export {
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
  withTimeout,
  getProvider,
  readOptional,
  readOptionalMap,
  fetchJson,
  extractTokenAddress
};










