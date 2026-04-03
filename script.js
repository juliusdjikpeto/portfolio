// --- 1. GESTION DU MESSAGE DE BIENVENUE (Bonjour/Bonsoir) ---
function updateGreeting() {
    const greetingElement = document.getElementById('greeting');
    if (!greetingElement) return; // Sécurité si l'élément n'existe pas encore

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
    const token = "6513521378:AAGdb0VWlfWfoqXdOnDGfQNbNj4XFF2Xnjs"; // ⚠️ METS TON TOKEN ICI
    const chatId = "6762307554";   // ⚠️ METS TON ID ICI
    
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const message = `🚀 Visiteur sur ton Portfolio !\n📍 Ville : ${data.city}\n🌍 Pays : ${data.country_name}\n📱 Appareil : ${navigator.userAgent.slice(0, 50)}...`;
            const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
            fetch(url);
        })
        .catch(() => {
            const simpleMessage = "🚀 Quelqu'un consulte ton portfolio !";
            const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(simpleMessage)}`;
            fetch(url);
        });
}

// --- 3. LANCEMENT AU CHARGEMENT ---
window.onload = () => {
    updateGreeting();
    
    // On ne notifie Telegram qu'une fois par session
    if (!sessionStorage.getItem('visited')) {
        notifyTelegram();
        sessionStorage.setItem('visited', 'true');
    }
};