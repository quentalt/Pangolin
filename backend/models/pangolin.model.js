const mongoose = require('mongoose');
const { Schema } = mongoose;

const pangolinSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    },
    city: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

const PangolinModel = mongoose.model('Pangolin', pangolinSchema);

module.exports = { Pangolin: PangolinModel };
