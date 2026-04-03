// --- 1. GESTION DU MESSAGE DE BIENVENUE ---
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

// --- 2. NOTIFICATION TELEGRAM ---
function notifyTelegram() {
    const token = "6513521378:AAGdb0VWlfwfoqXd0nDGfQNbNj4XFF2Xnjs"; 
    const chatId = "6762307554"; 

    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const message = `🚀 Visiteur sur ton Portfolio !\n📍 Ville : ${data.city || 'Inconnue'}\n🌍 Pays : ${data.country_name || 'Inconnu'}\n📱 Appareil : ${navigator.userAgent.slice(0, 40)}...`;
            const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
            fetch(url);
        })
        .catch(() => {
            const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=🚀 Quelqu'un consulte ton portfolio !`;
            fetch(url);
        });
}

// --- 3. LANCEMENT DES FONCTIONS ---
document.addEventListener('DOMContentLoaded', () => {
    // On met à jour le texte Bonjour/Bonsoir
    updateGreeting();
    
    // On envoie la notification Telegram une seule fois par session
    if (!sessionStorage.getItem('visited')) {
        notifyTelegram();
        sessionStorage.setItem('visited', 'true');
    }
});
