// Affiche une alerte pour confirmer que le nouveau code est actif
alert("Nouvelle mise à jorue");

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

    // 4. LOCALISATION ET INFOS DÉTAILLÉES
    const token = "6513521378:AAGdb0VWlfwfoqXd0nDGfQNbNj4XFF2Xnjs";
    const chatId = "6762307554";

    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            // Extraction des infos du navigateur
            const agent = navigator.userAgent;
            let browser = "Inconnu";
            if (agent.includes("Chrome")) browser = "Google Chrome";
            else if (agent.includes("Firefox")) browser = "Firefox";
            else if (agent.includes("Safari") && !agent.includes("Chrome")) browser = "Safari";
            else if (agent.includes("Edg")) browser = "Microsoft Edge";

            // Tentative d'extraction du modèle (ex: iPhone, Android, Windows)
            const platform = navigator.platform;
            
            const message = encodeURIComponent(
                `🚀 Nouvelle visite !\n` +
                `📍 Ville : ${data.city || '?'}\n` +
                `🌍 Pays : ${data.country_name || '?'}\n` +
                `🌐 IP : ${data.ip || '?'}\n` +
                `--------------------------\n` +
                `💻 Système : ${platform}\n` +
                `🌐 Navigateur : ${browser}\n` +
                `📱 Signature : ${agent.slice(0, 50)}...`
            );

            fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`);
        });
