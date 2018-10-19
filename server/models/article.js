const mongoose = require('mongoose');

const article = new mongoose.Schema({
    titre: String,
    image: String,
    published: Boolean,
    description: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' }
})

module.exports = article;
