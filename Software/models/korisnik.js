const mongoose = require("mongoose");

const Korisnik_Schema = new mongoose.Schema({
    korisnik_id: {
        type: String, 
        unique: true, 
        required: true
    },
    lozinka: {
        type: String,
        required: true
    },
    nadimak: {
        type: String, 
        required: true
    },
    lokacija: {
        type: String, 
        required: false
    }, 
    br_mobitela: {
        type: String, 
        unique: true, 
        required: false
    },
    email: {
        type: String, 
        unique: true, 
        required: true
    },
},{versionKey: false}
)

const Korisnik = mongoose.model(
    "Korisnik",
    Korisnik_Schema,
    "korisnik"
)

module.exports = Korisnik;