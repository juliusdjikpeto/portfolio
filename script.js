window.onload = () => {
    // 1. INITIALISATION DES ANIMATIONS (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }

    // 2. LOGIQUE HORAIRE (Locale au visiteur)
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

    // 4. RÉCUPÉRATION DES INFOS ET ENVOI À VERCEL
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            // On utilise les backticks (`) pour créer un message avec des sauts de ligne réels
            const text = `🚀 Nouvelle visite !

📍 Ville : ${data.city || 'Inconnue'}
🌍 Pays : ${data.country_name || 'Inconnu'}
🌐 IP : ${data.ip || '?'}

--------------------------
💻 Système : ${navigator.platform}
📱 Signature : ${navigator.userAgent.slice(0, 50)}...`;

            // On encode tout le bloc de texte pour préserver la mise en forme
            const message = encodeURIComponent(text);

            // URL de TA fonction Vercel
            const vercelUrl = `https://portfolio-lilac-six-60.vercel.app/api/envoi?msg=${message}`;

            fetch(vercelUrl)
                .then(() => console.log("Notification envoyée !"))
                .catch(err => console.error("Erreur Vercel :", err));
        })
        .catch(err => {
            const fallback = encodeURIComponent("🚀 Visiteur détecté (Infos masquées)");
            fetch(`https://portfolio-lilac-six-60.vercel.app/api/envoi?msg=${fallback}`);
        });
};
