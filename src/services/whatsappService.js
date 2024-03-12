const axios = require('axios');
require('dotenv').config();

const SendMessageWhatsapp = async (data, messageId, numberId) => {
    const url = `https://graph.facebook.com/v18.0/${numberId}/messages`;

    try {
        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.WHATSAPP_CLOUD_API_TOKEN}`
            }
        });
        console.log(response.data);

        // Llamar a SetMessageRead si messageId no es nulo
        //if (messageId !== null) {
          //  await SetMessageRead(messageId, numberId);
        //}
    } catch (error) {
        console.error(error);
    }
};

const SetMessageRead = async (messageId, numberId) => {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",    
        "status": "read",
        "message_id": messageId
    })

    const url = `https://graph.facebook.com/v18.0/${numberId}/messages`;

    try {
        await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
                // Asegúrate de reemplazar el token directamente o usar una variable de entorno como en el ejemplo anterior
                "Authorization": `Bearer ${process.env.WHATSAPP_CLOUD_API_TOKEN}`
            }
        });
        console.log("Message status updated to read successfully.");
    } catch (error) {
        console.error("Error updating message status:", error);
    }
};


const SendTemporalMessageWhatsapp = (data, messageId, numberId) => {
    const options = {
        host: "graph.facebook.com",
        path: "/v18.0/" + numberId + "/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.WHATSAPP_CLOUD_API_TOKEN}`
        },
    }
    const req = https.request(options, res => {
        res.on("data", d => {
            process.stdout.write(d);
            if (messageId !== null) {
                SetTemporalMessageRead(messageId, numberId)
            }
        });
    })

    req.on("error", error => {
        console.error(error)
    })

    req.write(data)
    req.end()
}

const SetTemporalMessageRead = (messageId, numberId) => {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "status": "read",
        "message_id": messageId
    })
    const options = {
        host: "graph.facebook.com",
        path: "/v18.0/" + numberId + "/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.WHATSAPP_CLOUD_API_TOKEN}`
        },
    }
    const req = https.request(options, res => {
        res.on("data", d => {
            process.stdout.write(d);
        });
    })

    req.on("error", error => {
        console.error(error)
    })

    req.write(data)
    req.end()
}

const SendChainMessageWhatsapp = async (data, messageId, numberId) => {
    const options = {
        host: "graph.facebook.com",
        path: `/v18.0/${numberId}/messages`,
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.WHATSAPP_CLOUD_API_TOKEN}`
        },
    };

    // Aquí promisificamos la solicitud para poder usarla con async/await.
    const response = await new Promise((resolve, reject) => {
        const req = https.request(options, res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                resolve({ statusCode: res.statusCode, body: data });
            });
        });

        req.on('error', error => {
            reject(error);
        });

        req.write(data);
        req.end();
    });

    // Procesamos la respuesta.
    if (response.statusCode === 200) {
        //console.log('Mensaje enviado exitosamente:', response.body);
        if (messageId !== null) {
            // Si SetMessageRead es también una función asíncrona, no olvides añadir 'await' delante de ella.
            SetMessageRead(messageId, numberId);
        }
    } else {
        console.error('Error al enviar el mensaje:', response.statusCode, response.body);
    }
};

module.exports = {
    SendMessageWhatsapp,
    SetMessageRead,
    SendTemporalMessageWhatsapp,
    SetTemporalMessageRead,
    SendChainMessageWhatsapp
}