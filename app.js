"use strict";

const I18N = {
  zh: {
    appTitle: "BSC 钱包连接",
    appSubtitle: "连接 EVM 钱包（MetaMask、Rabby、OKX、Bitget 等），当前仅开放 BSC 主网，其他公链已隐藏备用。",
    langSwitchAria: "语言切换",
    langSelectLabel: "语言",
    themeSwitchAria: "主题切换",
    themeSelectLabel: "主题",
    themeAuto: "跟随系统",
    themeNight: "夜间模式",
    themeLight: "日间模式",
    themeColor: "天空之蓝",
    langAuto: "跟随系统",
    langZh: "简体中文",
    langEn: "English",
    btnConnect: "连接钱包",
    btnReconnect: "重新连接",
    btnRefresh: "刷新",
    btnDiagnose: "诊断",
    btnCopyAddress: "复制地址",
    btnOpenExplorer: "打开浏览器",
    btnClearLog: "清空日志",
    btnSwitchBsc: "切换到 {network}",
    btnConnecting: "连接中...",
    btnRefreshing: "刷新中...",
    btnSwitching: "切换中...",
    statusNotConnected: "钱包未连接",
    statusNoWallet: "未检测到 EVM 钱包",
    statusConnected: "钱包已连接（{provider}）",
    statusWrongNetwork: "当前网络不受支持，请切换到 {network}",
    labelAddress: "地址",
    labelCurrentChain: "当前网络",
    labelNativeBalance: "原生代币余额",
    labelProviderDebug: "钱包调试",
    contributionTitle: "贡献值 TOKEN（BSC）",
    contributionDesc: "每个地址可领取 100；通过邀请链接成功邀请新地址领取后，邀请人获得 50。贡献值不可转账，仅用于平台贡献记录。",
    labelContractAddress: "合约地址",
    placeholderContractAddress: "输入 ContributionToken 合约地址（0x...）",
    btnSaveContract: "保存合约地址",
    btnClaim: "领取 100 贡献值",
    btnClaimed: "已领取",
    btnClaiming: "领取中...",
    btnCopyInviteLink: "复制邀请链接",
    labelContributionBalance: "贡献值余额",
    labelClaimState: "领取状态",
    labelInviteRef: "当前邀请人",
    labelInviteLink: "我的邀请链接",
    claimStateClaimed: "已领取",
    claimStateUnclaimed: "未领取",
    claimStateNeedContract: "未配置合约",
    inviteRefNone: "无邀请人",
    inviteLinkNotReady: "领取后自动生成",
    hintLocalhost: "提示：请勿通过 file:// 打开。请使用 localhost 或线上 HTTPS 域名。",
    ready: "准备就绪。",
    yes: "是",
    no: "否",
    none: "无",
    unknown: "未知",
    unknownError: "未知错误",
    providerInjected: "注入式 EVM 钱包",
    unknownChain: "未知 EVM 网络 ({chainId})",
    providerDebugTemplate: "window.ethereum={ethereum} | 注入={injected} | eip6963={eip6963}",
    optionNetwork: "{label} ({chainId})",
    logProviderSelected: "已选择钱包提供者：{provider}{extra}",
    logProviderSelectedSingle: "已选择钱包提供者：{provider}",
    logProviderSelectedMulti: "已选择钱包提供者：{provider}（检测到 {count} 个钱包）",
    logProviderCountSuffix: "（检测到 {count} 个钱包）",
    logNoProviderFound: "未通过 window.ethereum 或 EIP-6963 发现钱包。",
    logCandidates: "候选钱包：{candidates}",
    logFileProtocol: "你正在使用 file:// 打开页面，请改用 localhost 或线上 HTTPS 域名。",
    logCurrentOrigin: "当前来源：{origin}",
    logDiagnosticOrigin: "诊断来源：{origin}；安全上下文={secure}",
    logDiagnosticProviders: "诊断钱包候选：{providers}",
    logWalletConnectedSuccess: "钱包连接成功：{provider}",
    logConnectCanceled: "你在钱包弹窗中取消了连接（4001）。",
    logConnectPending: "钱包中已有待处理连接请求，请先处理后再试。",
    logConnectTimeout: "连接请求超时。请检查钱包弹窗并完成授权后重试。",
    logNoAccountAfterConnect: "已检测到钱包，但未返回账户。请在钱包中确认授权并允许当前站点访问。",
    logConnectFailed: "连接失败{codeSuffix}：{message}",
    logSwitchToRequiredFailed: "未能切换到必选网络 {network}，请手动切换后再操作。",
    logAlreadyOnNetwork: "{network} 已经是当前网络。",
    logSwitchedNetwork: "已切换到 {network}。",
    logAddedAndSwitched: "已添加并切换到 {network}。",
    logAddNetworkFailed: "添加网络失败：{message}",
    logSwitchFailed: "切换网络失败：{message}",
    logOpenedExplorer: "已打开区块浏览器：{url}",
    logAccountChanged: "账户已变更。",
    logChainChanged: "网络已变更。",
    logDetectedOnInit: "已检测到 EVM 钱包提供者。",
    logNoWalletOnInit: "初次加载未检测到钱包。请先解锁钱包后点击连接。",
    logRefreshed: "钱包状态已刷新。",
    logRefreshFailed: "刷新失败：{message}",
    logInitError: "初始化失败：{message}",
    logCannotSaveNetwork: "无法保存网络偏好：{message}",
    logCannotReadNetwork: "无法读取网络偏好：{message}",
    logAddressCopied: "地址已复制到剪贴板。",
    logAddressCopyFailed: "复制地址失败：{message}",
    logAddressCopyNotAvailable: "当前环境不支持复制地址。",
    logContractSaved: "贡献值合约地址已保存：{address}",
    logContractCleared: "已清空贡献值合约地址。",
    logContractInvalid: "合约地址无效，请输入正确的 0x 地址。",
    logContractFromUrlPending: "检测到链接中的合约地址（{address}），已预填但未启用。请点击“保存合约地址”确认后生效。",
    logContractFixed: "贡献值合约已固定：{address}",
    logContractMissing: "请先填写并保存贡献值合约地址。",
    logEthersMissing: "未加载 ethers.js，无法调用合约。",
    logNeedWalletBeforeClaim: "请先连接钱包后再领取贡献值。",
    logNeedBscBeforeClaim: "请先切换到 BSC 主网后再领取。",
    logContributionRefreshed: "贡献值状态已刷新。",
    logContributionRefreshFailed: "读取贡献值状态失败：{message}",
    logInviteRefDetected: "已检测到邀请人：{referrer}",
    logInviteRefIgnored: "邀请人地址无效或为当前地址，已忽略。",
    logClaimTxSubmitted: "领取交易已提交：{hash}",
    logClaimSuccess: "贡献值领取成功。",
    logClaimFailed: "领取失败：{message}",
    logAlreadyClaimedOnChain: "链上显示该地址已领取过。",
    logInviteCopied: "邀请链接已复制。",
    logInviteCopyNotReady: "当前还没有可复制的邀请链接。",
    logInviteManualCopy: "浏览器限制了自动复制，已弹出手动复制框。",
    promptCopyInvite: "请复制邀请链接（Ctrl+C）"
  },
  en: {
    appTitle: "BSC Wallet Connect",
    appSubtitle: "Connect EVM wallets (MetaMask, Rabby, OKX, Bitget, etc.). Only BSC mainnet is enabled now; other chains are hidden for future use.",
    langSwitchAria: "Language switch",
    langSelectLabel: "Language",
    themeSwitchAria: "Theme switch",
    themeSelectLabel: "Theme",
    themeAuto: "System",
    themeNight: "Night mode",
    themeLight: "Light mode",
    themeColor: "Sky Blue",
    langAuto: "System",
    langZh: "简体中文",
    langEn: "English",
    btnConnect: "Connect Wallet",
    btnReconnect: "Reconnect",
    btnRefresh: "Refresh",
    btnDiagnose: "Diagnose",
    btnCopyAddress: "Copy Address",
    btnOpenExplorer: "Open Explorer",
    btnClearLog: "Clear Log",
    btnSwitchBsc: "Switch to {network}",
    btnConnecting: "Connecting...",
    btnRefreshing: "Refreshing...",
    btnSwitching: "Switching...",
    statusNotConnected: "Wallet not connected",
    statusNoWallet: "No EVM wallet found",
    statusConnected: "Wallet connected ({provider})",
    statusWrongNetwork: "Unsupported network, switch to {network}",
    labelAddress: "Address",
    labelCurrentChain: "Current Chain",
    labelNativeBalance: "Native Balance",
    labelProviderDebug: "Provider Debug",
    contributionTitle: "Contribution Token (BSC)",
    contributionDesc: "Each address can claim 100. If an invited user claims successfully via your link, the inviter gets 50. This token is non-transferable and used only as platform contribution score.",
    labelContractAddress: "Contract Address",
    placeholderContractAddress: "Enter ContributionToken address (0x...)",
    btnSaveContract: "Save Contract",
    btnClaim: "Claim 100",
    btnClaimed: "Claimed",
    btnClaiming: "Claiming...",
    btnCopyInviteLink: "Copy Invite Link",
    labelContributionBalance: "Contribution Balance",
    labelClaimState: "Claim Status",
    labelInviteRef: "Current Referrer",
    labelInviteLink: "My Invite Link",
    claimStateClaimed: "Claimed",
    claimStateUnclaimed: "Unclaimed",
    claimStateNeedContract: "Contract not set",
    inviteRefNone: "No referrer",
    inviteLinkNotReady: "Will be generated after claim",
    hintLocalhost: "Tip: do not open from file:// . Use localhost or an HTTPS domain.",
    ready: "Ready.",
    yes: "yes",
    no: "no",
    none: "none",
    unknown: "unknown",
    unknownError: "Unknown error",
    providerInjected: "Injected EVM Wallet",
    unknownChain: "Unknown EVM chain ({chainId})",
    providerDebugTemplate: "window.ethereum={ethereum} | injected={injected} | eip6963={eip6963}",
    optionNetwork: "{label} ({chainId})",
    logProviderSelected: "Provider selected: {provider}{extra}",
    logProviderSelectedSingle: "Provider selected: {provider}",
    logProviderSelectedMulti: "Provider selected: {provider} ({count} wallets found)",
    logProviderCountSuffix: " ({count} wallets found)",
    logNoProviderFound: "No provider found from window.ethereum or EIP-6963.",
    logCandidates: "Candidates: {candidates}",
    logFileProtocol: "You are opening this page with file:// . Use localhost or an HTTPS domain.",
    logCurrentOrigin: "Current origin: {origin}",
    logDiagnosticOrigin: "Diagnostic origin: {origin}; secure={secure}",
    logDiagnosticProviders: "Diagnostic providers: {providers}",
    logWalletConnectedSuccess: "Wallet connected via {provider}.",
    logConnectCanceled: "Connect canceled in wallet popup (4001).",
    logConnectPending: "A connection request is already pending in your wallet.",
    logConnectTimeout: "Connection request timed out. Check wallet popup and approve, then try again.",
    logNoAccountAfterConnect: "Wallet was detected but no account was returned. Approve site access in wallet and retry.",
    logConnectFailed: "Connect failed{codeSuffix}: {message}",
    logSwitchToRequiredFailed: "Could not switch to required network {network}. Please switch manually.",
    logAlreadyOnNetwork: "{network} is already active.",
    logSwitchedNetwork: "Switched to {network}.",
    logAddedAndSwitched: "Network added and switched: {network}.",
    logAddNetworkFailed: "Add network failed: {message}",
    logSwitchFailed: "Switch network failed: {message}",
    logOpenedExplorer: "Opened explorer: {url}",
    logAccountChanged: "Account changed.",
    logChainChanged: "Chain changed.",
    logDetectedOnInit: "EVM wallet provider detected.",
    logNoWalletOnInit: "No wallet detected on initial load. Unlock wallet and click Connect.",
    logRefreshed: "Wallet state refreshed.",
    logRefreshFailed: "Refresh failed: {message}",
    logInitError: "Init error: {message}",
    logCannotSaveNetwork: "Cannot save selected network: {message}",
    logCannotReadNetwork: "Cannot read saved network: {message}",
    logAddressCopied: "Address copied to clipboard.",
    logAddressCopyFailed: "Copy failed: {message}",
    logAddressCopyNotAvailable: "Copy is not available in this environment.",
    logContractSaved: "Contribution contract saved: {address}",
    logContractCleared: "Contribution contract cleared.",
    logContractInvalid: "Invalid contract address. Please input a valid 0x address.",
    logContractFromUrlPending: "Contract address detected in URL ({address}). It is prefilled but not active until you click Save Contract.",
    logContractFixed: "Contribution contract is fixed: {address}",
    logContractMissing: "Please set and save the contribution contract address first.",
    logEthersMissing: "ethers.js is not loaded. Contract calls are unavailable.",
    logNeedWalletBeforeClaim: "Connect wallet before claiming.",
    logNeedBscBeforeClaim: "Please switch to BSC mainnet before claiming.",
    logContributionRefreshed: "Contribution state refreshed.",
    logContributionRefreshFailed: "Failed to load contribution state: {message}",
    logInviteRefDetected: "Referrer detected: {referrer}",
    logInviteRefIgnored: "Referrer is invalid or same as current account; ignored.",
    logClaimTxSubmitted: "Claim transaction submitted: {hash}",
    logClaimSuccess: "Claim completed successfully.",
    logClaimFailed: "Claim failed: {message}",
    logAlreadyClaimedOnChain: "This address has already claimed on-chain.",
    logInviteCopied: "Invite link copied.",
    logInviteCopyNotReady: "No invite link available to copy yet.",
    logInviteManualCopy: "Auto-copy is blocked by browser; opened manual copy dialog.",
    promptCopyInvite: "Copy invite link (Ctrl+C)"
  }
};

const EXTRA_LOCALES = {
  es: {
    appTitle: "Conexión de Billetera BSC",
    appSubtitle: "Conecta billeteras EVM (MetaMask, Rabby, OKX, Bitget, etc.). Solo BSC mainnet está habilitada por ahora; otras cadenas quedan ocultas para uso futuro.",
    langSwitchAria: "Selector de idioma",
    langSelectLabel: "Idioma",
    themeSwitchAria: "Selector de tema",
    themeSelectLabel: "Tema",
    themeAuto: "Sistema",
    themeNight: "Modo nocturno",
    themeLight: "Modo diurno",
    themeColor: "Azul cielo",
    langAuto: "Sistema",
    btnConnect: "Conectar billetera",
    btnReconnect: "Reconectar",
    btnRefresh: "Actualizar",
    btnDiagnose: "Diagnosticar",
    btnCopyAddress: "Copiar dirección",
    btnOpenExplorer: "Abrir explorador",
    btnClearLog: "Limpiar registro",
    btnSwitchBsc: "Cambiar a {network}",
    btnConnecting: "Conectando...",
    btnRefreshing: "Actualizando...",
    btnSwitching: "Cambiando...",
    statusNotConnected: "Billetera no conectada",
    statusNoWallet: "No se encontró billetera EVM",
    statusConnected: "Billetera conectada ({provider})",
    statusWrongNetwork: "Red no compatible, cambia a {network}",
    labelAddress: "Dirección",
    labelCurrentChain: "Red actual",
    labelNativeBalance: "Saldo nativo",
    labelProviderDebug: "Depuración del proveedor",
    hintLocalhost: "Consejo: no abras desde file:// . Usa localhost o un dominio HTTPS.",
    ready: "Listo."
  },
  fr: {
    appTitle: "Connexion Wallet BSC",
    appSubtitle: "Connectez des wallets EVM (MetaMask, Rabby, OKX, Bitget, etc.). Seul le mainnet BSC est activé pour le moment ; les autres réseaux sont masqués pour plus tard.",
    langSwitchAria: "Sélecteur de langue",
    langSelectLabel: "Langue",
    themeSwitchAria: "Sélecteur de thème",
    themeSelectLabel: "Thème",
    themeAuto: "Système",
    themeNight: "Mode nuit",
    themeLight: "Mode jour",
    themeColor: "Bleu ciel",
    langAuto: "Système",
    btnConnect: "Connecter le wallet",
    btnReconnect: "Reconnecter",
    btnRefresh: "Actualiser",
    btnDiagnose: "Diagnostiquer",
    btnCopyAddress: "Copier l'adresse",
    btnOpenExplorer: "Ouvrir l'explorateur",
    btnClearLog: "Effacer les logs",
    btnSwitchBsc: "Basculer vers {network}",
    btnConnecting: "Connexion...",
    btnRefreshing: "Actualisation...",
    btnSwitching: "Bascule...",
    statusNotConnected: "Wallet non connecté",
    statusNoWallet: "Aucun wallet EVM trouvé",
    statusConnected: "Wallet connecté ({provider})",
    statusWrongNetwork: "Réseau non pris en charge, basculez vers {network}",
    labelAddress: "Adresse",
    labelCurrentChain: "Réseau actuel",
    labelNativeBalance: "Solde natif",
    labelProviderDebug: "Debug fournisseur",
    hintLocalhost: "Astuce : n'ouvrez pas via file:// . Utilisez localhost ou un domaine HTTPS.",
    ready: "Prêt."
  },
  de: {
    appTitle: "BSC Wallet-Verbindung",
    appSubtitle: "Verbinde EVM-Wallets (MetaMask, Rabby, OKX, Bitget usw.). Aktuell ist nur das BSC-Mainnet aktiv; andere Chains sind für später ausgeblendet.",
    langSwitchAria: "Sprachauswahl",
    langSelectLabel: "Sprache",
    themeSwitchAria: "Themenauswahl",
    themeSelectLabel: "Thema",
    themeAuto: "System",
    themeNight: "Nachtmodus",
    themeLight: "Tagmodus",
    themeColor: "Himmelblau",
    langAuto: "System",
    btnConnect: "Wallet verbinden",
    btnReconnect: "Erneut verbinden",
    btnRefresh: "Aktualisieren",
    btnDiagnose: "Diagnose",
    btnCopyAddress: "Adresse kopieren",
    btnOpenExplorer: "Explorer öffnen",
    btnClearLog: "Log leeren",
    btnSwitchBsc: "Zu {network} wechseln",
    btnConnecting: "Verbinde...",
    btnRefreshing: "Aktualisiere...",
    btnSwitching: "Wechsle...",
    statusNotConnected: "Wallet nicht verbunden",
    statusNoWallet: "Kein EVM-Wallet gefunden",
    statusConnected: "Wallet verbunden ({provider})",
    statusWrongNetwork: "Nicht unterstütztes Netzwerk, bitte zu {network} wechseln",
    labelAddress: "Adresse",
    labelCurrentChain: "Aktuelle Chain",
    labelNativeBalance: "Nativer Kontostand",
    labelProviderDebug: "Provider-Debug",
    hintLocalhost: "Hinweis: Nicht über file:// öffnen. Nutze localhost oder eine HTTPS-Domain.",
    ready: "Bereit."
  },
  pt: {
    appTitle: "Conexão de Carteira BSC",
    appSubtitle: "Conecte carteiras EVM (MetaMask, Rabby, OKX, Bitget etc.). Apenas a BSC mainnet está habilitada agora; outras redes estão ocultas para uso futuro.",
    langSwitchAria: "Seletor de idioma",
    langSelectLabel: "Idioma",
    themeSwitchAria: "Seletor de tema",
    themeSelectLabel: "Tema",
    themeAuto: "Sistema",
    themeNight: "Modo noturno",
    themeLight: "Modo diurno",
    themeColor: "Azul celeste",
    langAuto: "Sistema",
    btnConnect: "Conectar carteira",
    btnReconnect: "Reconectar",
    btnRefresh: "Atualizar",
    btnDiagnose: "Diagnosticar",
    btnCopyAddress: "Copiar endereço",
    btnOpenExplorer: "Abrir explorador",
    btnClearLog: "Limpar log",
    btnSwitchBsc: "Trocar para {network}",
    btnConnecting: "Conectando...",
    btnRefreshing: "Atualizando...",
    btnSwitching: "Trocando...",
    statusNotConnected: "Carteira não conectada",
    statusNoWallet: "Nenhuma carteira EVM encontrada",
    statusConnected: "Carteira conectada ({provider})",
    statusWrongNetwork: "Rede não suportada, troque para {network}",
    labelAddress: "Endereço",
    labelCurrentChain: "Rede atual",
    labelNativeBalance: "Saldo nativo",
    labelProviderDebug: "Depuração do provedor",
    hintLocalhost: "Dica: não abra via file:// . Use localhost ou um domínio HTTPS.",
    ready: "Pronto."
  },
  ru: {
    appTitle: "Подключение кошелька BSC",
    appSubtitle: "Подключайте EVM-кошельки (MetaMask, Rabby, OKX, Bitget и др.). Сейчас включен только BSC mainnet; другие сети скрыты для будущего использования.",
    langSwitchAria: "Выбор языка",
    langSelectLabel: "Язык",
    themeSwitchAria: "Выбор темы",
    themeSelectLabel: "Тема",
    themeAuto: "Система",
    themeNight: "Ночной режим",
    themeLight: "Дневной режим",
    themeColor: "Небесно-голубой",
    langAuto: "Система",
    btnConnect: "Подключить кошелек",
    btnReconnect: "Подключить заново",
    btnRefresh: "Обновить",
    btnDiagnose: "Диагностика",
    btnCopyAddress: "Копировать адрес",
    btnOpenExplorer: "Открыть обозреватель",
    btnClearLog: "Очистить лог",
    btnSwitchBsc: "Переключить на {network}",
    btnConnecting: "Подключение...",
    btnRefreshing: "Обновление...",
    btnSwitching: "Переключение...",
    statusNotConnected: "Кошелек не подключен",
    statusNoWallet: "EVM-кошелек не найден",
    statusConnected: "Кошелек подключен ({provider})",
    statusWrongNetwork: "Неподдерживаемая сеть, переключитесь на {network}",
    labelAddress: "Адрес",
    labelCurrentChain: "Текущая сеть",
    labelNativeBalance: "Нативный баланс",
    labelProviderDebug: "Отладка провайдера",
    hintLocalhost: "Подсказка: не открывайте через file:// . Используйте localhost или HTTPS-домен.",
    ready: "Готово."
  },
  ja: {
    appTitle: "BSCウォレット接続",
    appSubtitle: "EVMウォレット（MetaMask、Rabby、OKX、Bitget など）を接続します。現在は BSC メインネットのみ有効で、他チェーンは将来用に非表示です。",
    langSwitchAria: "言語セレクター",
    langSelectLabel: "言語",
    themeSwitchAria: "テーマセレクター",
    themeSelectLabel: "テーマ",
    themeAuto: "システム",
    themeNight: "ナイトモード",
    themeLight: "ライトモード",
    themeColor: "スカイブルー",
    langAuto: "システム",
    btnConnect: "ウォレット接続",
    btnReconnect: "再接続",
    btnRefresh: "更新",
    btnDiagnose: "診断",
    btnCopyAddress: "アドレスをコピー",
    btnOpenExplorer: "エクスプローラーを開く",
    btnClearLog: "ログをクリア",
    btnSwitchBsc: "{network} に切替",
    btnConnecting: "接続中...",
    btnRefreshing: "更新中...",
    btnSwitching: "切替中...",
    statusNotConnected: "ウォレット未接続",
    statusNoWallet: "EVMウォレットが見つかりません",
    statusConnected: "ウォレット接続済み ({provider})",
    statusWrongNetwork: "未対応ネットワークです。{network} に切替えてください",
    labelAddress: "アドレス",
    labelCurrentChain: "現在のチェーン",
    labelNativeBalance: "ネイティブ残高",
    labelProviderDebug: "プロバイダーデバッグ",
    hintLocalhost: "ヒント: file:// では開かず、localhost または HTTPS ドメインを使用してください。",
    ready: "準備完了。"
  },
  ko: {
    appTitle: "BSC 지갑 연결",
    appSubtitle: "EVM 지갑(MetaMask, Rabby, OKX, Bitget 등)을 연결하세요. 현재는 BSC 메인넷만 활성화되어 있으며 다른 체인은 추후 사용을 위해 숨겨져 있습니다.",
    langSwitchAria: "언어 선택",
    langSelectLabel: "언어",
    themeSwitchAria: "테마 선택",
    themeSelectLabel: "테마",
    themeAuto: "시스템",
    themeNight: "야간 모드",
    themeLight: "주간 모드",
    themeColor: "하늘색",
    langAuto: "시스템",
    btnConnect: "지갑 연결",
    btnReconnect: "다시 연결",
    btnRefresh: "새로고침",
    btnDiagnose: "진단",
    btnCopyAddress: "주소 복사",
    btnOpenExplorer: "탐색기 열기",
    btnClearLog: "로그 지우기",
    btnSwitchBsc: "{network}(으)로 전환",
    btnConnecting: "연결 중...",
    btnRefreshing: "새로고침 중...",
    btnSwitching: "전환 중...",
    statusNotConnected: "지갑이 연결되지 않음",
    statusNoWallet: "EVM 지갑을 찾을 수 없음",
    statusConnected: "지갑 연결됨 ({provider})",
    statusWrongNetwork: "지원되지 않는 네트워크입니다. {network}(으)로 전환하세요",
    labelAddress: "주소",
    labelCurrentChain: "현재 체인",
    labelNativeBalance: "네이티브 잔액",
    labelProviderDebug: "프로바이더 디버그",
    hintLocalhost: "팁: file:// 로 열지 말고 localhost 또는 HTTPS 도메인을 사용하세요.",
    ready: "준비 완료."
  },
  ar: {
    appTitle: "اتصال محفظة BSC",
    appSubtitle: "قم بتوصيل محافظ EVM (MetaMask وRabby وOKX وBitget وغيرها). شبكة BSC الرئيسية فقط مفعلة الآن، وتم إخفاء الشبكات الأخرى للاستخدام لاحقًا.",
    langSwitchAria: "محدد اللغة",
    langSelectLabel: "اللغة",
    themeSwitchAria: "محدد السمة",
    themeSelectLabel: "السمة",
    themeAuto: "النظام",
    themeNight: "الوضع الليلي",
    themeLight: "الوضع النهاري",
    themeColor: "أزرق سماوي",
    langAuto: "النظام",
    btnConnect: "اتصال المحفظة",
    btnReconnect: "إعادة الاتصال",
    btnRefresh: "تحديث",
    btnDiagnose: "تشخيص",
    btnCopyAddress: "نسخ العنوان",
    btnOpenExplorer: "فتح المستكشف",
    btnClearLog: "مسح السجل",
    btnSwitchBsc: "التحويل إلى {network}",
    btnConnecting: "جارٍ الاتصال...",
    btnRefreshing: "جارٍ التحديث...",
    btnSwitching: "جارٍ التحويل...",
    statusNotConnected: "المحفظة غير متصلة",
    statusNoWallet: "لم يتم العثور على محفظة EVM",
    statusConnected: "تم اتصال المحفظة ({provider})",
    statusWrongNetwork: "شبكة غير مدعومة، يرجى التحويل إلى {network}",
    labelAddress: "العنوان",
    labelCurrentChain: "الشبكة الحالية",
    labelNativeBalance: "الرصيد الأصلي",
    labelProviderDebug: "تصحيح المزوّد",
    hintLocalhost: "ملاحظة: لا تفتح الصفحة عبر file:// . استخدم localhost أو نطاق HTTPS.",
    ready: "جاهز."
  },
  hi: {
    appTitle: "BSC वॉलेट कनेक्ट",
    appSubtitle: "EVM वॉलेट (MetaMask, Rabby, OKX, Bitget आदि) कनेक्ट करें। अभी केवल BSC मेननेट सक्रिय है; बाकी चेन भविष्य के लिए छिपी हैं।",
    langSwitchAria: "भाषा चयन",
    langSelectLabel: "भाषा",
    themeSwitchAria: "थीम चयन",
    themeSelectLabel: "थीम",
    themeAuto: "सिस्टम",
    themeNight: "नाइट मोड",
    themeLight: "डे मोड",
    themeColor: "आसमानी नीला",
    langAuto: "सिस्टम",
    btnConnect: "वॉलेट कनेक्ट करें",
    btnReconnect: "फिर से कनेक्ट करें",
    btnRefresh: "रीफ़्रेश",
    btnDiagnose: "जांच",
    btnCopyAddress: "पता कॉपी करें",
    btnOpenExplorer: "एक्सप्लोरर खोलें",
    btnClearLog: "लॉग साफ करें",
    btnSwitchBsc: "{network} पर स्विच करें",
    btnConnecting: "कनेक्ट हो रहा है...",
    btnRefreshing: "रीफ़्रेश हो रहा है...",
    btnSwitching: "स्विच हो रहा है...",
    statusNotConnected: "वॉलेट कनेक्ट नहीं है",
    statusNoWallet: "कोई EVM वॉलेट नहीं मिला",
    statusConnected: "वॉलेट कनेक्टेड ({provider})",
    statusWrongNetwork: "यह नेटवर्क समर्थित नहीं है, {network} पर स्विच करें",
    labelAddress: "पता",
    labelCurrentChain: "वर्तमान चेन",
    labelNativeBalance: "नेटिव बैलेंस",
    labelProviderDebug: "प्रोवाइडर डिबग",
    hintLocalhost: "टिप: file:// से न खोलें। localhost या HTTPS डोमेन का उपयोग करें।",
    ready: "तैयार।"
  },
  tr: {
    appTitle: "BSC Cüzdan Bağlantısı",
    appSubtitle: "EVM cüzdanlarını (MetaMask, Rabby, OKX, Bitget vb.) bağlayın. Şu an yalnızca BSC mainnet açık; diğer zincirler ileride kullanım için gizli.",
    langSwitchAria: "Dil seçici",
    langSelectLabel: "Dil",
    themeSwitchAria: "Tema seçici",
    themeSelectLabel: "Tema",
    themeAuto: "Sistem",
    themeNight: "Gece modu",
    themeLight: "Gündüz modu",
    themeColor: "Gökyüzü mavisi",
    langAuto: "Sistem",
    btnConnect: "Cüzdanı bağla",
    btnReconnect: "Yeniden bağlan",
    btnRefresh: "Yenile",
    btnDiagnose: "Tanıla",
    btnCopyAddress: "Adresi kopyala",
    btnOpenExplorer: "Gezgini aç",
    btnClearLog: "Kaydı temizle",
    btnSwitchBsc: "{network} ağına geç",
    btnConnecting: "Bağlanıyor...",
    btnRefreshing: "Yenileniyor...",
    btnSwitching: "Geçiliyor...",
    statusNotConnected: "Cüzdan bağlı değil",
    statusNoWallet: "EVM cüzdanı bulunamadı",
    statusConnected: "Cüzdan bağlı ({provider})",
    statusWrongNetwork: "Desteklenmeyen ağ, {network} ağına geçin",
    labelAddress: "Adres",
    labelCurrentChain: "Mevcut zincir",
    labelNativeBalance: "Yerel bakiye",
    labelProviderDebug: "Sağlayıcı hata ayıklama",
    hintLocalhost: "İpucu: file:// ile açmayın. localhost veya HTTPS alan adı kullanın.",
    ready: "Hazır."
  },
  id: {
    appTitle: "Koneksi Dompet BSC",
    appSubtitle: "Hubungkan dompet EVM (MetaMask, Rabby, OKX, Bitget, dll.). Saat ini hanya BSC mainnet yang aktif; chain lain disembunyikan untuk penggunaan nanti.",
    langSwitchAria: "Pemilih bahasa",
    langSelectLabel: "Bahasa",
    themeSwitchAria: "Pemilih tema",
    themeSelectLabel: "Tema",
    themeAuto: "Sistem",
    themeNight: "Mode malam",
    themeLight: "Mode siang",
    themeColor: "Biru langit",
    langAuto: "Sistem",
    btnConnect: "Hubungkan dompet",
    btnReconnect: "Hubungkan ulang",
    btnRefresh: "Muat ulang",
    btnDiagnose: "Diagnosa",
    btnCopyAddress: "Salin alamat",
    btnOpenExplorer: "Buka explorer",
    btnClearLog: "Bersihkan log",
    btnSwitchBsc: "Pindah ke {network}",
    btnConnecting: "Menghubungkan...",
    btnRefreshing: "Memuat ulang...",
    btnSwitching: "Berpindah...",
    statusNotConnected: "Dompet belum terhubung",
    statusNoWallet: "Dompet EVM tidak ditemukan",
    statusConnected: "Dompet terhubung ({provider})",
    statusWrongNetwork: "Jaringan tidak didukung, pindah ke {network}",
    labelAddress: "Alamat",
    labelCurrentChain: "Chain saat ini",
    labelNativeBalance: "Saldo native",
    labelProviderDebug: "Debug provider",
    hintLocalhost: "Tip: jangan buka dari file:// . Gunakan localhost atau domain HTTPS.",
    ready: "Siap."
  },
  vi: {
    appTitle: "Kết nối ví BSC",
    appSubtitle: "Kết nối ví EVM (MetaMask, Rabby, OKX, Bitget, v.v.). Hiện chỉ bật BSC mainnet; các chain khác được ẩn để dùng sau.",
    langSwitchAria: "Bộ chọn ngôn ngữ",
    langSelectLabel: "Ngôn ngữ",
    themeSwitchAria: "Bộ chọn giao diện",
    themeSelectLabel: "Giao diện",
    themeAuto: "Hệ thống",
    themeNight: "Chế độ đêm",
    themeLight: "Chế độ ngày",
    themeColor: "Xanh da trời",
    langAuto: "Hệ thống",
    btnConnect: "Kết nối ví",
    btnReconnect: "Kết nối lại",
    btnRefresh: "Làm mới",
    btnDiagnose: "Chẩn đoán",
    btnCopyAddress: "Sao chép địa chỉ",
    btnOpenExplorer: "Mở explorer",
    btnClearLog: "Xóa log",
    btnSwitchBsc: "Chuyển sang {network}",
    btnConnecting: "Đang kết nối...",
    btnRefreshing: "Đang làm mới...",
    btnSwitching: "Đang chuyển...",
    statusNotConnected: "Ví chưa kết nối",
    statusNoWallet: "Không tìm thấy ví EVM",
    statusConnected: "Ví đã kết nối ({provider})",
    statusWrongNetwork: "Mạng không hỗ trợ, hãy chuyển sang {network}",
    labelAddress: "Địa chỉ",
    labelCurrentChain: "Chain hiện tại",
    labelNativeBalance: "Số dư native",
    labelProviderDebug: "Gỡ lỗi provider",
    hintLocalhost: "Mẹo: không mở bằng file:// . Hãy dùng localhost hoặc miền HTTPS.",
    ready: "Sẵn sàng."
  },
  it: {
    appTitle: "Connessione Wallet BSC",
    appSubtitle: "Connetti wallet EVM (MetaMask, Rabby, OKX, Bitget, ecc.). Al momento è abilitata solo BSC mainnet; le altre chain sono nascoste per uso futuro.",
    langSwitchAria: "Selettore lingua",
    langSelectLabel: "Lingua",
    themeSwitchAria: "Selettore tema",
    themeSelectLabel: "Tema",
    themeAuto: "Sistema",
    themeNight: "Modalità notte",
    themeLight: "Modalità giorno",
    themeColor: "Azzurro cielo",
    langAuto: "Sistema",
    btnConnect: "Connetti wallet",
    btnReconnect: "Riconnetti",
    btnRefresh: "Aggiorna",
    btnDiagnose: "Diagnostica",
    btnCopyAddress: "Copia indirizzo",
    btnOpenExplorer: "Apri explorer",
    btnClearLog: "Pulisci log",
    btnSwitchBsc: "Passa a {network}",
    btnConnecting: "Connessione...",
    btnRefreshing: "Aggiornamento...",
    btnSwitching: "Cambio rete...",
    statusNotConnected: "Wallet non connesso",
    statusNoWallet: "Nessun wallet EVM trovato",
    statusConnected: "Wallet connesso ({provider})",
    statusWrongNetwork: "Rete non supportata, passa a {network}",
    labelAddress: "Indirizzo",
    labelCurrentChain: "Rete attuale",
    labelNativeBalance: "Saldo nativo",
    labelProviderDebug: "Debug provider",
    hintLocalhost: "Suggerimento: non aprire da file:// . Usa localhost o un dominio HTTPS.",
    ready: "Pronto."
  },
  th: {
    appTitle: "เชื่อมต่อกระเป๋า BSC",
    appSubtitle: "เชื่อมต่อกระเป๋า EVM (MetaMask, Rabby, OKX, Bitget ฯลฯ) ตอนนี้เปิดใช้งานเฉพาะ BSC mainnet เครือข่ายอื่นซ่อนไว้ใช้ในอนาคต",
    langSwitchAria: "ตัวเลือกภาษา",
    langSelectLabel: "ภาษา",
    themeSwitchAria: "ตัวเลือกธีม",
    themeSelectLabel: "ธีม",
    themeAuto: "ระบบ",
    themeNight: "โหมดกลางคืน",
    themeLight: "โหมดกลางวัน",
    themeColor: "สีฟ้าท้องฟ้า",
    langAuto: "ระบบ",
    btnConnect: "เชื่อมต่อกระเป๋า",
    btnReconnect: "เชื่อมต่อใหม่",
    btnRefresh: "รีเฟรช",
    btnDiagnose: "วินิจฉัย",
    btnCopyAddress: "คัดลอกที่อยู่",
    btnOpenExplorer: "เปิดตัวสำรวจ",
    btnClearLog: "ล้างบันทึก",
    btnSwitchBsc: "สลับไป {network}",
    btnConnecting: "กำลังเชื่อมต่อ...",
    btnRefreshing: "กำลังรีเฟรช...",
    btnSwitching: "กำลังสลับ...",
    statusNotConnected: "ยังไม่ได้เชื่อมต่อกระเป๋า",
    statusNoWallet: "ไม่พบกระเป๋า EVM",
    statusConnected: "เชื่อมต่อกระเป๋าแล้ว ({provider})",
    statusWrongNetwork: "เครือข่ายไม่รองรับ โปรดสลับเป็น {network}",
    labelAddress: "ที่อยู่",
    labelCurrentChain: "เครือข่ายปัจจุบัน",
    labelNativeBalance: "ยอดคงเหลือเนทีฟ",
    labelProviderDebug: "ดีบักผู้ให้บริการ",
    hintLocalhost: "คำแนะนำ: อย่าเปิดผ่าน file:// ให้ใช้ localhost หรือโดเมน HTTPS",
    ready: "พร้อมแล้ว"
  }
};

for (const [code, overrides] of Object.entries(EXTRA_LOCALES)) {
  I18N[code] = { ...I18N.en, ...overrides };
}

const LOCALE_UI_PATCH = {
  es: {
    contributionTitle: "Token de Contribución (BSC)",
    contributionDesc: "Cada dirección puede reclamar 100. Si un usuario invitado reclama con éxito mediante tu enlace, el invitador recibe 50. Este token no es transferible y solo se usa como puntuación de contribución en la plataforma.",
    labelContractAddress: "Dirección del contrato",
    placeholderContractAddress: "Introduce la dirección del contrato ContributionToken (0x...)",
    btnSaveContract: "Guardar contrato",
    btnClaim: "Reclamar 100",
    btnClaimed: "Reclamado",
    btnClaiming: "Reclamando...",
    btnCopyInviteLink: "Copiar enlace de invitación",
    labelContributionBalance: "Saldo de contribución",
    labelClaimState: "Estado de reclamo",
    labelInviteRef: "Invitador actual",
    labelInviteLink: "Mi enlace de invitación",
    claimStateClaimed: "Reclamado",
    claimStateUnclaimed: "Sin reclamar",
    claimStateNeedContract: "Contrato no configurado",
    inviteRefNone: "Sin invitador",
    inviteLinkNotReady: "Se generará tras reclamar",
    unknown: "desconocido",
    unknownError: "Error desconocido",
    providerInjected: "Cartera EVM inyectada"
  },
  fr: {
    contributionTitle: "Token de Contribution (BSC)",
    contributionDesc: "Chaque adresse peut réclamer 100. Si un utilisateur invité réclame avec succès via votre lien, l'invitant reçoit 50. Ce token est non transférable et sert uniquement de score de contribution sur la plateforme.",
    labelContractAddress: "Adresse du contrat",
    placeholderContractAddress: "Entrez l'adresse du contrat ContributionToken (0x...)",
    btnSaveContract: "Enregistrer le contrat",
    btnClaim: "Réclamer 100",
    btnClaimed: "Réclamé",
    btnClaiming: "Réclamation...",
    btnCopyInviteLink: "Copier le lien d'invitation",
    labelContributionBalance: "Solde de contribution",
    labelClaimState: "Statut de réclamation",
    labelInviteRef: "Parrain actuel",
    labelInviteLink: "Mon lien d'invitation",
    claimStateClaimed: "Réclamé",
    claimStateUnclaimed: "Non réclamé",
    claimStateNeedContract: "Contrat non défini",
    inviteRefNone: "Aucun parrain",
    inviteLinkNotReady: "Sera généré après la réclamation",
    unknown: "inconnu",
    unknownError: "Erreur inconnue",
    providerInjected: "Wallet EVM injecté"
  },
  de: {
    contributionTitle: "Beitrags-Token (BSC)",
    contributionDesc: "Jede Adresse kann 100 beanspruchen. Wenn ein eingeladener Nutzer über deinen Link erfolgreich beansprucht, erhält der Einladende 50. Dieser Token ist nicht übertragbar und dient nur als Beitragswert auf der Plattform.",
    labelContractAddress: "Vertragsadresse",
    placeholderContractAddress: "ContributionToken-Vertragsadresse eingeben (0x...)",
    btnSaveContract: "Vertrag speichern",
    btnClaim: "100 beanspruchen",
    btnClaimed: "Beansprucht",
    btnClaiming: "Wird beansprucht...",
    btnCopyInviteLink: "Einladungslink kopieren",
    labelContributionBalance: "Beitragsguthaben",
    labelClaimState: "Beanspruchungsstatus",
    labelInviteRef: "Aktueller Werber",
    labelInviteLink: "Mein Einladungslink",
    claimStateClaimed: "Beansprucht",
    claimStateUnclaimed: "Nicht beansprucht",
    claimStateNeedContract: "Vertrag nicht gesetzt",
    inviteRefNone: "Kein Werber",
    inviteLinkNotReady: "Wird nach dem Beanspruchen erzeugt",
    unknown: "unbekannt",
    unknownError: "Unbekannter Fehler",
    providerInjected: "Injiziertes EVM-Wallet"
  },
  pt: {
    contributionTitle: "Token de Contribuição (BSC)",
    contributionDesc: "Cada endereço pode reivindicar 100. Se um usuário convidado reivindicar com sucesso pelo seu link, o convidador recebe 50. Este token é intransferível e usado apenas como pontuação de contribuição na plataforma.",
    labelContractAddress: "Endereço do contrato",
    placeholderContractAddress: "Insira o endereço do contrato ContributionToken (0x...)",
    btnSaveContract: "Salvar contrato",
    btnClaim: "Reivindicar 100",
    btnClaimed: "Reivindicado",
    btnClaiming: "Reivindicando...",
    btnCopyInviteLink: "Copiar link de convite",
    labelContributionBalance: "Saldo de contribuição",
    labelClaimState: "Status da reivindicação",
    labelInviteRef: "Convidador atual",
    labelInviteLink: "Meu link de convite",
    claimStateClaimed: "Reivindicado",
    claimStateUnclaimed: "Não reivindicado",
    claimStateNeedContract: "Contrato não definido",
    inviteRefNone: "Sem convidador",
    inviteLinkNotReady: "Será gerado após reivindicar",
    unknown: "desconhecido",
    unknownError: "Erro desconhecido",
    providerInjected: "Carteira EVM injetada"
  },
  ru: {
    contributionTitle: "Токен вклада (BSC)",
    contributionDesc: "Каждый адрес может получить 100. Если приглашенный пользователь успешно получит токены по вашей ссылке, пригласивший получает 50. Этот токен нельзя передавать, он используется только как показатель вклада на платформе.",
    labelContractAddress: "Адрес контракта",
    placeholderContractAddress: "Введите адрес контракта ContributionToken (0x...)",
    btnSaveContract: "Сохранить контракт",
    btnClaim: "Получить 100",
    btnClaimed: "Получено",
    btnClaiming: "Выполняется...",
    btnCopyInviteLink: "Копировать ссылку приглашения",
    labelContributionBalance: "Баланс вклада",
    labelClaimState: "Статус получения",
    labelInviteRef: "Текущий пригласивший",
    labelInviteLink: "Моя ссылка приглашения",
    claimStateClaimed: "Получено",
    claimStateUnclaimed: "Не получено",
    claimStateNeedContract: "Контракт не настроен",
    inviteRefNone: "Без пригласившего",
    inviteLinkNotReady: "Будет создана после получения",
    unknown: "неизвестно",
    unknownError: "Неизвестная ошибка",
    providerInjected: "Инжектированный EVM-кошелек"
  },
  ja: {
    contributionTitle: "貢献トークン（BSC）",
    contributionDesc: "各アドレスは100を受け取れます。招待リンク経由で新規ユーザーが受け取りに成功すると、招待者は50を獲得します。このトークンは譲渡不可で、プラットフォーム内の貢献度記録のみに使用されます。",
    labelContractAddress: "コントラクトアドレス",
    placeholderContractAddress: "ContributionToken コントラクトアドレスを入力 (0x...)",
    btnSaveContract: "コントラクトを保存",
    btnClaim: "100を受け取る",
    btnClaimed: "受け取り済み",
    btnClaiming: "受け取り中...",
    btnCopyInviteLink: "招待リンクをコピー",
    labelContributionBalance: "貢献残高",
    labelClaimState: "受け取り状態",
    labelInviteRef: "現在の招待者",
    labelInviteLink: "私の招待リンク",
    claimStateClaimed: "受け取り済み",
    claimStateUnclaimed: "未受け取り",
    claimStateNeedContract: "コントラクト未設定",
    inviteRefNone: "招待者なし",
    inviteLinkNotReady: "受け取り後に自動生成",
    unknown: "不明",
    unknownError: "不明なエラー",
    providerInjected: "インジェクト型 EVM ウォレット"
  },
  ko: {
    contributionTitle: "기여 토큰 (BSC)",
    contributionDesc: "각 주소는 100을 받을 수 있습니다. 초대 링크로 신규 사용자가 성공적으로 수령하면 초대한 사람은 50을 받습니다. 이 토큰은 전송 불가이며 플랫폼 기여도 기록에만 사용됩니다.",
    labelContractAddress: "컨트랙트 주소",
    placeholderContractAddress: "ContributionToken 컨트랙트 주소 입력 (0x...)",
    btnSaveContract: "컨트랙트 저장",
    btnClaim: "100 받기",
    btnClaimed: "수령 완료",
    btnClaiming: "수령 중...",
    btnCopyInviteLink: "초대 링크 복사",
    labelContributionBalance: "기여 잔액",
    labelClaimState: "수령 상태",
    labelInviteRef: "현재 추천인",
    labelInviteLink: "내 초대 링크",
    claimStateClaimed: "수령 완료",
    claimStateUnclaimed: "미수령",
    claimStateNeedContract: "컨트랙트 미설정",
    inviteRefNone: "추천인 없음",
    inviteLinkNotReady: "수령 후 자동 생성",
    unknown: "알 수 없음",
    unknownError: "알 수 없는 오류",
    providerInjected: "주입형 EVM 지갑"
  },
  ar: {
    contributionTitle: "رمز المساهمة (BSC)",
    contributionDesc: "يمكن لكل عنوان المطالبة بـ 100. إذا قام مستخدم مدعو بالمطالبة بنجاح عبر رابطك، يحصل الداعي على 50. هذا الرمز غير قابل للتحويل ويستخدم فقط لتسجيل المساهمة على المنصة.",
    labelContractAddress: "عنوان العقد",
    placeholderContractAddress: "أدخل عنوان عقد ContributionToken (0x...)",
    btnSaveContract: "حفظ العقد",
    btnClaim: "مطالبة 100",
    btnClaimed: "تمت المطالبة",
    btnClaiming: "جارٍ المطالبة...",
    btnCopyInviteLink: "نسخ رابط الدعوة",
    labelContributionBalance: "رصيد المساهمة",
    labelClaimState: "حالة المطالبة",
    labelInviteRef: "الداعي الحالي",
    labelInviteLink: "رابط دعوتي",
    claimStateClaimed: "تمت المطالبة",
    claimStateUnclaimed: "لم تتم المطالبة",
    claimStateNeedContract: "العقد غير مضبوط",
    inviteRefNone: "لا يوجد داعٍ",
    inviteLinkNotReady: "سيتم إنشاؤه بعد المطالبة",
    unknown: "غير معروف",
    unknownError: "خطأ غير معروف",
    providerInjected: "محفظة EVM مدمجة"
  },
  hi: {
    contributionTitle: "योगदान टोकन (BSC)",
    contributionDesc: "हर पता 100 क्लेम कर सकता है। यदि आपके आमंत्रण लिंक से नया उपयोगकर्ता सफलतापूर्वक क्लेम करता है, तो आमंत्रक को 50 मिलते हैं। यह टोकन ट्रांसफर नहीं किया जा सकता और केवल प्लेटफ़ॉर्म योगदान रिकॉर्ड के लिए है।",
    labelContractAddress: "कॉन्ट्रैक्ट पता",
    placeholderContractAddress: "ContributionToken कॉन्ट्रैक्ट पता दर्ज करें (0x...)",
    btnSaveContract: "कॉन्ट्रैक्ट सहेजें",
    btnClaim: "100 क्लेम करें",
    btnClaimed: "क्लेम किया गया",
    btnClaiming: "क्लेम हो रहा है...",
    btnCopyInviteLink: "आमंत्रण लिंक कॉपी करें",
    labelContributionBalance: "योगदान बैलेंस",
    labelClaimState: "क्लेम स्थिति",
    labelInviteRef: "वर्तमान आमंत्रक",
    labelInviteLink: "मेरा आमंत्रण लिंक",
    claimStateClaimed: "क्लेम किया गया",
    claimStateUnclaimed: "अक्लेम्ड",
    claimStateNeedContract: "कॉन्ट्रैक्ट सेट नहीं है",
    inviteRefNone: "कोई आमंत्रक नहीं",
    inviteLinkNotReady: "क्लेम के बाद स्वतः बनेगा",
    unknown: "अज्ञात",
    unknownError: "अज्ञात त्रुटि",
    providerInjected: "इंजेक्टेड EVM वॉलेट"
  },
  tr: {
    contributionTitle: "Katkı Tokeni (BSC)",
    contributionDesc: "Her adres 100 talep edebilir. Davet bağlantınızla yeni kullanıcı başarılı şekilde talep ederse davet eden 50 alır. Bu token transfer edilemez ve yalnızca platform katkı puanı kaydı için kullanılır.",
    labelContractAddress: "Sözleşme adresi",
    placeholderContractAddress: "ContributionToken sözleşme adresini girin (0x...)",
    btnSaveContract: "Sözleşmeyi kaydet",
    btnClaim: "100 talep et",
    btnClaimed: "Talep edildi",
    btnClaiming: "Talep ediliyor...",
    btnCopyInviteLink: "Davet bağlantısını kopyala",
    labelContributionBalance: "Katkı bakiyesi",
    labelClaimState: "Talep durumu",
    labelInviteRef: "Mevcut davet eden",
    labelInviteLink: "Davet bağlantım",
    claimStateClaimed: "Talep edildi",
    claimStateUnclaimed: "Talep edilmedi",
    claimStateNeedContract: "Sözleşme ayarlanmadı",
    inviteRefNone: "Davet eden yok",
    inviteLinkNotReady: "Talep sonrası otomatik oluşturulur",
    unknown: "bilinmiyor",
    unknownError: "Bilinmeyen hata",
    providerInjected: "Enjekte EVM cüzdanı"
  },
  id: {
    contributionTitle: "Token Kontribusi (BSC)",
    contributionDesc: "Setiap alamat dapat klaim 100. Jika pengguna baru yang diundang berhasil klaim lewat tautan Anda, pengundang mendapat 50. Token ini tidak bisa ditransfer dan hanya digunakan untuk catatan skor kontribusi platform.",
    labelContractAddress: "Alamat kontrak",
    placeholderContractAddress: "Masukkan alamat kontrak ContributionToken (0x...)",
    btnSaveContract: "Simpan kontrak",
    btnClaim: "Klaim 100",
    btnClaimed: "Sudah klaim",
    btnClaiming: "Sedang klaim...",
    btnCopyInviteLink: "Salin tautan undangan",
    labelContributionBalance: "Saldo kontribusi",
    labelClaimState: "Status klaim",
    labelInviteRef: "Pengundang saat ini",
    labelInviteLink: "Tautan undangan saya",
    claimStateClaimed: "Sudah klaim",
    claimStateUnclaimed: "Belum klaim",
    claimStateNeedContract: "Kontrak belum diatur",
    inviteRefNone: "Tidak ada pengundang",
    inviteLinkNotReady: "Akan dibuat setelah klaim",
    unknown: "tidak diketahui",
    unknownError: "Kesalahan tidak diketahui",
    providerInjected: "Dompet EVM terinjeksi"
  },
  vi: {
    contributionTitle: "Token đóng góp (BSC)",
    contributionDesc: "Mỗi địa chỉ có thể nhận 100. Nếu người dùng mới được mời nhận thành công qua liên kết của bạn, người mời nhận 50. Token này không thể chuyển và chỉ dùng để ghi nhận điểm đóng góp trên nền tảng.",
    labelContractAddress: "Địa chỉ hợp đồng",
    placeholderContractAddress: "Nhập địa chỉ hợp đồng ContributionToken (0x...)",
    btnSaveContract: "Lưu hợp đồng",
    btnClaim: "Nhận 100",
    btnClaimed: "Đã nhận",
    btnClaiming: "Đang nhận...",
    btnCopyInviteLink: "Sao chép liên kết mời",
    labelContributionBalance: "Số dư đóng góp",
    labelClaimState: "Trạng thái nhận",
    labelInviteRef: "Người mời hiện tại",
    labelInviteLink: "Liên kết mời của tôi",
    claimStateClaimed: "Đã nhận",
    claimStateUnclaimed: "Chưa nhận",
    claimStateNeedContract: "Chưa cấu hình hợp đồng",
    inviteRefNone: "Không có người mời",
    inviteLinkNotReady: "Sẽ tự tạo sau khi nhận",
    unknown: "không xác định",
    unknownError: "Lỗi không xác định",
    providerInjected: "Ví EVM được nhúng"
  },
  it: {
    contributionTitle: "Token di Contributo (BSC)",
    contributionDesc: "Ogni indirizzo può riscattare 100. Se un utente invitato riscatta con successo tramite il tuo link, l'invitante riceve 50. Questo token non è trasferibile ed è usato solo come punteggio di contributo della piattaforma.",
    labelContractAddress: "Indirizzo del contratto",
    placeholderContractAddress: "Inserisci l'indirizzo del contratto ContributionToken (0x...)",
    btnSaveContract: "Salva contratto",
    btnClaim: "Riscatta 100",
    btnClaimed: "Riscattato",
    btnClaiming: "Riscatto in corso...",
    btnCopyInviteLink: "Copia link invito",
    labelContributionBalance: "Saldo contributo",
    labelClaimState: "Stato riscatto",
    labelInviteRef: "Invitante attuale",
    labelInviteLink: "Il mio link invito",
    claimStateClaimed: "Riscattato",
    claimStateUnclaimed: "Non riscattato",
    claimStateNeedContract: "Contratto non impostato",
    inviteRefNone: "Nessun invitante",
    inviteLinkNotReady: "Verrà generato dopo il riscatto",
    unknown: "sconosciuto",
    unknownError: "Errore sconosciuto",
    providerInjected: "Wallet EVM iniettato"
  },
  th: {
    contributionTitle: "โทเค็นการมีส่วนร่วม (BSC)",
    contributionDesc: "แต่ละที่อยู่สามารถรับได้ 100 หากผู้ใช้ใหม่ที่ถูกเชิญรับสำเร็จผ่านลิงก์ของคุณ ผู้เชิญจะได้ 50 โทเค็นนี้โอนไม่ได้ และใช้เพื่อบันทึกคะแนนการมีส่วนร่วมบนแพลตฟอร์มเท่านั้น",
    labelContractAddress: "ที่อยู่สัญญา",
    placeholderContractAddress: "กรอกที่อยู่สัญญา ContributionToken (0x...)",
    btnSaveContract: "บันทึกสัญญา",
    btnClaim: "รับ 100",
    btnClaimed: "รับแล้ว",
    btnClaiming: "กำลังรับ...",
    btnCopyInviteLink: "คัดลอกลิงก์เชิญ",
    labelContributionBalance: "ยอดคงเหลือการมีส่วนร่วม",
    labelClaimState: "สถานะการรับ",
    labelInviteRef: "ผู้เชิญปัจจุบัน",
    labelInviteLink: "ลิงก์เชิญของฉัน",
    claimStateClaimed: "รับแล้ว",
    claimStateUnclaimed: "ยังไม่รับ",
    claimStateNeedContract: "ยังไม่ได้ตั้งค่าสัญญา",
    inviteRefNone: "ไม่มีผู้เชิญ",
    inviteLinkNotReady: "จะสร้างอัตโนมัติหลังรับ",
    unknown: "ไม่ทราบ",
    unknownError: "ข้อผิดพลาดที่ไม่ทราบ",
    providerInjected: "กระเป๋า EVM แบบฝัง"
  }
};

for (const [code, overrides] of Object.entries(LOCALE_UI_PATCH)) {
  I18N[code] = { ...I18N[code], ...overrides };
}

const SUPPORTED_LANGS = Object.freeze([
  "zh",
  "en",
  "es",
  "fr",
  "de",
  "pt",
  "ru",
  "ja",
  "ko",
  "ar",
  "hi",
  "tr",
  "id",
  "vi",
  "it",
  "th"
]);

const LANGUAGE_OPTIONS = Object.freeze([
  { value: "auto", labelKey: "langAuto" },
  { value: "zh", label: "简体中文" },
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "pt", label: "Português" },
  { value: "ru", label: "Русский" },
  { value: "ja", label: "日本語" },
  { value: "ko", label: "한국어" },
  { value: "ar", label: "العربية" },
  { value: "hi", label: "हिन्दी" },
  { value: "tr", label: "Türkçe" },
  { value: "id", label: "Bahasa Indonesia" },
  { value: "vi", label: "Tiếng Việt" },
  { value: "it", label: "Italiano" },
  { value: "th", label: "ไทย" }
]);

const NETWORKS = [
  {
    key: "bsc",
    enabled: true,
    label: {
      zh: "BSC 主网",
      en: "BSC Mainnet",
      es: "BSC Red principal",
      fr: "BSC Réseau principal",
      de: "BSC Hauptnetz",
      pt: "BSC Rede principal",
      ru: "BSC основная сеть",
      ja: "BSC メインネット",
      ko: "BSC 메인넷",
      ar: "شبكة BSC الرئيسية",
      hi: "BSC मेननेट",
      tr: "BSC ana ağ",
      id: "BSC Mainnet",
      vi: "BSC mạng chính",
      it: "BSC rete principale",
      th: "BSC เมนเน็ต"
    },
    chainId: "0x38",
    params: {
      chainId: "0x38",
      chainName: "BNB Smart Chain Mainnet",
      nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
      rpcUrls: ["https://bsc-dataseed.binance.org"],
      blockExplorerUrls: ["https://bscscan.com"]
    }
  },
  {
    key: "eth",
    enabled: false,
    label: { zh: "以太坊主网", en: "Ethereum Mainnet" },
    chainId: "0x1",
    params: {
      chainId: "0x1",
      chainName: "Ethereum Mainnet",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: ["https://rpc.ankr.com/eth"],
      blockExplorerUrls: ["https://etherscan.io"]
    }
  },
  {
    key: "arbitrum",
    enabled: false,
    label: { zh: "Arbitrum One", en: "Arbitrum One" },
    chainId: "0xa4b1",
    params: {
      chainId: "0xa4b1",
      chainName: "Arbitrum One",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: ["https://arb1.arbitrum.io/rpc"],
      blockExplorerUrls: ["https://arbiscan.io"]
    }
  },
  {
    key: "optimism",
    enabled: false,
    label: { zh: "Optimism", en: "Optimism" },
    chainId: "0xa",
    params: {
      chainId: "0xa",
      chainName: "OP Mainnet",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: ["https://mainnet.optimism.io"],
      blockExplorerUrls: ["https://optimistic.etherscan.io"]
    }
  },
  {
    key: "base",
    enabled: false,
    label: { zh: "Base", en: "Base" },
    chainId: "0x2105",
    params: {
      chainId: "0x2105",
      chainName: "Base",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: ["https://mainnet.base.org"],
      blockExplorerUrls: ["https://basescan.org"]
    }
  },
  {
    key: "zksync",
    enabled: false,
    label: { zh: "zkSync Era", en: "zkSync Era" },
    chainId: "0x144",
    params: {
      chainId: "0x144",
      chainName: "zkSync Era Mainnet",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: ["https://mainnet.era.zksync.io"],
      blockExplorerUrls: ["https://explorer.zksync.io"]
    }
  },
  {
    key: "linea",
    enabled: false,
    label: { zh: "Linea", en: "Linea" },
    chainId: "0xe708",
    params: {
      chainId: "0xe708",
      chainName: "Linea",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: ["https://rpc.linea.build"],
      blockExplorerUrls: ["https://lineascan.build"]
    }
  }
];

const ACTIVE_NETWORKS = NETWORKS.filter((network) => network.enabled);
const REQUIRED_NETWORK = ACTIVE_NETWORKS[0] || null;

const LANG_PREF_KEY = "wallet-connect:lang-pref";
const THEME_PREF_KEY = "wallet-connect:theme-pref";
const LAST_NETWORK_KEY = "wallet-connect:last-network";
const CONTRIBUTION_CONTRACT_KEY = "wallet-connect:contribution-contract";
const MAX_LOG_LINES = 120;
const CONNECT_REQUEST_TIMEOUT_MS = 30000;
const FIXED_CONTRIBUTION_CONTRACT = "0x4b83289f5A4fCE92552Cd498847ea71Ed7e3359D";
const USE_FIXED_CONTRIBUTION_CONTRACT = true;
const DEFAULT_CONTRIBUTION_CONTRACT = FIXED_CONTRIBUTION_CONTRACT;
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const CONTRIBUTION_TOKEN_ABI = [
  "function hasClaimed(address user) view returns (bool)",
  "function inviterOf(address user) view returns (address)",
  "function balanceOf(address account) view returns (uint256)",
  "function claim(address referrer)",
  "function claimAmount() view returns (uint256)",
  "function inviteReward() view returns (uint256)"
];

const langSwitch = document.getElementById("langSwitch");
const langSelectLabel = document.getElementById("langSelectLabel");
const langSelect = document.getElementById("langSelect");
const themeSwitch = document.getElementById("themeSwitch");
const themeSelectLabel = document.getElementById("themeSelectLabel");
const themeSelect = document.getElementById("themeSelect");

const titleText = document.getElementById("titleText");
const subtitleText = document.getElementById("subtitleText");
const addressLabel = document.getElementById("addressLabel");
const chainLabel = document.getElementById("chainLabel");
const balanceLabel = document.getElementById("balanceLabel");
const providerDebugLabel = document.getElementById("providerDebugLabel");
const hintText = document.getElementById("hintText");
const contributionTitle = document.getElementById("contributionTitle");
const contributionDesc = document.getElementById("contributionDesc");
const contractAddressInput = document.getElementById("contractAddressInput");
const saveContractBtn = document.getElementById("saveContractBtn");
const claimBtn = document.getElementById("claimBtn");
const copyInviteBtn = document.getElementById("copyInviteBtn");
const contributionBalanceLabel = document.getElementById("contributionBalanceLabel");
const claimStateLabel = document.getElementById("claimStateLabel");
const inviteRefLabel = document.getElementById("inviteRefLabel");
const inviteLinkLabel = document.getElementById("inviteLinkLabel");
const contributionBalanceValue = document.getElementById("contributionBalanceValue");
const claimStateValue = document.getElementById("claimStateValue");
const inviteRefValue = document.getElementById("inviteRefValue");
const inviteLinkValue = document.getElementById("inviteLinkValue");
const contractMobileValue = document.getElementById("contractMobileValue");

const connectBtn = document.getElementById("connectBtn");
const refreshBtn = document.getElementById("refreshBtn");
const diagnoseBtn = document.getElementById("diagnoseBtn");
const copyBtn = document.getElementById("copyBtn");
const explorerBtn = document.getElementById("explorerBtn");
const clearLogBtn = document.getElementById("clearLogBtn");
const switchBtn = document.getElementById("switchBtn");
const networkSelect = document.getElementById("networkSelect");
const walletStatus = document.getElementById("walletStatus");
const addressValue = document.getElementById("addressValue");
const chainValue = document.getElementById("chainValue");
const balanceValue = document.getElementById("balanceValue");
const providerDebugValue = document.getElementById("providerDebugValue");
const logBox = document.getElementById("logBox");
const toastBox = document.getElementById("toast");

const logEntries = [];
let toastTimer = null;

let currentLangPref = "auto";
let currentLang = "zh";
let currentThemePref = "auto";
let currentTheme = "night";

const THEME_OPTIONS = Object.freeze([
  { value: "auto", labelKey: "themeAuto" },
  { value: "night", labelKey: "themeNight" },
  { value: "light", labelKey: "themeLight" },
  { value: "color", labelKey: "themeColor" }
]);

let provider = null;
let providerName = t("unknown");
let boundProvider = null;
let eipDiscoveryReady = false;
const eip6963Providers = new Map();
let currentAccount = "";
let currentChainId = "";
let lastStatus = { key: "statusNotConnected", connected: false, vars: {} };
let contributionContractAddress = DEFAULT_CONTRIBUTION_CONTRACT;
let contributionHasClaimed = false;
let inviteLinkCache = "";
let pendingReferrer = "";

function t(key, vars = {}) {
  const table = I18N[currentLang] || I18N.zh;
  const fallback = I18N.en[key] || key;
  const template = table[key] || fallback;
  return template.replace(/\{(\w+)\}/g, (_, token) => {
    if (Object.prototype.hasOwnProperty.call(vars, token)) {
      return String(vars[token]);
    }
    return `{${token}}`;
  });
}

function detectSystemLang() {
  const list = Array.isArray(navigator.languages) && navigator.languages.length
    ? navigator.languages
    : [navigator.language || "en"];
  const normalized = list
    .map((item) => String(item || "").toLowerCase())
    .filter(Boolean);

  const prefixMap = [
    ["zh", "zh"],
    ["en", "en"],
    ["es", "es"],
    ["fr", "fr"],
    ["de", "de"],
    ["pt", "pt"],
    ["ru", "ru"],
    ["ja", "ja"],
    ["ko", "ko"],
    ["ar", "ar"],
    ["hi", "hi"],
    ["tr", "tr"],
    ["id", "id"],
    ["in", "id"],
    ["vi", "vi"],
    ["it", "it"],
    ["th", "th"]
  ];

  for (const tag of normalized) {
    for (const [prefix, code] of prefixMap) {
      if (tag.startsWith(prefix) && SUPPORTED_LANGS.includes(code)) {
        return code;
      }
    }
  }
  return "en";
}

function loadLanguagePreference() {
  try {
    const saved = localStorage.getItem(LANG_PREF_KEY);
    if (saved === "auto" || SUPPORTED_LANGS.includes(saved)) {
      return saved;
    }
  } catch (error) {
    // ignore storage read failure
  }
  return "auto";
}

function loadThemePreference() {
  try {
    const saved = localStorage.getItem(THEME_PREF_KEY);
    if (saved === "auto" || saved === "night" || saved === "light" || saved === "color") {
      return saved;
    }
  } catch (error) {
    // ignore storage read failure
  }
  return "auto";
}

function detectSystemTheme() {
  try {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "night";
    }
  } catch (error) {
    // ignore detection failure
  }
  return "light";
}

function resolveTheme(pref = currentThemePref) {
  if (pref === "auto") {
    return detectSystemTheme();
  }
  if (pref === "color" || pref === "light" || pref === "night") {
    return pref;
  }
  return "night";
}

function getNetworkLabel(network) {
  if (!network) return "";
  if (typeof network.label === "string") return network.label;
  return network.label[currentLang] || network.label.en || network.label.zh || "";
}

function renderLanguageSelector() {
  if (langSwitch) {
    langSwitch.setAttribute("aria-label", t("langSwitchAria"));
  }
  if (langSelectLabel) {
    langSelectLabel.textContent = t("langSelectLabel");
  }
  if (!langSelect) return;

  const mustRebuild = langSelect.options.length !== LANGUAGE_OPTIONS.length;
  if (mustRebuild) {
    langSelect.innerHTML = "";
  }

  LANGUAGE_OPTIONS.forEach((item, index) => {
    const option = mustRebuild ? document.createElement("option") : langSelect.options[index];
    option.value = item.value;
    option.textContent = item.labelKey ? t(item.labelKey) : item.label;
    if (mustRebuild) {
      langSelect.appendChild(option);
    }
  });
  langSelect.value = currentLangPref;
}

function applyTheme() {
  currentTheme = resolveTheme(currentThemePref);
  document.documentElement.dataset.theme = currentTheme;
  if (document.body) {
    document.body.dataset.theme = currentTheme;
  }
}

function renderThemeSelector() {
  if (themeSwitch) {
    themeSwitch.setAttribute("aria-label", t("themeSwitchAria"));
  }
  if (themeSelectLabel) {
    themeSelectLabel.textContent = t("themeSelectLabel");
  }
  if (!themeSelect) return;

  const mustRebuild = themeSelect.options.length !== THEME_OPTIONS.length;
  if (mustRebuild) {
    themeSelect.innerHTML = "";
  }

  THEME_OPTIONS.forEach((item, index) => {
    const option = mustRebuild ? document.createElement("option") : themeSelect.options[index];
    option.value = item.value;
    option.textContent = t(item.labelKey);
    if (mustRebuild) {
      themeSelect.appendChild(option);
    }
  });
  themeSelect.value = currentThemePref;
}

function setButtonLabel(button, text) {
  if (!button) return;
  button.dataset.normalText = text;
  if (button.dataset.busy !== "1") {
    button.textContent = text;
  }
}

function renderNetworkSelect() {
  const previous = networkSelect.value;
  networkSelect.innerHTML = "";
  ACTIVE_NETWORKS.forEach((network, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = t("optionNetwork", {
      label: getNetworkLabel(network),
      chainId: network.chainId
    });
    networkSelect.appendChild(option);
  });
  networkSelect.disabled = ACTIVE_NETWORKS.length <= 1;
  if (previous && Number(previous) < ACTIVE_NETWORKS.length) {
    networkSelect.value = previous;
  }
}

function refreshStatusText() {
  const vars = resolveI18nVars(lastStatus.vars);
  const text = t(lastStatus.key, vars);
  walletStatus.innerHTML = `<span class="dot ${lastStatus.connected ? "ok" : "warn"}"></span>${text}`;
}

function setStatusByKey(key, connected, vars = {}) {
  lastStatus = { key, connected, vars };
  refreshStatusText();
}

function applyLanguage() {
  const htmlLangMap = {
    zh: "zh-CN",
    en: "en",
    es: "es",
    fr: "fr",
    de: "de",
    pt: "pt",
    ru: "ru",
    ja: "ja",
    ko: "ko",
    ar: "ar",
    hi: "hi",
    tr: "tr",
    id: "id",
    vi: "vi",
    it: "it",
    th: "th"
  };
  document.documentElement.lang = htmlLangMap[currentLang] || "en";
  document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  document.title = t("appTitle");
  titleText.textContent = t("appTitle");
  subtitleText.textContent = t("appSubtitle");
  addressLabel.textContent = t("labelAddress");
  chainLabel.textContent = t("labelCurrentChain");
  balanceLabel.textContent = t("labelNativeBalance");
  providerDebugLabel.textContent = t("labelProviderDebug");
  hintText.textContent = t("hintLocalhost");
  updateContributionStaticText();
  if (contributionContractAddress) {
    contractAddressInput.value = contributionContractAddress;
  }

  setButtonLabel(refreshBtn, t("btnRefresh"));
  setButtonLabel(diagnoseBtn, t("btnDiagnose"));
  setButtonLabel(copyBtn, t("btnCopyAddress"));
  setButtonLabel(explorerBtn, t("btnOpenExplorer"));
  setButtonLabel(clearLogBtn, t("btnClearLog"));
  setButtonLabel(switchBtn, t("btnSwitchBsc", { network: getNetworkLabel(REQUIRED_NETWORK) || "BSC" }));

  renderLanguageSelector();
  renderThemeSelector();
  renderNetworkSelect();
  if (!currentChainId) {
    restoreSelectedNetwork();
  } else {
    selectNetworkByChainId(currentChainId);
  }
  updateContributionDisplayFallback();
  refreshStatusText();
  updateActionState();
  updateProviderDebug();
  chainValue.textContent = getChainDisplayText(currentChainId);
  renderLogBox();
}

function setLanguagePreference(pref, persist = true) {
  const normalized = pref === "auto" || SUPPORTED_LANGS.includes(pref) ? pref : "auto";
  currentLangPref = normalized;
  currentLang = normalized === "auto" ? detectSystemLang() : normalized;
  if (persist) {
    try {
      localStorage.setItem(LANG_PREF_KEY, normalized);
    } catch (error) {
      // ignore storage write failure
    }
  }
  applyLanguage();
}

function setThemePreference(pref, persist = true) {
  const normalized = pref === "auto" || pref === "color" || pref === "light" || pref === "night"
    ? pref
    : "auto";
  currentThemePref = normalized;
  applyTheme();
  renderThemeSelector();
  if (persist) {
    try {
      localStorage.setItem(THEME_PREF_KEY, normalized);
    } catch (error) {
      // ignore storage write failure
    }
  }
}

function renderLogBox() {
  if (!logEntries.length) {
    logBox.textContent = t("ready");
    return;
  }
  logBox.textContent = logEntries
    .map((entry) => {
      const vars = resolveI18nVars(entry.vars || {});
      const message = entry.kind === "i18n"
        ? t(entry.key, vars)
        : String(entry.message || "");
      return `[${entry.stamp}] ${message}`;
    })
    .join("\n");
}

function appendLogEntry(entry) {
  logEntries.unshift(entry);
  if (logEntries.length > MAX_LOG_LINES) {
    logEntries.length = MAX_LOG_LINES;
  }
  renderLogBox();
}

function log(message) {
  appendLogEntry({
    stamp: new Date().toLocaleTimeString(),
    kind: "text",
    message
  });
}

function logT(key, vars = {}) {
  appendLogEntry({
    stamp: new Date().toLocaleTimeString(),
    kind: "i18n",
    key,
    vars
  });
}

function clearLog() {
  logEntries.length = 0;
  renderLogBox();
}

function showToast(message) {
  if (!toastBox || !message) return;
  toastBox.textContent = String(message);
  toastBox.classList.add("show");
  if (toastTimer) {
    clearTimeout(toastTimer);
  }
  toastTimer = setTimeout(() => {
    toastBox.classList.remove("show");
    toastTimer = null;
  }, 1800);
}

function shortenAddress(address) {
  if (!address) return "-";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatNative(weiHex, symbol = "BNB") {
  if (!weiHex) return "-";
  const wei = BigInt(weiHex);
  const base = 10n ** 18n;
  const whole = wei / base;
  const fraction = wei % base;
  const fractionStr = fraction.toString().padStart(18, "0").slice(0, 5).replace(/0+$/, "");
  return fractionStr ? `${whole.toString()}.${fractionStr} ${symbol}` : `${whole.toString()} ${symbol}`;
}

function getChainDisplayText(chainId) {
  if (!chainId) return "-";
  const network = findNetwork(chainId);
  return network
    ? `${getNetworkLabel(network)} (${chainId})`
    : t("unknownChain", { chainId });
}

function findNetworkByKey(networkKey) {
  if (!networkKey) return null;
  return NETWORKS.find((item) => item.key === networkKey) || null;
}

function resolveI18nVars(vars = {}) {
  if (!vars || typeof vars !== "object") return {};
  const out = { ...vars };
  if (!out.network && out.networkKey) {
    const network = findNetworkByKey(out.networkKey);
    out.network = network ? getNetworkLabel(network) : String(out.networkKey);
  }
  return out;
}

function findNetwork(chainId) {
  if (!chainId) return null;
  return NETWORKS.find((network) => network.chainId.toLowerCase() === chainId.toLowerCase()) || null;
}

function getExplorerBase(chainId) {
  const network = chainId ? findNetwork(chainId) : REQUIRED_NETWORK;
  if (network && network.params && Array.isArray(network.params.blockExplorerUrls) && network.params.blockExplorerUrls[0]) {
    return network.params.blockExplorerUrls[0];
  }
  return "https://bscscan.com";
}

function updateActionState() {
  const hasAccount = Boolean(currentAccount);
  const onRequiredNetwork = !REQUIRED_NETWORK
    || (currentChainId && currentChainId.toLowerCase() === REQUIRED_NETWORK.chainId.toLowerCase());
  const canClaim = hasAccount
    && onRequiredNetwork
    && Boolean(contributionContractAddress)
    && !contributionHasClaimed;

  copyBtn.disabled = !hasAccount;
  explorerBtn.disabled = !hasAccount;
  setButtonLabel(claimBtn, contributionHasClaimed ? t("btnClaimed") : t("btnClaim"));
  if (claimBtn.dataset.busy !== "1") {
    claimBtn.disabled = !canClaim;
  }
  copyInviteBtn.disabled = !hasAccount || !contributionContractAddress;
  setButtonLabel(connectBtn, hasAccount ? t("btnReconnect") : t("btnConnect"));
}

function setButtonBusy(button, busy, busyText) {
  if (!button) return;
  if (busy) {
    if (!button.dataset.normalText) {
      button.dataset.normalText = button.textContent;
    }
    button.dataset.busy = "1";
    if (busyText) {
      button.textContent = busyText;
    }
    button.disabled = true;
  } else {
    button.dataset.busy = "0";
    if (button.dataset.normalText) {
      button.textContent = button.dataset.normalText;
    }
    button.disabled = false;
  }
}

function selectNetworkByChainId(chainId) {
  if (!chainId) return;
  const index = ACTIVE_NETWORKS.findIndex((network) => network.chainId.toLowerCase() === chainId.toLowerCase());
  if (index >= 0) {
    networkSelect.value = String(index);
  }
}

function rememberSelectedNetwork() {
  const index = Number(networkSelect.value);
  const selected = ACTIVE_NETWORKS[index];
  if (!selected) return;
  try {
    localStorage.setItem(LAST_NETWORK_KEY, selected.chainId);
  } catch (error) {
    logT("logCannotSaveNetwork", { message: getErrorMessage(error) });
  }
}

function restoreSelectedNetwork() {
  let saved = "";
  try {
    saved = localStorage.getItem(LAST_NETWORK_KEY) || "";
  } catch (error) {
    logT("logCannotReadNetwork", { message: getErrorMessage(error) });
  }
  if (saved) {
    selectNetworkByChainId(saved);
  } else if (REQUIRED_NETWORK) {
    selectNetworkByChainId(REQUIRED_NETWORK.chainId);
  }
}

function getErrorMessage(error) {
  if (!error) return t("unknownError");
  if (typeof error === "string") return error;
  const msg = error.shortMessage || error.reason || error.message;
  return msg || JSON.stringify(error) || t("unknownError");
}

function createRequestTimeoutError(method, timeoutMs) {
  const error = new Error(`${method} timeout (${timeoutMs}ms)`);
  error.code = "REQUEST_TIMEOUT";
  error.method = method;
  return error;
}

async function requestAccountsWithTimeout(timeoutMs = CONNECT_REQUEST_TIMEOUT_MS) {
  if (!provider || typeof provider.request !== "function") {
    throw new Error("Wallet provider is not available.");
  }
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    return provider.request({ method: "eth_requestAccounts" });
  }

  let timeoutId = null;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(createRequestTimeoutError("eth_requestAccounts", timeoutMs));
    }, timeoutMs);
  });

  try {
    return await Promise.race([
      provider.request({ method: "eth_requestAccounts" }),
      timeoutPromise
    ]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

function hasEthersSdk() {
  return Boolean(
    window.ethers
    && window.ethers.BrowserProvider
    && window.ethers.Contract
    && window.ethers.getAddress
  );
}

function normalizeAddress(raw) {
  const input = String(raw || "").trim();
  if (!input) return "";
  if (hasEthersSdk()) {
    try {
      return window.ethers.getAddress(input);
    } catch (error) {
      return "";
    }
  }
  return /^0x[a-fA-F0-9]{40}$/.test(input) ? input : "";
}

function loadContributionContractAddress() {
  if (USE_FIXED_CONTRIBUTION_CONTRACT) {
    return DEFAULT_CONTRIBUTION_CONTRACT;
  }
  try {
    const saved = localStorage.getItem(CONTRIBUTION_CONTRACT_KEY) || "";
    return normalizeAddress(saved) || DEFAULT_CONTRIBUTION_CONTRACT;
  } catch (error) {
    return DEFAULT_CONTRIBUTION_CONTRACT;
  }
}

function persistContributionContractAddress(address) {
  if (USE_FIXED_CONTRIBUTION_CONTRACT) return;
  try {
    if (!address) {
      localStorage.removeItem(CONTRIBUTION_CONTRACT_KEY);
    } else {
      localStorage.setItem(CONTRIBUTION_CONTRACT_KEY, address);
    }
  } catch (error) {
    // ignore storage failures
  }
}

function parseReferrerFromUrl() {
  if (!window.location || !window.location.search) return "";
  const params = new URLSearchParams(window.location.search);
  const ref = normalizeAddress(params.get("ref") || "");
  return ref || "";
}

function parseContractFromUrl() {
  if (USE_FIXED_CONTRIBUTION_CONTRACT) return "";
  if (!window.location || !window.location.search) return "";
  const params = new URLSearchParams(window.location.search);
  const fromUrl = normalizeAddress(params.get("contract") || "");
  return fromUrl || "";
}

function setupSystemThemeWatcher() {
  if (!window.matchMedia) return;
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onChange = () => {
    if (currentThemePref !== "auto") return;
    applyTheme();
    renderThemeSelector();
  };
  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", onChange);
  } else if (typeof media.addListener === "function") {
    media.addListener(onChange);
  }
}

function refreshContractDisplay() {
  const shown = contributionContractAddress || DEFAULT_CONTRIBUTION_CONTRACT || "-";
  if (contractAddressInput) {
    contractAddressInput.value = shown;
  }
  if (contractMobileValue) {
    contractMobileValue.textContent = shown;
  }
}

function buildInviteLink(address) {
  const normalized = normalizeAddress(address);
  if (!normalized || !window.location) return "";
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set("ref", normalized);
  return url.toString();
}

function updateContributionStaticText() {
  contributionTitle.textContent = t("contributionTitle");
  contributionDesc.textContent = t("contributionDesc");
  contributionBalanceLabel.textContent = t("labelContributionBalance");
  claimStateLabel.textContent = t("labelClaimState");
  inviteRefLabel.textContent = t("labelInviteRef");
  inviteLinkLabel.textContent = t("labelInviteLink");
  contractAddressInput.placeholder = t("placeholderContractAddress");
  contractAddressInput.setAttribute("aria-label", t("labelContractAddress"));
  setButtonLabel(saveContractBtn, t("btnSaveContract"));
  setButtonLabel(claimBtn, t("btnClaim"));
  setButtonLabel(copyInviteBtn, t("btnCopyInviteLink"));
  refreshContractDisplay();
}

function updateContributionDisplayFallback() {
  inviteRefValue.textContent = pendingReferrer || t("inviteRefNone");
  if (!contributionContractAddress) {
    claimStateValue.textContent = t("claimStateNeedContract");
    contributionBalanceValue.textContent = "-";
    inviteLinkCache = "";
    inviteLinkValue.textContent = t("inviteLinkNotReady");
    contributionHasClaimed = false;
    return;
  }

  if (!currentAccount) {
    claimStateValue.textContent = "-";
    contributionBalanceValue.textContent = "-";
    inviteLinkCache = "";
    inviteLinkValue.textContent = t("inviteLinkNotReady");
    contributionHasClaimed = false;
    return;
  }

  claimStateValue.textContent = contributionHasClaimed ? t("claimStateClaimed") : t("claimStateUnclaimed");
  if (inviteLinkCache) {
    inviteLinkValue.textContent = inviteLinkCache;
  } else {
    inviteLinkValue.textContent = t("inviteLinkNotReady");
  }
}

function createReadContract() {
  if (!provider || !contributionContractAddress || !hasEthersSdk()) return null;
  const browserProvider = new window.ethers.BrowserProvider(provider);
  return new window.ethers.Contract(contributionContractAddress, CONTRIBUTION_TOKEN_ABI, browserProvider);
}

async function createWriteContract() {
  if (!provider || !contributionContractAddress || !hasEthersSdk()) return null;
  const browserProvider = new window.ethers.BrowserProvider(provider);
  const signer = await browserProvider.getSigner();
  return new window.ethers.Contract(contributionContractAddress, CONTRIBUTION_TOKEN_ABI, signer);
}

async function refreshContributionState({ silent = true } = {}) {
  try {
    updateContributionDisplayFallback();
    if (!provider || !contributionContractAddress || !currentAccount) {
      return;
    }
    if (!hasEthersSdk()) {
      if (!silent) logT("logEthersMissing");
      return;
    }

    const contract = createReadContract();
    if (!contract) return;

    const [balanceRaw, claimedRaw, inviterRaw] = await Promise.all([
      contract.balanceOf(currentAccount),
      contract.hasClaimed(currentAccount),
      contract.inviterOf(currentAccount)
    ]);
    contributionHasClaimed = Boolean(claimedRaw);
    contributionBalanceValue.textContent = balanceRaw.toString();
    claimStateValue.textContent = contributionHasClaimed ? t("claimStateClaimed") : t("claimStateUnclaimed");
    const inviter = normalizeAddress(inviterRaw);
    if (inviter && inviter.toLowerCase() !== ZERO_ADDRESS.toLowerCase()) {
      inviteRefValue.textContent = inviter;
    } else {
      inviteRefValue.textContent = pendingReferrer || t("inviteRefNone");
    }

    if (contributionHasClaimed) {
      inviteLinkCache = buildInviteLink(currentAccount);
      inviteLinkValue.textContent = inviteLinkCache || t("inviteLinkNotReady");
    } else {
      inviteLinkCache = "";
      inviteLinkValue.textContent = t("inviteLinkNotReady");
    }

    if (!silent) {
      logT("logContributionRefreshed");
    }
  } catch (error) {
    contributionBalanceValue.textContent = "-";
    claimStateValue.textContent = "-";
    inviteLinkCache = "";
    inviteLinkValue.textContent = t("inviteLinkNotReady");
    if (!silent) {
      logT("logContributionRefreshFailed", { message: getErrorMessage(error) });
    }
  } finally {
    updateActionState();
  }
}

function getClaimReferrer() {
  if (!pendingReferrer) return ZERO_ADDRESS;
  if (!currentAccount) return pendingReferrer;
  if (pendingReferrer.toLowerCase() === currentAccount.toLowerCase()) {
    return ZERO_ADDRESS;
  }
  return pendingReferrer;
}

async function saveContributionContractAddress() {
  if (USE_FIXED_CONTRIBUTION_CONTRACT) {
    contributionContractAddress = DEFAULT_CONTRIBUTION_CONTRACT;
    refreshContractDisplay();
    updateContributionDisplayFallback();
    updateActionState();
    logT("logContractFixed", { address: contributionContractAddress });
    return;
  }
  const normalized = normalizeAddress(contractAddressInput.value);
  if (!contractAddressInput.value.trim()) {
    contributionContractAddress = "";
    persistContributionContractAddress("");
    contractAddressInput.value = "";
    updateContributionDisplayFallback();
    updateActionState();
    logT("logContractCleared");
    return;
  }
  if (!normalized) {
    logT("logContractInvalid");
    return;
  }

  contributionContractAddress = normalized;
  contractAddressInput.value = normalized;
  persistContributionContractAddress(normalized);
  logT("logContractSaved", { address: normalized });
  await refreshContributionState({ silent: false });
}

async function claimContribution() {
  if (!currentAccount) {
    logT("logNeedWalletBeforeClaim");
    return;
  }
  if (REQUIRED_NETWORK && (!currentChainId || currentChainId.toLowerCase() !== REQUIRED_NETWORK.chainId.toLowerCase())) {
    logT("logNeedBscBeforeClaim");
    return;
  }
  if (!contributionContractAddress) {
    logT("logContractMissing");
    return;
  }
  if (!hasEthersSdk()) {
    logT("logEthersMissing");
    return;
  }

  const referrer = getClaimReferrer();
  if (pendingReferrer && referrer === ZERO_ADDRESS) {
    logT("logInviteRefIgnored");
  }

  try {
    setButtonBusy(claimBtn, true, t("btnClaiming"));
    const readContract = createReadContract();
    if (!readContract) {
      logT("logContributionRefreshFailed", { message: "Missing contract connection" });
      return;
    }

    const already = await readContract.hasClaimed(currentAccount);
    if (already) {
      contributionHasClaimed = true;
      logT("logAlreadyClaimedOnChain");
      await refreshContributionState({ silent: true });
      return;
    }

    const writeContract = await createWriteContract();
    if (!writeContract) {
      logT("logContributionRefreshFailed", { message: "Missing signer" });
      return;
    }
    const tx = await writeContract.claim(referrer || ZERO_ADDRESS);
    logT("logClaimTxSubmitted", { hash: tx.hash });
    await tx.wait();
    contributionHasClaimed = true;
    inviteLinkCache = buildInviteLink(currentAccount);
    inviteLinkValue.textContent = inviteLinkCache || t("inviteLinkNotReady");
    updateActionState();
    logT("logClaimSuccess");
    await refreshContributionState({ silent: true });
  } catch (error) {
    logT("logClaimFailed", { message: getErrorMessage(error) });
  } finally {
    setButtonBusy(claimBtn, false);
  }
}

async function copyText(text) {
  if (!text) return false;
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // Fall back to execCommand path below.
    }
  }
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(textArea);
  }
}

function openManualCopyPrompt(text) {
  if (!text) return false;
  try {
    window.prompt(t("promptCopyInvite"), text);
    return true;
  } catch (error) {
    return false;
  }
}

function getProviderName(providerItem, info = null) {
  if (info && info.name) return info.name;
  if (!providerItem) return t("unknown");
  if (providerItem.isMetaMask) return "MetaMask";
  if (providerItem.isRabby) return "Rabby";
  if (providerItem.isOkxWallet || providerItem.isOKExWallet) return "OKX Wallet";
  if (providerItem.isBitKeep || providerItem.isBitgetWallet) return "Bitget Wallet";
  if (providerItem.isCoinbaseWallet) return "Coinbase Wallet";
  if (providerItem.isTrust || providerItem.isTrustWallet) return "Trust Wallet";
  return t("providerInjected");
}

function toCandidate(providerItem, source, info = null) {
  return {
    provider: providerItem,
    source,
    info,
    name: getProviderName(providerItem, info)
  };
}

function registerEip6963Provider(detail) {
  if (!detail || !detail.provider) return;
  const info = detail.info || {};
  const key = info.uuid || `${info.rdns || "unknown"}:${info.name || "wallet"}`;
  if (!eip6963Providers.has(key)) {
    eip6963Providers.set(key, { provider: detail.provider, info });
  }
}

function setupEip6963Discovery() {
  if (eipDiscoveryReady) return;
  eipDiscoveryReady = true;
  window.addEventListener("eip6963:announceProvider", (event) => {
    registerEip6963Provider(event.detail);
    updateProviderDebug();
  });
  window.dispatchEvent(new Event("eip6963:requestProvider"));
}

function collectProviderCandidates() {
  const all = [];
  const seen = new Set();

  if (window.ethereum) {
    const injected = Array.isArray(window.ethereum.providers) && window.ethereum.providers.length
      ? window.ethereum.providers
      : [window.ethereum];

    injected.forEach((item) => {
      if (item && !seen.has(item)) {
        seen.add(item);
        all.push(toCandidate(item, "injected"));
      }
    });
  }

  eip6963Providers.forEach((entry) => {
    if (entry.provider && !seen.has(entry.provider)) {
      seen.add(entry.provider);
      all.push(toCandidate(entry.provider, "eip6963", entry.info));
    }
  });

  return all;
}

function describeCandidates(candidates) {
  if (!candidates.length) return t("none");
  return candidates
    .map((item) => `${item.name} [${item.source}]`)
    .join(", ");
}

function pickBestProvider() {
  const candidates = collectProviderCandidates();
  if (!candidates.length) return null;

  const metamask = candidates.find((item) =>
    (item.provider && item.provider.isMetaMask) ||
    String(item.info && item.info.rdns ? item.info.rdns : "").toLowerCase().includes("metamask")
  );
  const chosenEntry = metamask || candidates[0];
  return { chosen: chosenEntry.provider, chosenEntry, candidates };
}

function updateProviderDebug() {
  const hasEthereum = Boolean(window.ethereum);
  const injectedCount = hasEthereum
    ? (Array.isArray(window.ethereum.providers) && window.ethereum.providers.length
      ? window.ethereum.providers.filter(Boolean).length
      : 1)
    : 0;
  providerDebugValue.textContent = t("providerDebugTemplate", {
    ethereum: hasEthereum ? t("yes") : t("no"),
    injected: injectedCount,
    eip6963: eip6963Providers.size
  });
}

async function waitForInjectedProvider(timeoutMs = 4500) {
  setupEip6963Discovery();
  updateProviderDebug();

  const immediate = pickBestProvider();
  if (immediate) return immediate;

  return new Promise((resolve) => {
    let done = false;
    const finalize = (result) => {
      if (done) return;
      done = true;
      window.removeEventListener("ethereum#initialized", onInitialized);
      window.removeEventListener("eip6963:announceProvider", onAnnounce);
      clearTimeout(timer);
      resolve(result);
    };

    const onInitialized = () => finalize(pickBestProvider());
    const onAnnounce = () => finalize(pickBestProvider());

    window.addEventListener("ethereum#initialized", onInitialized, { once: true });
    window.addEventListener("eip6963:announceProvider", onAnnounce);
    window.dispatchEvent(new Event("eip6963:requestProvider"));
    setTimeout(() => window.dispatchEvent(new Event("eip6963:requestProvider")), 300);

    const timer = setTimeout(() => finalize(pickBestProvider()), timeoutMs);
  });
}

async function detectProvider(showNotFoundLog = true) {
  const picked = await waitForInjectedProvider(4500);
  updateProviderDebug();

  if (picked) {
    provider = picked.chosen;
    providerName = picked.chosenEntry.name || getProviderName(provider);
    const total = picked.candidates.length;
    if (total > 1) {
      logT("logProviderSelectedMulti", { provider: providerName, count: total });
    } else {
      logT("logProviderSelectedSingle", { provider: providerName });
    }
    return true;
  }

  if (showNotFoundLog) {
    setStatusByKey("statusNoWallet", false);
    logT("logNoProviderFound");
    logT("logCandidates", { candidates: describeCandidates(collectProviderCandidates()) });
    if (window.location && window.location.protocol === "file:") {
      logT("logFileProtocol");
    } else if (window.location) {
      logT("logCurrentOrigin", { origin: window.location.origin || t("unknown") });
    }
  }
  return false;
}

function runDiagnostics() {
  setupEip6963Discovery();
  updateProviderDebug();
  const candidates = collectProviderCandidates();
  logT("logDiagnosticOrigin", {
    origin: window.location.origin || t("unknown"),
    secure: String(window.isSecureContext)
  });
  logT("logDiagnosticProviders", { providers: describeCandidates(candidates) });
}

async function switchToNetwork(target) {
  if (!provider || !target) return false;
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: target.chainId }]
    });
    logT("logSwitchedNetwork", { networkKey: target.key });
    return true;
  } catch (switchError) {
    const code = switchError && switchError.code;
    if (code === 4902 || String(switchError.message || "").toLowerCase().includes("unrecognized chain")) {
      try {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [target.params]
        });
        logT("logAddedAndSwitched", { networkKey: target.key });
        return true;
      } catch (addError) {
        logT("logAddNetworkFailed", { message: getErrorMessage(addError) });
        return false;
      }
    }
    logT("logSwitchFailed", { message: getErrorMessage(switchError) });
    return false;
  }
}

async function ensureRequiredNetwork() {
  if (!provider || !REQUIRED_NETWORK) return true;
  const chainId = await provider.request({ method: "eth_chainId" });
  if (chainId && chainId.toLowerCase() === REQUIRED_NETWORK.chainId.toLowerCase()) {
    return true;
  }
  return switchToNetwork(REQUIRED_NETWORK);
}

async function syncAccountAndChain() {
  if (!provider) return;
  const accounts = await provider.request({ method: "eth_accounts" });
  currentAccount = accounts[0] || "";
  currentChainId = await provider.request({ method: "eth_chainId" });

  if (currentAccount) {
    if (REQUIRED_NETWORK && currentChainId.toLowerCase() !== REQUIRED_NETWORK.chainId.toLowerCase()) {
      setStatusByKey("statusWrongNetwork", false, { networkKey: REQUIRED_NETWORK.key });
    } else {
      setStatusByKey("statusConnected", true, { provider: providerName });
    }
  } else {
    setStatusByKey("statusNotConnected", false);
  }

  const network = findNetwork(currentChainId);

  addressValue.textContent = currentAccount ? `${shortenAddress(currentAccount)} (${currentAccount})` : "-";
  chainValue.textContent = getChainDisplayText(currentChainId);
  selectNetworkByChainId(currentChainId);

  if (currentAccount) {
    const balance = await provider.request({
      method: "eth_getBalance",
      params: [currentAccount, "latest"]
    });
    const symbol = (network && network.params && network.params.nativeCurrency && network.params.nativeCurrency.symbol)
      || (REQUIRED_NETWORK && REQUIRED_NETWORK.params && REQUIRED_NETWORK.params.nativeCurrency.symbol)
      || "BNB";
    balanceValue.textContent = formatNative(balance, symbol);
  } else {
    balanceValue.textContent = "-";
  }
  await refreshContributionState({ silent: true });
}

async function connectWallet() {
  try {
    setButtonBusy(connectBtn, true, t("btnConnecting"));
    const ok = await detectProvider();
    if (!ok) return;

    bindProviderEvents();
    await requestAccountsWithTimeout();
    if (REQUIRED_NETWORK) {
      const switched = await ensureRequiredNetwork();
      if (!switched) {
        logT("logSwitchToRequiredFailed", { networkKey: REQUIRED_NETWORK.key });
      }
    }
    await syncAccountAndChain();
    if (!currentAccount) {
      logT("logNoAccountAfterConnect");
      return;
    }
    logT("logWalletConnectedSuccess", { provider: providerName });
  } catch (error) {
    if (error && error.code === 4001) {
      logT("logConnectCanceled");
      await syncAccountAndChain().catch(() => {});
      return;
    }
    if (error && error.code === -32002) {
      logT("logConnectPending");
      await syncAccountAndChain().catch(() => {});
      return;
    }
    if (error && error.code === "REQUEST_TIMEOUT" && error.method === "eth_requestAccounts") {
      logT("logConnectTimeout");
      await syncAccountAndChain().catch(() => {});
      return;
    }
    const codeSuffix = error && error.code ? ` (code ${error.code})` : "";
    logT("logConnectFailed", { codeSuffix, message: getErrorMessage(error) });
    await syncAccountAndChain().catch(() => {});
  } finally {
    setButtonBusy(connectBtn, false);
  }
}

async function switchOrAddNetwork() {
  if (!provider) {
    const ok = await detectProvider();
    if (!ok) return;
  }

  const index = Number(networkSelect.value);
  const target = REQUIRED_NETWORK || ACTIVE_NETWORKS[index];
  if (!target) return;
  if (currentChainId && currentChainId.toLowerCase() === target.chainId.toLowerCase()) {
    logT("logAlreadyOnNetwork", { networkKey: target.key });
    return;
  }

  try {
    setButtonBusy(switchBtn, true, t("btnSwitching"));
    const switched = await switchToNetwork(target);
    if (!switched) return;
    await syncAccountAndChain();
    rememberSelectedNetwork();
  } finally {
    setButtonBusy(switchBtn, false);
  }
}

async function openExplorer() {
  if (!currentAccount) return;
  const base = getExplorerBase(currentChainId);
  const url = `${base.replace(/\/$/, "")}/address/${currentAccount}`;
  window.open(url, "_blank", "noopener,noreferrer");
  logT("logOpenedExplorer", { url });
}

function bindProviderEvents() {
  if (!provider || !provider.on || boundProvider === provider) return;
  provider.on("accountsChanged", async () => {
    await syncAccountAndChain();
    logT("logAccountChanged");
  });
  provider.on("chainChanged", async () => {
    await syncAccountAndChain();
    logT("logChainChanged");
  });
  boundProvider = provider;
}

async function init() {
  if (USE_FIXED_CONTRIBUTION_CONTRACT) {
    contractAddressInput.readOnly = true;
    contractAddressInput.setAttribute("aria-readonly", "true");
    saveContractBtn.hidden = true;
  }
  const contractFromUrl = parseContractFromUrl();
  contributionContractAddress = loadContributionContractAddress();
  pendingReferrer = parseReferrerFromUrl();
  currentLangPref = loadLanguagePreference();
  currentLang = currentLangPref === "auto" ? detectSystemLang() : currentLangPref;
  currentThemePref = loadThemePreference();
  applyTheme();
  setupSystemThemeWatcher();
  applyLanguage();
  clearLog();
  if (contributionContractAddress) {
    refreshContractDisplay();
  } else if (contractFromUrl) {
    contractAddressInput.value = contractFromUrl;
    logT("logContractFromUrlPending", { address: contractFromUrl });
  } else {
    contractAddressInput.value = "";
    if (contractMobileValue) {
      contractMobileValue.textContent = "-";
    }
  }
  if (contributionContractAddress && contractFromUrl && contributionContractAddress.toLowerCase() !== contractFromUrl.toLowerCase()) {
    logT("logContractFromUrlPending", { address: contractFromUrl });
  }
  if (pendingReferrer) {
    logT("logInviteRefDetected", { referrer: pendingReferrer });
  }

  setupEip6963Discovery();
  updateProviderDebug();
  updateActionState();

  const hasProvider = await detectProvider(false);
  if (hasProvider) {
    bindProviderEvents();
    await syncAccountAndChain();
    logT("logDetectedOnInit");
  } else {
    logT("logNoWalletOnInit");
  }
}

if (langSelect) {
  langSelect.addEventListener("change", (event) => {
    setLanguagePreference(String(event.target.value || "auto"));
  });
}

if (themeSelect) {
  themeSelect.addEventListener("change", (event) => {
    setThemePreference(String(event.target.value || "auto"));
  });
}

saveContractBtn.addEventListener("click", () => {
  void saveContributionContractAddress();
});
contractAddressInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    void saveContributionContractAddress();
  }
});
claimBtn.addEventListener("click", () => {
  void claimContribution();
});
copyInviteBtn.addEventListener("click", async () => {
  let targetLink = inviteLinkCache;
  if (!targetLink && currentAccount && contributionContractAddress) {
    targetLink = buildInviteLink(currentAccount);
    if (targetLink) {
      inviteLinkCache = targetLink;
      inviteLinkValue.textContent = targetLink;
    }
  }
  if (!targetLink) {
    logT("logInviteCopyNotReady");
    return;
  }
  try {
    const copied = await copyText(targetLink);
    if (copied) {
      logT("logInviteCopied");
      showToast(t("logInviteCopied"));
    } else {
      const opened = openManualCopyPrompt(targetLink);
      if (opened) {
        logT("logInviteManualCopy");
      } else {
        logT("logAddressCopyNotAvailable");
      }
    }
  } catch (error) {
    const opened = openManualCopyPrompt(targetLink);
    if (opened) {
      logT("logInviteManualCopy");
    } else {
      logT("logAddressCopyFailed", { message: getErrorMessage(error) });
    }
  }
});

connectBtn.addEventListener("click", connectWallet);
switchBtn.addEventListener("click", switchOrAddNetwork);
diagnoseBtn.addEventListener("click", runDiagnostics);
copyBtn.addEventListener("click", async () => {
  if (!currentAccount) return;
  try {
    const copied = await copyText(currentAccount);
    if (copied) {
      logT("logAddressCopied");
    } else {
      logT("logAddressCopyNotAvailable");
    }
  } catch (error) {
    logT("logAddressCopyFailed", { message: getErrorMessage(error) });
  }
});
explorerBtn.addEventListener("click", openExplorer);
clearLogBtn.addEventListener("click", clearLog);
networkSelect.addEventListener("change", rememberSelectedNetwork);
refreshBtn.addEventListener("click", async () => {
  try {
    setButtonBusy(refreshBtn, true, t("btnRefreshing"));
    updateProviderDebug();
    await syncAccountAndChain();
    logT("logRefreshed");
  } catch (error) {
    logT("logRefreshFailed", { message: getErrorMessage(error) });
  } finally {
    setButtonBusy(refreshBtn, false);
  }
});

init().catch((error) => {
  logT("logInitError", { message: getErrorMessage(error) });
});
