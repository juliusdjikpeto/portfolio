// --- 1. INITIALISATION GÉNÉRALE ---
window.onload = () => {
    
    // Initialisation AOS (Animations)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // Lancement du message de bienvenue
    updateGreeting();

    // Lancement du mode sombre
    initTheme();

    // Notification Telegram (une fois par session)
    if (!sessionStorage.getItem('visited')) {
        notifyTelegram();
        sessionStorage.setItem('visited', 'true');
    }
};

// --- 2. GESTION DU MODE SOMBRE (THEME) ---
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        
        // Change l'icône selon le mode
        if (body.classList.contains('light-theme')) {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });
}

// --- 3. MESSAGE DE BIENVENUE ADAPTATIF ---
function updateGreeting() {
    const greetingElement = document.getElementById('greeting');
    if (!greetingElement) return;

    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
        greetingElement.textContent = "Bonjour";
    } else if (hour >= 12 && hour < 18) {
        greetingElement.textContent = "Bon après-midi";
    } else {
        greetingElement.textContent = "Bonsoir";
    }
}

// --- 4. NOTIFICATION TELEGRAM ---
function notifyTelegram() {
    const token = "6513521378:AAGdb0VWlfwfoqXd0nDGfQNbNj4XFF2Xnjs"; 
    const chatId = "6762307554"; 
    
    fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
            const msg = `🚀 Visiteur sur ton Portfolio !\n📍 Ville : ${data.city || '?'}\n🌍 Pays : ${data.country_name || '?'}\n📱 Appareil : ${navigator.userAgent.slice(0, 30)}...`;
            fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(msg)}`);
        })
        .catch(() => {
            fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=🚀 Nouveau visiteur !`);
        });
}
