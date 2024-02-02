const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: 'Name is required',
            unique: true,
        },
        slug: {
            type: String,
            lowercase: true,
        },
    }
);

module.exports = mongoose.model('Brand', brandSchema);