const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const positionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    category: {
        req: 'categories',
        type: Schema.Types.ObjectId
    },
    user: {
        req: 'users',
        type: Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('position', positionSchema);