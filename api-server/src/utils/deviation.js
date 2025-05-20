// this function calculates the deviation of a list of prices
const calculateDeviation = (prices) => {
    if (!prices || prices.length === 0) {
        return 0;
    }

    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;

    const variance = prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;

    const standardDeviation = Math.sqrt(variance);

    return standardDeviation;
};

module.exports = calculateDeviation;