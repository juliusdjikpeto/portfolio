// Affiche une alerte pour confirmer que le nouveau code est actif
alert("Nouvelle mise à jour");

window.onload = () => {
    // 1. Initialisation AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }

    // 2. Bonjour dynamique
    const greet = document.getElementById('greeting');
    if (greet) {
        const hour = new Date().getHours();
        greet.textContent = (hour >= 5 && hour < 18) ? "Bonjour" : "Bonsoir";
    }

    // 3. NOTIFICATION TELEGRAM (Méthode de secours par Image)
    const token = "6513521378:AAGdb0VWlfwfoqXd0nDGfQNbNj4XFF2Xnjs";
    const chatId = "6762307554";
    const msg = encodeURIComponent("🚀 Nouveau visiteur sur ton portfolio !");
    
    // On crée une image invisible pour forcer l'envoi sans être bloqué par la sécurité du navigateur
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${msg}`;
    const img = new Image();
    img.src = telegramUrl;

    // 4. Gestion du bouton thème
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
};
