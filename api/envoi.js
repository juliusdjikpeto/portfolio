export default async function handler(req, res) {
    const { msg } = req.query;
    const token = process.env.TELEGRAM_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${msg}`;
    
    try {
        await fetch(url);
        res.status(200).send("Sécurisé !");
    } catch (error) {
        res.status(500).send("Erreur");
    }
}
