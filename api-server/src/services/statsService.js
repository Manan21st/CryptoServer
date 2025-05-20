const CryptoStat = require('../models/cryptoStat');
const calculateDeviation = require('../utils/calculateDeviation');
const { SUPPORTED_COINS } = require('./cryptoService');

// function to get the stats for a coin
const getLatestStats = async (coin) => {
    if (!SUPPORTED_COINS.includes(coin)) {
        throw new Error(`Unsupported coin, ${coin}`);
    }

    const latestStat = await CryptoStat.findOne({ coin }).sort({ timestamp: -1 }).lean();
    if (!latestStat) {
        throw new Error(`No stats found for coin: ${coin}`);
    }

    return {
        price: latestStat.price,
        marketCap: latestStat.marketCap,
        "24hChange": latestStat.change24h,
    };
};


const getPriceDeviation = async (coin) => {
    if (!SUPPORTED_COINS.includes(coin)) {
        throw new Error(`Unsupported coin, ${coin}`);
    }

    const stats = await CryptoStat.find({ coin }).sort({ timestamp: -1 }).limit(100).select('price').lean();
    if (stats.length === 0) {
        throw new Error(`No stats found for coin: ${coin}`);
    }

    const prices = stats.map(stat => stat.price);
    const deviation = calculateDeviation(prices);

    return deviation;
};


module.exports = {
    getLatestStats,
    getPriceDeviation,
};