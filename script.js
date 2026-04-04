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
  // ... (début du code inchangé) ...

fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        // Construction du message avec des vrais sauts de ligne
        const text = `🚀 Nouvelle visite !
📍 Ville : ${data.city || '?'}
🌍 Pays : ${data.country_name || '?'}
🌐 IP : ${data.ip || '?'}
--------------------------
💻 Système : ${navigator.platform}
📱 Signature : ${navigator.userAgent.slice(0, 50)}...`;

        // On encode TOUT le texte d'un coup pour que Telegram comprenne les sauts de ligne
        const message = encodeURIComponent(text);

        const vercelUrl = `https://portfolio-lilac-six-60.vercel.app/api/envoi?msg=${message}`;

        fetch(vercelUrl)
            .then(() => console.log("Message formaté envoyé !"))
            .catch(err => console.error("Erreur :", err));
    });
