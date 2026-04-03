// --- 1. INITIALISATION GÉNÉRALE ---
window.onload = () => {
    // Initialisation AOS (Animations)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    updateGreeting(); // Message Bonjour/Bonsoir
    initTheme();     // Gestion du bouton Mode Sombre
    notifyTelegram(); // Notification SANS CONDITION (à chaque chargement)
};

// --- 2. GESTION DU MODE SOMBRE ---
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        if (document.body.classList.contains('light-theme')) {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });
}

// --- 3. MESSAGE DE BIENVENUE ---
function updateGreeting() {
    const greetingElement = document.getElementById('greeting');
    if (!greetingElement) return;
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) greetingElement.textContent = "Bonjour";
    else if (hour >= 12 && hour < 18) greetingElement.textContent = "Bon après-midi";
    else greetingElement.textContent = "Bonsoir";
}

// --- 4. NOTIFICATION TELEGRAM (ILLIMITÉE) ---
function notifyTelegram() {
    const token = "6513521378:AAGdb0VWlfwfoqXd0nDGfQNbNj4XFF2Xnjs"; 
    const chatId = "6762307554"; 
    
    fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .then(data => {
            const msg = `🚀 Nouvelle visite !\n📍 Ville : ${data.city || '?'}\n🌍 Pays : ${data.country_name || '?'}\n📱 Appareil : ${navigator.userAgent.slice(0, 30)}...`;
            fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(msg)}`);
        })
        .catch(() => {
            // Secours si la localisation échoue
            fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=🚀 Un visiteur est sur ton portfolio !`);
        });
}
