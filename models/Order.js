const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        req: 'users',
        type: Schema.Types.ObjectId
    },
    date: {
        type: Date,
        default: Date.now,
    },
    order: {
        type: Number,
        required: true
    },
    list: [
        {
            name: {
                type: String
            },
            quantity: {
                type: String
            },
            cost: {
                type: Number
            }
        }
    ],
})

module.exports = mongoose.model('orders', orderSchema);