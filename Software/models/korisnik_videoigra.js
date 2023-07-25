const mongoose = require("mongoose");

const Korisnik_Videoigra_Schema = new mongoose.Schema({
    korisnik_videoigra_id: {
        type: Number,
        required: true,
        unique: true
    },
    korisnik_id: {
        type: String,
        ref: "Korisnik.korisnik_id",
        required: true
    },
    videoigra_id: {
        type: Number,
        ref: "Videoigra.videoigra_id",
        required: true
    },
    datum_dodavanja: {
        type: Date,
        required: true
    }
},{versionKey: false},
)

Korisnik_Videoigra_Schema.index({korisnik_id: 1, videoigra_id: 1},
                                {unique: true})

const Korisnik_Videoigra = mongoose.model(
    "Korisnik_Videoigra",
    Korisnik_Videoigra_Schema,
    "korisnik_videoigra"
)

module.exports = Korisnik_Videoigra;