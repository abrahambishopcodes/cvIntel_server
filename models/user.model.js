const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    photo: {
        type: String, required: false
    }
})

module.exports = mongoose.model("User", userSchema); 