window.onload = () => {
    // 1. INITIALISATION DES ANIMATIONS (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // 2. BONJOUR / BON APRÈS-MIDI / BONSOIR (CORRIGÉ)
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

   // 4. NOTIFICATION SÉCURISÉE VIA VERCEL
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const agent = navigator.userAgent;
            const platform = navigator.platform;

            // On prépare le message
            const message = encodeURIComponent(
                `🚀 Nouvelle visite !\n` +
                `📍 Ville : ${data.city || '?'}\n` +
                `🌍 Pays : ${data.country_name || '?'}\n` +
                `🌐 IP : ${data.ip || '?'}\n` +
                `--------------------------\n` +
                `💻 Système : ${platform}\n` +
                `📱 Signature : ${agent.slice(0, 60)}...`
            );

            // ON APPELLE VERCEL (Remplace par ton URL si elle change)
            const vercelUrl = `https://portfolio-lilac-six-60.vercel.app/api/envoi?msg=${message}`;

            fetch(vercelUrl)
                .then(() => console.log("Notification sécurisée envoyée !"))
                .catch(err => console.error("Erreur de transmission :", err));
        });
