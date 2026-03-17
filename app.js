"use strict";

const I18N = {
  zh: {
    appTitle: "BSC 钱包连接",
    appSubtitle: "连接 EVM 钱包（MetaMask、Rabby、OKX、Bitget 等），当前仅开放 BSC 主网，其他公链已隐藏备用。",
    langSwitchAria: "语言切换",
    langSelectLabel: "语言",
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
    hintLocalhost: "提示：请勿通过 file:// 打开。请使用 localhost 或线上 HTTPS 域名。",
    ready: "准备就绪。",
    yes: "是",
    no: "否",
    none: "无",
    unknownChain: "未知 EVM 网络 ({chainId})",
    providerDebugTemplate: "window.ethereum={ethereum} | 注入={injected} | eip6963={eip6963}",
    optionNetwork: "{label} ({chainId})",
    logProviderSelected: "已选择钱包提供者：{provider}{extra}",
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
    logAddressCopyNotAvailable: "当前环境不支持复制地址。"
  },
  en: {
    appTitle: "BSC Wallet Connect",
    appSubtitle: "Connect EVM wallets (MetaMask, Rabby, OKX, Bitget, etc.). Only BSC mainnet is enabled now; other chains are hidden for future use.",
    langSwitchAria: "Language switch",
    langSelectLabel: "Language",
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
    hintLocalhost: "Tip: do not open from file:// . Use localhost or an HTTPS domain.",
    ready: "Ready.",
    yes: "yes",
    no: "no",
    none: "none",
    unknownChain: "Unknown EVM chain ({chainId})",
    providerDebugTemplate: "window.ethereum={ethereum} | injected={injected} | eip6963={eip6963}",
    optionNetwork: "{label} ({chainId})",
    logProviderSelected: "Provider selected: {provider}{extra}",
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
    logAddressCopyNotAvailable: "Copy is not available in this environment."
  }
};

const EXTRA_LOCALES = {
  es: {
    appTitle: "Conexión de Billetera BSC",
    appSubtitle: "Conecta billeteras EVM (MetaMask, Rabby, OKX, Bitget, etc.). Solo BSC mainnet está habilitada por ahora; otras cadenas quedan ocultas para uso futuro.",
    langSwitchAria: "Selector de idioma",
    langSelectLabel: "Idioma",
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
    label: { zh: "BSC 主网", en: "BSC Mainnet" },
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
const LAST_NETWORK_KEY = "wallet-connect:last-network";
const MAX_LOG_LINES = 120;

const langSwitch = document.getElementById("langSwitch");
const langSelectLabel = document.getElementById("langSelectLabel");
const langSelect = document.getElementById("langSelect");

const titleText = document.getElementById("titleText");
const subtitleText = document.getElementById("subtitleText");
const addressLabel = document.getElementById("addressLabel");
const chainLabel = document.getElementById("chainLabel");
const balanceLabel = document.getElementById("balanceLabel");
const providerDebugLabel = document.getElementById("providerDebugLabel");
const hintText = document.getElementById("hintText");

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

const logLines = [];

let currentLangPref = "auto";
let currentLang = "zh";

let provider = null;
let providerName = "Unknown";
let boundProvider = null;
let eipDiscoveryReady = false;
const eip6963Providers = new Map();
let currentAccount = "";
let currentChainId = "";
let lastStatus = { key: "statusNotConnected", connected: false, vars: {} };

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
  const text = t(lastStatus.key, lastStatus.vars);
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

  setButtonLabel(refreshBtn, t("btnRefresh"));
  setButtonLabel(diagnoseBtn, t("btnDiagnose"));
  setButtonLabel(copyBtn, t("btnCopyAddress"));
  setButtonLabel(explorerBtn, t("btnOpenExplorer"));
  setButtonLabel(clearLogBtn, t("btnClearLog"));
  setButtonLabel(switchBtn, t("btnSwitchBsc", { network: getNetworkLabel(REQUIRED_NETWORK) || "BSC" }));

  renderLanguageSelector();
  renderNetworkSelect();
  if (!currentChainId) {
    restoreSelectedNetwork();
  } else {
    selectNetworkByChainId(currentChainId);
  }
  refreshStatusText();
  updateActionState();
  updateProviderDebug();
  if (!logLines.length) {
    logBox.textContent = t("ready");
  }
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

function log(message) {
  const stamp = new Date().toLocaleTimeString();
  logLines.unshift(`[${stamp}] ${message}`);
  if (logLines.length > MAX_LOG_LINES) {
    logLines.length = MAX_LOG_LINES;
  }
  logBox.textContent = logLines.join("\n");
}

function logT(key, vars = {}) {
  log(t(key, vars));
}

function clearLog() {
  logLines.length = 0;
  logBox.textContent = t("ready");
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
  copyBtn.disabled = !hasAccount;
  explorerBtn.disabled = !hasAccount;
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
  if (!error) return "Unknown error";
  if (typeof error === "string") return error;
  const msg = error.shortMessage || error.reason || error.message;
  return msg || JSON.stringify(error);
}

async function copyText(text) {
  if (!text) return false;
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
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

function getProviderName(providerItem, info = null) {
  if (info && info.name) return info.name;
  if (!providerItem) return "Unknown";
  if (providerItem.isMetaMask) return "MetaMask";
  if (providerItem.isRabby) return "Rabby";
  if (providerItem.isOkxWallet || providerItem.isOKExWallet) return "OKX Wallet";
  if (providerItem.isBitKeep || providerItem.isBitgetWallet) return "Bitget Wallet";
  if (providerItem.isCoinbaseWallet) return "Coinbase Wallet";
  if (providerItem.isTrust || providerItem.isTrustWallet) return "Trust Wallet";
  return "Injected EVM Wallet";
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
    const extra = total > 1 ? t("logProviderCountSuffix", { count: total }) : "";
    logT("logProviderSelected", { provider: providerName, extra });
    return true;
  }

  if (showNotFoundLog) {
    setStatusByKey("statusNoWallet", false);
    logT("logNoProviderFound");
    logT("logCandidates", { candidates: describeCandidates(collectProviderCandidates()) });
    if (window.location && window.location.protocol === "file:") {
      logT("logFileProtocol");
    } else if (window.location) {
      logT("logCurrentOrigin", { origin: window.location.origin || "unknown" });
    }
  }
  return false;
}

function runDiagnostics() {
  setupEip6963Discovery();
  updateProviderDebug();
  const candidates = collectProviderCandidates();
  logT("logDiagnosticOrigin", {
    origin: window.location.origin || "unknown",
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
    logT("logSwitchedNetwork", { network: getNetworkLabel(target) });
    return true;
  } catch (switchError) {
    const code = switchError && switchError.code;
    if (code === 4902 || String(switchError.message || "").toLowerCase().includes("unrecognized chain")) {
      try {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [target.params]
        });
        logT("logAddedAndSwitched", { network: getNetworkLabel(target) });
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
      setStatusByKey("statusWrongNetwork", false, { network: getNetworkLabel(REQUIRED_NETWORK) });
    } else {
      setStatusByKey("statusConnected", true, { provider: providerName });
    }
  } else {
    setStatusByKey("statusNotConnected", false);
  }

  const network = findNetwork(currentChainId);
  const chainText = network
    ? `${getNetworkLabel(network)} (${currentChainId})`
    : t("unknownChain", { chainId: currentChainId || "-" });

  addressValue.textContent = currentAccount ? `${shortenAddress(currentAccount)} (${currentAccount})` : "-";
  chainValue.textContent = chainText;
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
  updateActionState();
}

async function connectWallet() {
  try {
    setButtonBusy(connectBtn, true, t("btnConnecting"));
    const ok = await detectProvider();
    if (!ok) return;

    bindProviderEvents();
    await provider.request({ method: "eth_requestAccounts" });
    if (REQUIRED_NETWORK) {
      const switched = await ensureRequiredNetwork();
      if (!switched) {
        logT("logSwitchToRequiredFailed", { network: getNetworkLabel(REQUIRED_NETWORK) });
      }
    }
    await syncAccountAndChain();
    logT("logWalletConnectedSuccess", { provider: providerName });
  } catch (error) {
    if (error && error.code === 4001) {
      logT("logConnectCanceled");
      return;
    }
    if (error && error.code === -32002) {
      logT("logConnectPending");
      return;
    }
    const codeSuffix = error && error.code ? ` (code ${error.code})` : "";
    logT("logConnectFailed", { codeSuffix, message: getErrorMessage(error) });
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
    logT("logAlreadyOnNetwork", { network: getNetworkLabel(target) });
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
  currentLangPref = loadLanguagePreference();
  currentLang = currentLangPref === "auto" ? detectSystemLang() : currentLangPref;
  applyLanguage();
  clearLog();

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
