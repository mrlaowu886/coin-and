import * as core from './core.js';
import {
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
} from './ui.js';
import {
  readTokenProfile,
  fetchMarketData,
  buildLightweightMeta,
  readProtocolAddressSnapshot,
  relocalizeCachedProfile,
  relocalizeCachedMarket,
  relocalizeCachedMarketMeta
} from './data.js';

const {
  state,
  DEFAULT_LANGUAGE_PREFERENCE,
  $,
  extractTokenAddress,
  setSearchHintMessage,
  getErrorMessage,
  setText,
  setHtml,
  setVisible,
  t,
  ethers,
  shortAddress,
  escapeHtml,
  getSourceLabel,
  updateDocumentMetadata,
  rememberStaticFallbacks,
  loadLanguagePreference,
  getActiveLocale,
  applyI18nToDom,
  clearSearchHint,
  applyLanguagePreference,
  setLanguageMenuOpen
} = core;
async function runLookup(rawInput = state.currentToken, options = {}) {
  setLanguageMenuOpen(false);
  const { forceRefresh = false } = options;
  const requestId = (state.lookupNonce += 1);
  let address;

  try {
    address = extractTokenAddress(rawInput);
  } catch (error) {
    setSearchHintMessage(error.i18nKey || "error.requestFailed", error.i18nParams || {}, "bad", getErrorMessage(error));
    return;
  }

  if (!forceRefresh && address === state.currentToken && state.chain) {
    rerenderCurrentResult();
    return;
  }

  if (address !== state.currentToken || forceRefresh) {
    state.advancedAddressTarget = "";
    state.advancedAddressSnapshot = null;
  }

  updateCurrentToken(address);
  showResults();
  resetDisplay();
  setText("summary-title", shortAddress(address));
  setText("summary-subtitle", t("status.loading", {}, "Reading on-chain and multi-source market data..."));
  setSearchHintMessage("hint.loading", {}, "neutral", "Loading on-chain and market data, please wait...");

  const [chainResult, marketResult] = await Promise.allSettled([readTokenProfile(address, { forceRefresh }), fetchMarketData(address, { forceRefresh })]);

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

  rerenderCurrentResult();

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

function rerenderCurrentResult() {
  if (!state.currentToken || !state.chain) {
    return false;
  }

  state.chain = relocalizeCachedProfile(state.chain);
  state.market = relocalizeCachedMarket(state.market);
  state.marketMeta = relocalizeCachedMarketMeta(state.marketMeta);

  updateCurrentToken(state.currentToken);
  showResults();
  renderSummary(state.chain, state.market, state.marketMeta);
  renderOverview(state.chain, state.market);
  renderMarket(state.market, state.chain, state.marketMeta);
  renderContract(state.chain);
  renderAdvanced(state.chain, state.market, state.advancedAddressSnapshot);
  renderRisk(state.chain, state.market);
  renderSources(true, state.market, state.marketMeta, state.chain);
  updateDocumentMetadata(state.chain);
  return true;
}

async function runAdvancedAddressLookup(options = {}) {
  if (!state.currentToken || !state.chain) {
    return;
  }

  const { forceRefresh = false } = options;
  const rawInput = $("advanced-address-input")?.value?.trim() || "";

  if (!rawInput) {
    state.advancedAddressTarget = "";
    state.advancedAddressSnapshot = null;
    setText("advanced-address-note", t("advanced.addressEmpty", {}, "Enter a wallet address to read protocol-side reward fields."));
    setVisible("advanced-address-grid", false);
    setHtml("advanced-address-grid", "");
    return;
  }

  let walletAddress;
  try {
    walletAddress = ethers.getAddress(rawInput);
  } catch (error) {
    setText("advanced-address-note", t("advanced.addressInvalid", {}, "The input is not a valid wallet address."));
    setVisible("advanced-address-grid", false);
    setHtml("advanced-address-grid", "");
    return;
  }

  state.advancedAddressTarget = walletAddress;
  state.advancedAddressSnapshot = null;
  setText("advanced-address-note", t("advanced.addressLoading", {}, "Reading public address-level reward fields..."));
  setVisible("advanced-address-grid", false);
  setHtml("advanced-address-grid", "");

  try {
    const snapshot = await readProtocolAddressSnapshot(state.currentToken, walletAddress, state.chain, { forceRefresh });
    if (walletAddress !== state.advancedAddressTarget || state.currentToken !== state.chain?.address) {
      return;
    }

    state.advancedAddressSnapshot = snapshot;
    rerenderCurrentResult();
  } catch (error) {
    setText(
      "advanced-address-note",
      t("advanced.addressFailed", { message: getErrorMessage(error) }, `Address analysis failed: ${getErrorMessage(error)}`),
    );
    setVisible("advanced-address-grid", false);
    setHtml("advanced-address-grid", "");
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
    rerenderCurrentResult();
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

  window.addEventListener("scroll", () => {
    setLanguageMenuOpen(false);
  }, { passive: true });

  window.addEventListener("resize", () => {
    setLanguageMenuOpen(false);
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
    await runLookup(state.currentToken, { forceRefresh: true });
  });

  $("summary-search-button").addEventListener("click", () => {
    hideResults();
    $("search-input").value = "";
    state.currentToken = "";
    state.chain = null;
    state.market = null;
    state.marketMeta = null;
    state.lastUpdated = null;
    state.advancedAddressTarget = "";
    state.advancedAddressSnapshot = null;
    clearSearchHint();
    resetDisplay();
    updateDocumentMetadata(null);
    focusSearch();
  });

  $("copy-address").addEventListener("click", copyAddress);
  $("advanced-address-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    await runAdvancedAddressLookup();
  });

  const tokenParam = new URLSearchParams(window.location.search).get("token");
  if (tokenParam) {
    $("search-input").value = tokenParam;
    runLookup(tokenParam);
  }
}

window.addEventListener("languagechange", () => {
  if (state.languagePreference !== DEFAULT_LANGUAGE_PREFERENCE) return;
  applyLanguagePreference(DEFAULT_LANGUAGE_PREFERENCE);
  rerenderCurrentResult();
});

window.addEventListener("DOMContentLoaded", init);







