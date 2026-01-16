/**
 * HYPERFOCUS v1.0.0 - CONTENT.JS
 * Advanced RSVP Reader & Focus Assistant
 * * CORE FEATURES:
 * 1. RSVP Engine: 
 * - Rapid Serial Visual Presentation with dynamic pacing.
 * - Left-weighted ORP (Optimal Recognition Point) alignment for natural reading flow.
 * - Smart text preprocessing (fixes missing spaces after punctuation).
 * * 2. Visual Intelligence:
 * - Theming System: Cyberpunk, Paperback, Deep Focus, and High-Contrast Colorblind mode.
 * - Custom Typography: System-safe font stacks (Sans, Serif, Mono).
 * - Distraction-free UI: Minimizable controls and "Hide UI" toggle.
 * * 3. Analytics & Gamification:
 * - True WPM Calculation: Computes net reading speed excluding pause times.
 * - Session Summary: Detailed insights on duration and time saved vs standard reading.
 * * 4. Architecture:
 * - I18n: Full localization for 7 languages (EN, IT, ZH, HI, ES, FR, DE).
 * - Dual Input: Reads parsed article content (Readability) or raw clipboard text.
 * - State Persistence: Syncs preferences via chrome.storage API.
 */

const DONATION_URL = "https://ko-fi.com/hyperfocusrsvp"; 

const THEMES = [
    { id: 'cyberpunk', name: 'Cyberpunk' },
    { id: 'paperback', name: 'Paperback' },
    { id: 'deep_focus', name: 'Deep Focus' },
    { id: 'colorblind', name: 'Colorblind' }
];

const FONTS = [
    { name: 'Sans', value: "system-ui, -apple-system, sans-serif" },
    { name: 'Serif', value: "Georgia, 'Times New Roman', serif" },
    { name: 'Mono', value: "monospace" }
];

const DICTIONARY = {
    en: {
        launch_clip: "📋 Read Clipboard",
        launch_page: "🚀 Read Article",
        btn_settings: "⚙️ Settings",
        btn_slower: "🐢 Slower",
        btn_faster: "🐰 Faster",
        btn_play: "▶ Play",
        btn_pause: "⏸ Pause",
        btn_close: "❌ Close",
        btn_hide: "👁️ Hide",
        btn_show: "👁️ Show",
        lbl_theme: "Theme",
        lbl_font: "Typeface",
        speed_label: "Speed:",
        time_left: "Time Left:",
        summary_title: "Session Complete",
        stat_wpm: "True Avg WPM",
        stat_time: "Duration",
        stat_saved: "Time Saved",
        tip_min: "Drag to move / Click to toggle",
        alert_no_text: "No text found. Try copying text first.",
        donate_msg: "You saved TIME min. Useful?",
        donate_btn: "☕ Buy me a coffee"
    },
    it: {
        launch_clip: "📋 Leggi Appunti",
        launch_page: "🚀 Leggi Articolo",
        btn_settings: "⚙️ Impostazioni",
        btn_slower: "🐢 Rallenta",
        btn_faster: "🐰 Velocizza",
        btn_play: "▶ Avvia",
        btn_pause: "⏸ Pausa",
        btn_close: "❌ Chiudi",
        btn_hide: "👁️ Nascondi",
        btn_show: "👁️ Mostra",
        lbl_theme: "Tema",
        lbl_font: "Carattere",
        speed_label: "Velocità:",
        time_left: "Rimanente:",
        summary_title: "Sessione Completata",
        stat_wpm: "WPM Reale",
        stat_time: "Durata",
        stat_saved: "Risparmiato",
        tip_min: "Trascina per muovere / Clicca per minimizzare",
        alert_no_text: "Nessun testo trovato. Prova a copiare il testo prima.",
        donate_msg: "Hai risparmiato TIME min. Utile?",
        donate_btn: "☕ Offrimi un caffè"
    },
    zh: {
        launch_clip: "📋 读取剪贴板",
        launch_page: "🚀 读取正文",
        btn_settings: "⚙️ 设置",
        btn_slower: "🐢 减速",
        btn_faster: "🐰 加速",
        btn_play: "▶ 开始",
        btn_pause: "⏸ 暂停",
        btn_close: "❌ 关闭",
        btn_hide: "👁️ 隐藏",
        btn_show: "👁️ 显示",
        lbl_theme: "主题",
        lbl_font: "字体",
        speed_label: "速度:",
        time_left: "剩余时间:",
        summary_title: "阅读完成",
        stat_wpm: "真实速度",
        stat_time: "耗时",
        stat_saved: "节省时间",
        tip_min: "最小化/展开",
        alert_no_text: "未找到文本。请先复制内容。",
        donate_msg: "省时 TIME 分钟。有用吗？",
        donate_btn: "☕ 请我喝杯咖啡"
    },
    hi: {
        launch_clip: "📋 क्लिपबोर्ड पढ़ें",
        launch_page: "🚀 लेख पढ़ें",
        btn_settings: "⚙️ सेटिंग्स",
        btn_slower: "🐢 धीमे",
        btn_faster: "🐰 तेज़",
        btn_play: "▶ चलाएं",
        btn_pause: "⏸ रोकें",
        btn_close: "❌ बंद करें",
        btn_hide: "👁️ छिपाना",
        btn_show: "👁️ दिखाएं",
        lbl_theme: "थीम",
        lbl_font: "फ़ॉन्ट",
        speed_label: "गति:",
        time_left: "शेष समय:",
        summary_title: "सत्र पूरा हुआ",
        stat_wpm: "औसत गति",
        stat_time: "अवधि",
        stat_saved: "बचाया गया समय",
        tip_min: "छोटा/बड़ा करें",
        alert_no_text: "कोई टेक्स्ट नहीं मिला। पहले टेक्स्ट कॉपी करें।",
        donate_msg: "TIME मिनट बचाए। उपयोगी?",
        donate_btn: "☕ मुझे कॉफी पिलाएं"
    },
    es: {
        launch_clip: "📋 Leer Portapapeles",
        launch_page: "🚀 Leer Artículo",
        btn_settings: "⚙️ Ajustes",
        btn_slower: "🐢 Desacelerar",
        btn_faster: "🐰 Acelerar",
        btn_play: "▶ Reproducir",
        btn_pause: "⏸ Pausa",
        btn_close: "❌ Cerrar",
        btn_hide: "👁️ Ocultar",
        btn_show: "👁️ Mostrar",
        lbl_theme: "Tema",
        lbl_font: "Tipografía",
        speed_label: "Velocidad:",
        time_left: "Restante:",
        summary_title: "Sesión Finalizada",
        stat_wpm: "PPM Real",
        stat_time: "Duración",
        stat_saved: "Ahorrado",
        tip_min: "Minimizar/Expandir",
        alert_no_text: "No se encontró texto. Intenta copiarlo primero.",
        donate_msg: "Ahorraste TIME min. ¿Útil?",
        donate_btn: "☕ Cómprame un café"
    },
    fr: {
        launch_clip: "📋 Lire Presse-papiers",
        launch_page: "🚀 Lire l'Article",
        btn_settings: "⚙️ Paramètres",
        btn_slower: "🐢 Ralentir",
        btn_faster: "🐰 Accélérer",
        btn_play: "▶ Lecture",
        btn_pause: "⏸ Pause",
        btn_close: "❌ Fermer",
        btn_hide: "👁️ Masquer",
        btn_show: "👁️ Afficher",
        lbl_theme: "Thème",
        lbl_font: "Police",
        speed_label: "Vitesse :",
        time_left: "Restant :",
        summary_title: "Session Terminée",
        stat_wpm: "MPM Réel",
        stat_time: "Durée",
        stat_saved: "Économisé",
        tip_min: "Réduire/Agrandir",
        alert_no_text: "Aucun texte trouvé. Copiez d'abord le texte.",
        donate_msg: "TIME min gagnées. Utile ?",
        donate_btn: "☕ Offrez-moi un café"
    },
    de: {
        launch_clip: "📋 Aus Ablage lesen",
        launch_page: "🚀 Artikel lesen",
        btn_settings: "⚙️ Einstellungen",
        btn_slower: "🐢 Langsamer",
        btn_faster: "🐰 Schneller",
        btn_play: "▶ Start",
        btn_pause: "⏸ Pause",
        btn_close: "❌ Schließen",
        btn_hide: "👁️ Ausblenden",
        btn_show: "👁️ Einblenden",
        lbl_theme: "Design",
        lbl_font: "Schriftart",
        speed_label: "Tempo:",
        time_left: "Verbleibend:",
        summary_title: "Sitzung Beendet",
        stat_wpm: "Echte WPM",
        stat_time: "Dauer",
        stat_saved: "Gespart",
        tip_min: "Minimieren/Erweitern",
        alert_no_text: "Kein Text gefunden. Bitte erst kopieren.",
        donate_msg: "TIME Min. gespart. Nützlich?",
        donate_btn: "☕ Spendier mir einen Kaffee"
    }
};

const userLang = navigator.language.slice(0, 2);
const t = DICTIONARY[userLang] || DICTIONARY['en'];

// --- GESTIONE STATO ---
let state = {
    wpm: 350,
    theme: 'cyberpunk',
    font: "system-ui, -apple-system, sans-serif",
    launcher_minimized: false,
    launcher_pos: { top: null, left: null }
};

let words = [];
let currentIndex = 0;
let isPlaying = false;
let intervalId = null;
let sessionStartTime = 0;
let totalPauseTime = 0; 
let lastPauseStart = 0;

async function loadSettings() {
    try {
        const data = await chrome.storage.sync.get(['user_theme', 'user_font', 'user_wpm', 'launcher_minimized', 'launcher_pos']);
        if (data.user_theme) state.theme = data.user_theme;
        if (data.user_font) state.font = data.user_font;
        if (data.user_wpm) state.wpm = parseInt(data.user_wpm);
        if (data.launcher_minimized !== undefined) state.launcher_minimized = data.launcher_minimized;
        if (data.launcher_pos) state.launcher_pos = data.launcher_pos;
        applyVisualSettings();
    } catch (e) { console.error(e); }
}

function saveSetting(key, value) {
    let store = {};
    store[key] = value;
    chrome.storage.sync.set(store);
}

// --- UI GENERATION ---
function applyVisualSettings() {
    const overlay = document.getElementById('rsvp-overlay');
    const container = document.getElementById('rsvp-word-container');
    if (overlay) overlay.setAttribute('data-theme', state.theme);
    if (container) container.style.fontFamily = state.font;
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.val === state.theme || btn.dataset.val === state.font) {
            btn.classList.add('active');
        }
    });
}

function createOverlay() {
    if (document.getElementById('rsvp-overlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'rsvp-overlay';
    overlay.style.display = 'none';
    
    overlay.innerHTML = `
        <div id="rsvp-word-container">
            <div class="rsvp-left"></div><div class="rsvp-pivot"></div><div class="rsvp-right"></div>
        </div>
        <div id="rsvp-timeline-container">
            <div id="rsvp-progress-bg"><div id="rsvp-progress-fill"></div></div>
            <div id="rsvp-time-label">--:--</div>
        </div>
        <div id="rsvp-controls-wrapper">
            <div id="rsvp-controls">
                <button id="btn-settings">${t.btn_settings}</button>
                <button id="btn-slower">${t.btn_slower}</button>
                <button id="btn-toggle">${t.btn_play}</button>
                <button id="btn-faster">${t.btn_faster}</button>
                <button id="btn-hide">${t.btn_hide}</button>
                <button id="btn-close">${t.btn_close}</button>
            </div>
        </div>
        <div id="rsvp-settings-popover">
            <div class="setting-group"><span class="setting-label">${t.lbl_theme}</span><div class="theme-options" id="theme-options-container"></div></div>
            <div class="setting-group"><span class="setting-label">${t.lbl_font}</span><div class="font-options" id="font-options-container"></div></div>
            <div class="settings-donate-link"><a href="${DONATION_URL}" target="_blank">${t.donate_btn}</a></div>
        </div>
        <div style="margin-top: 20px; font-size: 16px; opacity: 0.7;">${t.speed_label} <span id="wpm-display">${state.wpm}</span> WPM</div>
        <div id="rsvp-summary-modal">
            <h2>${t.summary_title}</h2>
            <div class="summary-stat"><span id="sum-wpm">0</span> <div class="summary-sub">${t.stat_wpm}</div></div>
            <div class="summary-stat"><span id="sum-time">0m</span> <div class="summary-sub">${t.stat_time}</div></div>
            <div style="margin-top:20px; padding-top:20px; border-top: 1px solid rgba(255,255,255,0.1);">
                <div class="summary-stat" style="color: var(--hf-accent)"><span id="sum-saved">0m</span></div>
                <div class="summary-sub">${t.stat_saved}</div>
            </div>
            <div id="donation-area" class="donation-area" style="display:none;">
                <div id="donate-msg" class="donation-text"></div>
                <a href="${DONATION_URL}" target="_blank" class="btn-coffee">${t.donate_btn}</a>
            </div>
            <button id="btn-summary-close" class="launcher-btn" style="margin: 20px auto 0 auto; background: #333;">${t.btn_close}</button>
        </div>
    `;

    document.body.appendChild(overlay);

    const themeCont = document.getElementById('theme-options-container');
    THEMES.forEach(th => {
        const btn = document.createElement('button');
        btn.className = 'option-btn'; btn.innerText = th.name; btn.dataset.val = th.id;
        btn.onclick = () => { state.theme = th.id; saveSetting('user_theme', th.id); applyVisualSettings(); };
        themeCont.appendChild(btn);
    });

    const fontCont = document.getElementById('font-options-container');
    FONTS.forEach(ft => {
        const btn = document.createElement('button');
        btn.className = 'option-btn'; btn.innerText = ft.name; btn.dataset.val = ft.value;
        btn.onclick = () => { state.font = ft.value; saveSetting('user_font', ft.value); applyVisualSettings(); };
        fontCont.appendChild(btn);
    });

    document.getElementById('btn-toggle').onclick = togglePlay;
    document.getElementById('btn-close').onclick = closeReader;
    document.getElementById('btn-faster').onclick = () => changeSpeed(50);
    document.getElementById('btn-slower').onclick = () => changeSpeed(-50);
    document.getElementById('btn-settings').onclick = toggleSettings;
    document.getElementById('btn-hide').onclick = toggleUI; 
    document.getElementById('btn-summary-close').onclick = () => {
        document.getElementById('rsvp-summary-modal').style.display = 'none';
        closeReader();
    };
    applyVisualSettings();
}

// --- NUOVA LOGICA LAUNCHER ---

function createLauncher() {
    if (document.getElementById('rsvp-launcher-container')) return;
    const container = document.createElement('div');
    container.id = 'rsvp-launcher-container';
    
    if (state.launcher_minimized) {
        container.classList.add('minimized');
    }

    if (state.launcher_pos.top !== null && state.launcher_pos.left !== null) {
        container.style.bottom = 'auto'; 
        container.style.right = 'auto';
        const safeLeft = Math.min(Math.max(0, state.launcher_pos.left), window.innerWidth - 50);
        const safeTop = Math.min(Math.max(0, state.launcher_pos.top), window.innerHeight - 50);
        container.style.top = safeTop + 'px';
        container.style.left = safeLeft + 'px';
    }

    container.innerHTML = `
        <button id="btn-launcher-toggle" title="${t.tip_min}"></button>
        <div id="rsvp-launcher-buttons">
            <button id="btn-launch-clip" class="launcher-btn">${t.launch_clip}</button>
            <button id="btn-launch-page" class="launcher-btn">${t.launch_page}</button>
        </div>
    `;
    document.body.appendChild(container);

    const btnToggle = document.getElementById('btn-launcher-toggle');
    const iconUrl = chrome.runtime.getURL('carrot_icon.png');
    btnToggle.style.backgroundImage = `url("${iconUrl}")`;

    document.getElementById('btn-launch-clip').onclick = () => initReader(true);
    document.getElementById('btn-launch-page').onclick = () => initReader(false);

    const updateSideAlignment = () => {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + (rect.width / 2);
        
        if (centerX > window.innerWidth / 2) {
            container.style.alignItems = 'flex-end';
        } else {
            container.style.alignItems = 'flex-start';
        }
    };

    updateSideAlignment();
    
    // --- DRAG AND DROP ---
    let isDragging = false;
    let hasMoved = false; 
    let startX, startY, initialLeft, initialTop;

    btnToggle.addEventListener('mousedown', (e) => {
        e.preventDefault(); 
        isDragging = true;
        hasMoved = false;
        startX = e.clientX; startY = e.clientY;
        
        const rect = container.getBoundingClientRect();
        initialLeft = parseFloat(container.style.left) || rect.left;
        initialTop = parseFloat(container.style.top) || rect.top;
        
        container.style.bottom = 'auto'; container.style.right = 'auto';
        container.style.left = initialLeft + 'px'; container.style.top = initialTop + 'px';
        btnToggle.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true;

        let newLeft = initialLeft + dx;
        let newTop = initialTop + dy;
        const rect = container.getBoundingClientRect();
        
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - rect.width));
        newTop = Math.max(0, Math.min(newTop, window.innerHeight - rect.height));

        container.style.top = `${newTop}px`;
        container.style.left = `${newLeft}px`;
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        btnToggle.style.cursor = 'grab';

        if (hasMoved) {
            updateSideAlignment();
            
            const rect = container.getBoundingClientRect();
            state.launcher_pos = { top: rect.top, left: rect.left };
            saveSetting('launcher_pos', state.launcher_pos);
        }
    });

    btnToggle.addEventListener('click', (e) => {
        if (hasMoved) { e.preventDefault(); e.stopPropagation(); hasMoved = false; return; }

        const c = document.getElementById('rsvp-launcher-container');
        const rect = c.getBoundingClientRect();
        
        const isRightSide = (rect.left + (rect.width / 2)) > (window.innerWidth / 2);

        if (isRightSide) {

            const fixedRight = rect.right;
            

            if (c.classList.contains('minimized')) {
                c.classList.remove('minimized');
                state.launcher_minimized = false;
            } else {
                c.classList.add('minimized');
                state.launcher_minimized = true;
            }
            c.style.alignItems = 'flex-end';

            const newWidth = c.offsetWidth;

            c.style.left = (fixedRight - newWidth) + 'px';

        } else {
            if (c.classList.contains('minimized')) {
                c.classList.remove('minimized');
                state.launcher_minimized = false;
            } else {
                c.classList.add('minimized');
                state.launcher_minimized = true;
            }
            c.style.alignItems = 'flex-start';
        }

        const finalRect = c.getBoundingClientRect();
        state.launcher_pos = { top: finalRect.top, left: finalRect.left };
        saveSetting('launcher_pos', state.launcher_pos);
        saveSetting('launcher_minimized', state.launcher_minimized);
    });
    
    window.addEventListener('resize', () => {
        const rect = container.getBoundingClientRect();
        if (rect.right > window.innerWidth) container.style.left = (window.innerWidth - rect.width - 10) + 'px';
        if (rect.bottom > window.innerHeight) container.style.top = (window.innerHeight - rect.height - 10) + 'px';
        updateSideAlignment();
    });
}

function toggleUI() {
    const controls = document.getElementById('rsvp-controls');
    const btnHide = document.getElementById('btn-hide');
    if (controls.classList.contains('hidden-controls')) {
        controls.classList.remove('hidden-controls');
        btnHide.innerText = t.btn_hide; 
    } else {
        controls.classList.add('hidden-controls');
        btnHide.innerText = t.btn_show;
    }
}

function toggleSettings() {
    const pop = document.getElementById('rsvp-settings-popover');
    pop.classList.toggle('visible');
}

// --- RSVP LOGIC CORE ---

async function initReader(forceClipboard) {
    let rawText = "";
    if (forceClipboard) {
        try { rawText = await navigator.clipboard.readText(); } 
        catch (e) { alert("Clipboard Error"); return; }
    } else {
        const selection = window.getSelection().toString();
        if (selection.length > 5) rawText = selection;
        else {
            try {
                let article = new Readability(document.cloneNode(true)).parse();
                if (article) rawText = article.textContent;
            } catch(e) {}
        }
    }

    if (!rawText || rawText.length < 10) { alert(t.alert_no_text); return; }

    let cleanText = rawText.replace(/([.,!?;:])(?=[^\s])/g, '$1 '); 
    cleanText = cleanText.replace(/\s+/g, ' ').trim();

    words = cleanText.split(' ');
    
    currentIndex = 0;
    isPlaying = false;
    sessionStartTime = 0;
    totalPauseTime = 0;
    
    const overlay = document.getElementById('rsvp-overlay');
    if (!overlay) createOverlay();
    
    document.getElementById('rsvp-overlay').style.display = 'flex';
    document.getElementById('rsvp-summary-modal').style.display = 'none';
    document.getElementById('btn-toggle').innerText = t.btn_play;
    document.activeElement.blur();
    
    updateWordDisplay();
    updateTimeline();
}

function updateWordDisplay() {
    if (currentIndex >= words.length) { finishSession(); return; }
    const word = words[currentIndex];
    let pivotIndex = Math.floor((word.length - 1) * 0.35);
    if (word.length === 1) pivotIndex = 0;
    if (pivotIndex >= word.length) pivotIndex = word.length - 1;
    const startText = word.slice(0, pivotIndex);
    const pivotChar = word[pivotIndex];
    const endText = word.slice(pivotIndex + 1);
    const container = document.getElementById('rsvp-word-container');
    container.querySelector('.rsvp-left').innerText = startText;
    container.querySelector('.rsvp-pivot').innerText = pivotChar;
    container.querySelector('.rsvp-right').innerText = endText;
}

function updateTimeline() {
    const progress = (currentIndex / words.length) * 100;
    document.getElementById('rsvp-progress-fill').style.width = `${progress}%`;
    const wordsLeft = words.length - currentIndex;
    const minutesLeft = Math.floor(wordsLeft / state.wpm);
    const secondsLeft = Math.floor(((wordsLeft / state.wpm) - minutesLeft) * 60);
    const timeString = `${minutesLeft}:${secondsLeft.toString().padStart(2, '0')}`;
    document.getElementById('rsvp-time-label').innerText = `${t.time_left} ${timeString}`;
}

function step() {
    if (!isPlaying) return;
    currentIndex++;
    updateWordDisplay();
    updateTimeline();
    if (currentIndex >= words.length) return;
    const currentWord = words[currentIndex];
    let delay = 60000 / state.wpm;
    if (currentWord.length > 7) delay += (currentWord.length - 6) * 32; 
    else if (currentWord.length < 4) delay *= 0.95; 
    const lastChar = currentWord.slice(-1);
    if (['.', '!', '?'].includes(lastChar)) delay *= 1.75; 
    else if ([',', ';', ':'].includes(lastChar)) delay *= 1.5; 
    intervalId = setTimeout(step, delay);
}

function togglePlay() {
    isPlaying = !isPlaying;
    const btn = document.getElementById('btn-toggle');
    if (isPlaying) {
        btn.innerText = t.btn_pause;
        if (sessionStartTime === 0) sessionStartTime = Date.now();
        if (lastPauseStart > 0) {
            totalPauseTime += (Date.now() - lastPauseStart);
            lastPauseStart = 0;
        }
        step();
    } else {
        btn.innerText = t.btn_play;
        clearTimeout(intervalId);
        lastPauseStart = Date.now(); 
    }
}

function changeSpeed(amount) {
    state.wpm += amount;
    if (state.wpm < 50) state.wpm = 50;
    document.getElementById('wpm-display').innerText = state.wpm;
    saveSetting('user_wpm', state.wpm);
}

function finishSession() {
    isPlaying = false;
    clearTimeout(intervalId);
    
    const now = Date.now();
    let grossDuration = now - sessionStartTime;
    let netDurationMs = grossDuration - totalPauseTime;
    if (netDurationMs < 1000) netDurationMs = 1000; 
    const netDurationMin = netDurationMs / 60000;
    const trueAvgWpm = Math.round(words.length / netDurationMin);
    const standardTimeMin = words.length / 240;
    const timeSavedMin = standardTimeMin - netDurationMin;

    document.getElementById('sum-wpm').innerText = trueAvgWpm;
    document.getElementById('sum-time').innerText = netDurationMin.toFixed(1) + "m";
    const savedElem = document.getElementById('sum-saved');
    const donateArea = document.getElementById('donation-area');
    const donateMsg = document.getElementById('donate-msg');
    
    if (timeSavedMin > 0) {
        let displayTime = timeSavedMin < 1 ? timeSavedMin.toFixed(1) : timeSavedMin.toFixed(0);
        savedElem.innerText = displayTime + " min";
        savedElem.style.color = "var(--hf-accent)";
    } else {
        savedElem.innerText = "--";
        savedElem.style.color = "var(--hf-text-dim)";
    }

    if (timeSavedMin > 0.3) { 
        donateMsg.innerText = t.donate_msg.replace("TIME", timeSavedMin.toFixed(0));
        donateArea.style.display = "block";
    } else {
        donateArea.style.display = "none";
    }
    
    document.getElementById('rsvp-summary-modal').style.display = 'block';
}

function closeReader() {
    isPlaying = false; clearTimeout(intervalId);
    document.getElementById('rsvp-overlay').style.display = 'none';
}

document.addEventListener('keydown', (e) => {
    const overlay = document.getElementById('rsvp-overlay');
    if (overlay && overlay.style.display === 'flex') {
        if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
        if (e.code === 'Escape') closeReader();
        if (e.code === 'ArrowRight') { isPlaying=false; currentIndex++; updateWordDisplay(); updateTimeline(); }
        if (e.code === 'ArrowLeft') { isPlaying=false; currentIndex = Math.max(0, currentIndex-1); updateWordDisplay(); updateTimeline(); }
    }
});

loadSettings().then(() => {
    createLauncher();
    createOverlay();
});