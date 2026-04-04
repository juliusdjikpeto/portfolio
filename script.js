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
            if (agent.includes("Chrome
