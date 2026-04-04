window.onload = () => {
    // 1. INITIALISATION DES ANIMATIONS (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // 2. LOGIQUE HORAIRE (Basée sur TON navigateur)
    const greet = document.getElementById('greeting');
    if (greet) {
        const hour = new Date().getHours(); // Récupère l'heure de ton appareil
        if (hour >= 5 && hour < 12) {
            greet.textContent = "Bonjour";
        } else if (hour >= 12 && hour < 18) {
            greet.textContent = "Bon après-midi";
        } else {
            greet.textContent = "Bonsoir";
        }
    }

    // 3. GESTION DU BOUTON DE THÈME
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

    // 4. RÉCUPÉRATION DES INFOS ET ENVOI SÉCURISÉ À VERCEL
    // Note : On ne met plus de Token ici, c'est Vercel qui le gère en secret !
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const agent = navigator.userAgent;
            const platform = navigator.platform;

            // On construit le message avec TES données de localisation (data)
            const message = encodeURIComponent(
                `🚀 Nouvelle visite !\n` +
                `📍 Ville : ${data.city || 'Inconnue'}\n` +
                `🌍 Pays : ${data.country_name || 'Inconnu'}\n` +
                `🌐 IP : ${data.ip || '?'}\n` +
                `--------------------------\n` +
                `💻 Système : ${platform}\n` +
                `📱 Navigateur : ${agent.slice(0, 60)}...`
            );

            // URL de TA fonction Vercel (à vérifier sur ton tableau de bord Vercel)
            const vercelUrl = `https://portfolio-lilac-six-60.vercel.app/api/envoi?msg=${message}`;

            fetch(vercelUrl)
                .then(() => console.log("Notification sécurisée envoyée avec succès !"))
                .catch(err => console.error("Erreur d'envoi vers Vercel :", err));
        })
        .catch(err => {
            console.error("Erreur de localisation :", err);
            // Secours si ipapi est bloqué
            const fallbackMsg = encodeURIComponent("🚀 Visiteur détecté (Localisation bloquée)");
            fetch(`https://portfolio-lilac-six-60.vercel.app/api/envoi?msg=${fallbackMsg}`);
        });
};
