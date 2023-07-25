const mongoose = require("mongoose");

const Izdavac_Schema = new mongoose.Schema({
    izdavac_id: {
        type: Number,
        required: true,
        unique: true
    },
    naziv_izdavaca: {
        type: String,
        required: true,
        unique: true
    }
},{versionKey: false}
)

const Izdavac = mongoose.model(
    "Izdavac",
    Izdavac_Schema,
    "izdavac"
)

module.exports = Izdavac;