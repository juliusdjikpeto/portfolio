window.onload = () => {
    // 1. INITIALISATION DES ANIMATIONS (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // 2. BONJOUR / BON APRÈS-MIDI / BONSOIR (Basé sur TON heure locale)
    const greet = document.getElementById('greeting');
    if (greet) {
        const hour = new Date().getHours();
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
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            // On construit le texte avec des backticks (`) pour garder les sauts de ligne
            const text = `🚀 Nouvelle visite !

📍 Ville : ${data.city || 'Inconnue'}
🌍 Pays : ${data.country_name || 'Inconnu'}
🌐 IP : ${data.ip || '?'}


--------------------------
💻 Système : ${navigator.platform}
📱 Signature : ${navigator.userAgent.slice(0, 50)}...`;

            // On encode TOUT le texte d'un coup. 
            // Cela transforme les sauts de ligne en code compréhensible par Telegram (%0A)
            const message = encodeURIComponent(text);

            // URL de TA fonction Vercel (Vérifie bien que c'est le bon lien lilac-six-60)
            const vercelUrl = `https://portfolio-lilac-six-60.vercel.app/api/envoi?msg=${message}`;

            fetch(vercelUrl)
                .then(() => console.log("Notification envoyée avec succès !"))
                .catch(err => console.error("Erreur d'envoi vers Vercel :", err));
        })
        .catch(err => {
            console.error("Erreur de localisation :", err);
            const fallbackMsg = encodeURIComponent("🚀 Visiteur détecté (Localisation bloquée)");
            fetch(`https://portfolio-lilac-six-60.vercel.app/api/envoi?msg=${fallbackMsg}`);
        });
};
