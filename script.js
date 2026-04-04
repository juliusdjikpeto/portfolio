window.onload = () => {
    // 1. INITIALISATION DES ANIMATIONS (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // 2. MESSAGE DE BIENVENUE DYNAMIQUE
    const greet = document.getElementById('greeting');
    if (greet) {
        const hour = new Date().getHours();
        greet.textContent = (hour >= 5 && hour < 18) ? "Bonjour" : "Bonsoir";
    }

    // 3. GESTION DU BOUTON DE THÈME (SOMBRE/CLAIR)
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.onclick = () => {
            document.body.classList.toggle('light-theme');
            const icon = document.getElementById('theme-icon');
            if (icon) {
                icon.classList.toggle('fa-sun');
                icon.classList.toggle('fa-moon');
            }
        };
    }

    // 4. RÉCUPÉRATION DES INFOS ET NOTIFICATION TELEGRAM
    const token = "6513521378:AAGdb0VWlfWfoqXdOnDGfQNbNj4XFF2Xnjs"; // Ton token
    const chatId = "6762307554"; // Ton Chat ID

    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            // Analyse du navigateur
            const agent = navigator.userAgent;
            let browser = "Inconnu";
            if (agent.includes("Chrome")) browser = "Google Chrome";
            else if (agent.includes("Firefox")) browser = "Firefox";
            else if (agent.includes("Safari") && !agent.includes("Chrome")) browser = "Safari";
            else if (agent.includes("Edg")) browser = "Microsoft Edge";

            // Analyse de la plateforme (OS / Modèle technique)
            const platform = navigator.platform;

            // Construction du message détaillé
            const message = encodeURIComponent(
                `🚀 Nouvelle visite !\n` +
                `📍 Ville : ${data.city || '?'}\n` +
                `🌍 Pays : ${data.country_name || '?'}\n` +
                `🌐 IP : ${data.ip || '?'}\n` +
                `--------------------------\n` +
                `💻 Système : ${platform}\n` +
                `🌐 Navigateur : ${browser}\n` +
                `📱 Signature : ${agent.slice(0, 60)}...`
            );

            // Envoi à Telegram
            fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`);
        })
        .catch(err => {
            // Secours si la localisation est bloquée
            const fallbackMsg = encodeURIComponent("🚀 Visiteur détecté (Infos de localisation bloquées par le navigateur)");
            fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${fallbackMsg}`);
        });
};
