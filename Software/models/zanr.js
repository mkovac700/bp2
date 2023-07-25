const mongoose = require("mongoose");

const Zanr_Schema = new mongoose.Schema({
    zanr_id: {
        type: Number,
        required: true,
        unique: true
    },
    oznaka: {
        type: String,
        required: true,
        unique: true
    }
},{versionKey: false}
)

const Zanr = mongoose.model(
    "Zanr",
    Zanr_Schema,
    "zanr"
)

module.exports = Zanr;