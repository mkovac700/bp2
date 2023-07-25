const mongoose = require("mongoose");

const Recenzija_Schema = new mongoose.Schema({
    korisnik_videoigra_id: {
        type: Number,
        ref: "Korisnik_Videoigra.korisnik_videoigra_id",
        required: true,
        unique: true
    },
    opis_recenzije: {
        type: String,
        required: true
    },
    preporuka: {
        type: String, 
        enum: ["DA", "NE"], 
        required: true, 
        uppercase: true
    } 
},{versionKey: false}
)

const Recenzija = mongoose.model(
    "Recenzija",
    Recenzija_Schema,
    "recenzija"
)

module.exports = Recenzija;