const mongoose = require("mongoose");

const Videoigra_Schema = new mongoose.Schema({
    videoigra_id: {
        type: Number,
        required: true,
        unique: true
    },
    zanr_id: {
        type: Number,
        ref: "Zanr.zanr_id",
        required: true
    },
    izdavac_id: {
        type: Number,
        ref: "Izdavac.izdavac_id",
        required: true
    },
    naziv_igre: {
        type: String,
        required: true,
        unique: true
    }
},{versionKey: false}
)

Videoigra_Schema.index({zanr_id: 1, izdavac_id: 1},
                       {unique: false})

const Videoigra = mongoose.model(
    "Videoigra",
    Videoigra_Schema,
    "videoigra"
)

module.exports = Videoigra;