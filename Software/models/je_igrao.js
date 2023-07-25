const mongoose = require("mongoose");

const Je_Igrao_Schema = new mongoose.Schema({
    korisnik_videoigra_id: {
        type: Number,
        ref: "Korisnik_Videoigra.korisnik_videoigra_id",
        required: true,
        unique: true
    },
    zadnji_datum: {
        type: Date
    },
    broj_sati: {
        type: Number
    }
},{versionKey: false}
)

const Je_Igrao = mongoose.model(
    "Je_Igrao",
    Je_Igrao_Schema,
    "je_igrao"
)

module.exports = Je_Igrao;