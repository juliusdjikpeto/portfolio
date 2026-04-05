export default async function handler(req, res) {
    // Récupération du message envoyé par le script.js
    const { msg } = req.query;

    // Récupération des tokens cachés dans Vercel
    const token = process.env.TELEGRAM_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // URL finale pour Telegram
    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${msg}`;
    
    try {
        await fetch(url);
        res.status(200).send("Notification transmise avec succès.");
    } catch (error) {
        res.status(500).send("Erreur lors de la transmission à Telegram.");
    }
}
