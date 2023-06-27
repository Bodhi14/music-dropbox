const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
    songID: { type: Number, required: true },
    songName: { type: String, required: true },
    songLink: { type: String, required: true },
});


module.exports = mongoose.model("Songs", songSchema);