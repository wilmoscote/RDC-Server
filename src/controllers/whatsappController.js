class WhatsappController {
    constructor(number) {
        this.number = number;
    }

    async newConversation() {
        const newConversation = new Conversation();
        newConversation.number = this.number
        newConversation.secuence = 1
        await newConversation.save()
    }

    updateConversation(secuence) {
        Conversation.findOneAndUpdate({ number: this.number }, { $set: { secuence: secuence, updatedat: new Date().toLocaleString('es-CO') } }, (error) => {
            if (error) {
                console.error(error);
            }
        });
    }

}

module.exports = WhatsappController