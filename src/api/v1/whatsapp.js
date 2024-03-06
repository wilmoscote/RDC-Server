const express = require("express");
const router = express.Router();
const WhatsappController = require("../../controllers/whatsappController")
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
        const entry = req.body.entry?.[0];
        const changes = entry.changes?.[0];
        const value = changes.value;
        const messageObject = value.messages;
        const metadata = value.metadata;
        const numberId = metadata.phone_number_id;

        if (Array.isArray(messageObject) && messageObject.length) {
            const messages = messageObject[0];
            
        }

        res.status(200).send("EVENT_RECEIVED");
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

module.exports = router;