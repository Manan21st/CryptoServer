const mongoose = require('mongoose');

const cryptoStatSchema = new mongoose.Schema({
    coin: {
        type: String,
        required: true,
        enum: ['bitcoin', 'ethereum', 'matic-network']
    },
    price: {
        type: Number,
        required: true
    },
    marketCap: {
        type: Number,
        required: true
    },
    change24h: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const CryptoStat = mongoose.model('CryptoStat', cryptoStatSchema);

module.exports = CryptoStat;