const mongoose = require('mongoose')
require('dotenv').config();

mongoose.set('strictQuery', false)
mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true
})
    .then(db => {
        console.log("DB Ok")
    })
    .catch(err => console.error(err))