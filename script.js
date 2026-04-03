window.onload = () => {
    // 1. Initialisation des animations (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }

    // 2. Bonjour dynamique
    const greet = document.getElementById('greeting');
    if (greet) {
        const hour = new Date().getHours();
        greet.textContent = (hour >= 5 && hour < 18) ? "Bonjour" : "Bonsoir";
    }

    // 3. Notification Telegram immédiate
    const token = "6513521378:AAGdb0VWlfwfoqXd0nDGfQNbNj4XFF2Xnjs";
    const chatId = "6762307554";
    const msg = "🚀 Un visiteur est sur ton portfolio !";

    fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(msg)}`)
    .then(() => console.log("Bot notifié !"))
    .catch(err => console.error("Erreur bot:", err));

    // 4. Gestion du bouton thème
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.onclick = () => {
            document.body.classList.toggle('light-theme');
            const icon = document.getElementById('theme-icon');
            if(icon) icon.classList.toggle('fa-sun');
            if(icon) icon.classList.toggle('fa-moon');
        };
    }
};
