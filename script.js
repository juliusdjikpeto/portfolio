// Affiche une alerte pour confirmer que le nouveau code est actif
alert("Nouvelle mise à jou");

window.onload = () => {
    // 1. Initialisation AOS (Animations)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }

    // 2. Bonjour dynamique
    const greet = document.getElementById('greeting');
    if (greet) {
        const hour = new Date().getHours();
        greet.textContent = (hour >= 5 && hour < 18) ? "Bonjour" : "Bonsoir";
    }

    // 3. Gestion du bouton thème
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.onclick = () => {
            document.body.classList.toggle('light-theme');
            const icon = document.getElementById('theme-icon');
            if(icon) {
                icon.classList.toggle('fa-sun');
                icon.classList.toggle('fa-moon');
            }
        };
    }

    // 4. LOCALISATION ET NOTIFICATION TELEGRAM
    const token = "6513521378:AAGdb0VWlfwfoqXd0nDGfQNbNj4XFF2Xnjs";
    const chatId = "6762307554";

    // On récupère les infos de localisation via ipapi (plus fiable)
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const city = data.city || "Ville inconnue";
            const country = data.country_name || "Pays inconnu";
            const ip = data.ip || "IP masquée";
            
            const message = encodeURIComponent(
                `🚀 Nouvelle visite !\n` +
                `📍 Ville : ${city}\n` +
                `🌍 Pays : ${country}\n` +
                `🌐 IP : ${ip}`
            );

            // Envoi à Telegram
            fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`);
        })
        .catch(err => {
            // Si la localisation échoue (bloquée par un VPN ou CSP), on envoie quand même une alerte simple
            fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent("🚀 Visiteur détecté (localisation bloquée)")}`);
        });
};
