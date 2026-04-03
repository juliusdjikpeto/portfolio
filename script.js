// On attend que TOUT soit chargé (HTML + Bibliothèques externes)
window.onload = () => {
    
    // 1. Initialisation d'AOS (Réveille tes photos et tes cartes)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // 2. Message de bienvenue
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) greetingElement.textContent = "Bonjour";
        else if (hour >= 12 && hour < 18) greetingElement.textContent = "Bon après-midi";
        else greetingElement.textContent = "Bonsoir";
    }

    // 3. Notification Telegram
    if (!sessionStorage.getItem('visited')) {
        const token = "6513521378:AAGdb0VWlfwfoqXd0nDGfQNbNj4XFF2Xnjs"; 
        const chatId = "6762307554"; 
        
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                const msg = `🚀 Visiteur sur ton Portfolio !\n📍 Ville : ${data.city || '?'}\n🌍 Pays : ${data.country_name || '?'}`;
                fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(msg)}`);
            })
            .catch(() => {
                fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=🚀 Nouveau visiteur !`);
            });
        
        sessionStorage.setItem('visited', 'true');
    }
};
