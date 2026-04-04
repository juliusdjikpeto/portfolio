// Affiche une alerte pour confirmer que le nouveau code est actif
alert("Nouvelle mise à joue");

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

    // 4. LOCALISATION ET TYPE D'APPAREIL
    const token = "6513521378:AAGdb0VWlfWfoqXdOnDGfQNbNj4XFF2Xnjs";
    const chatId = "6762307554";

    // Fonction pour simplifier le nom de l'appareil
    const getDeviceType = () => {
        const ua = navigator.userAgent;
        if (/tablet|ipad|playbook|silk/i.test(ua)) return "Tablette";
        if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "Mobile";
        return "Ordinateur";
    };

    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const city = data.city || "Ville inconnue";
            const country = data.country_name || "Pays inconnu";
            const device = getDeviceType();
            
            const message = encodeURIComponent(
                `🚀 Nouvelle visite !\n` +
                `📍 Ville : ${city}\n` +
                `🌍 Pays : ${country}\n` +
                `📱 Appareil : ${device}\n` +
                `🌐 IP : ${data.ip || 'Inconnue'}`
            );

            fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${message}`);
        })
        .catch(() => {
            fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent("🚀 Visiteur détecté (" + getDeviceType() + ")")}`);
        });
};


