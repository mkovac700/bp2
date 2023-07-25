const mongoose = require("mongoose");

const Platforma_Schema = new mongoose.Schema({
    platforma_id: {
        type: Number,
        required: true,
        unique: true
    },
    naziv_platforme: {
        type: String,
        required: true,
        unique: true
    }
},{versionKey: false}
)

const Platforma = mongoose.model(
    "Platforma",
    Platforma_Schema,
    "platforma"
)

module.exports = Platforma;