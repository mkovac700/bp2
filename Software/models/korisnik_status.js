const mongoose = require("mongoose");

const Korisnik_Status_Schema = new mongoose.Schema({
    korisnik_id: {
        type: String,
        ref: "Korisnik.korisnik_id",
        unique: true,
        required: true
    },
    razina: {
        type: Number, 
        required: true
    },
    vidljivost: {
        type: String, 
        enum: ["PRIVATNO", "SAMO-PRIJATELJI", "JAVNO"], 
        required: true, uppercase: true, default: "PRIVATNO"
    }
},{versionKey:false}
)

const Korisnik_Status = mongoose.model(
    "Korisnik_Status",
    Korisnik_Status_Schema,
    "korisnik_status"
)

module.exports = Korisnik_Status;