const mongoose = require("mongoose");

const Videoigra_Platforma_Schema = new mongoose.Schema({
    videoigra_platforma_id: {
        type: Number,
        required: true,
        unique: true
    },
    videoigra_id: {
        type: Number,
        ref: "Videoigra.videoigra_id",
        required: true
    },
    platforma_id: {
        type: Number,
        ref: "Platforma.platforma_id",
        required: true
    }
},{versionKey: false}
)

Videoigra_Platforma_Schema.index({videoigra_id: 1, platforma_id: 1},
                                 {unique: false})

const Videoigra_Platforma = mongoose.model(
    "Videoigra_Platforma",
    Videoigra_Platforma_Schema,
    "videoigra_platforma"
)

module.exports = Videoigra_Platforma;