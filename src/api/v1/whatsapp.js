const express = require("express");
const router = express.Router();
const WhatsappController = require("../../controllers/whatsappController")
const service = require("../../services/whatsappService")
const templates = require("../../models/Messages")
require('dotenv').config();

router.get("/", (req, res) => {
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (challenge && token === process.env.WHATSAPP_ACCESS_TOKEN) {
        res.send(challenge); // Si coincide, se devuelve el challenge.
    } else {
        res.sendStatus(400); // Si no coincide, se devuelve un estado HTTP 400.
    }
});

router.post("/", (req, res) => {
    try {
        console.error("Response: ", req.body);
        const entry = req.body.entry?.[0];
        const changes = entry.changes?.[0];

        const value = changes.value;
        const messageObject = value.messages;
        const metadata = value.metadata;
        const numberId = metadata.phone_number_id;

        if (Array.isArray(messageObject) && messageObject.length) {
            const messages = messageObject[0];
            const number = messages.from;
            const messageId = messages.id;
            const message = messages.text.body.trim();
            service.SendMessageWhatsapp(templates.TextPlain(message, number), messageId, numberId)
        }

        res.status(200).send("EVENT_RECEIVED");
    } catch (e) {
        console.error("Error:", e);
        res.sendStatus(500);
    }
});

module.exports = router;