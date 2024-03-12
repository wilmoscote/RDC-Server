const TextPlain = (text, number) => {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "text",
        "text": {
            "preview_url": false,
            "body": text
        }
    })
    return data
}

module.exports = {
    TextPlain
}