const { getLatestStats, getPriceDeviation } = require('../services/statsService');


const getStats = async (req, res) => {
    try{
        const { coin } = req.query;
        
        if (!coin) {
            return res.status(400).json({ error: 'Coin parameter is required' });
        }
        const stats = await getLatestStats(coin);
        res.json(stats);
    } catch (error) {
        console.error('Error in getStats controller:', error.message);
        res.status(error.message.includes('Invalid coin') ? 400 : 500).json({ error: error.message });
    }
}

const getDeviation = async (req, res) => {
    try{
        const { coin } = req.query;
        if (!coin) {
            return res.status(400).json({ error: 'Coin parameter is required' });
        }
        const deviation = await getPriceDeviation(coin);
        res.json(deviation);
    } catch (error) {
        console.error('Error in getDeviation controller:', error.message);
        res.status(error.message.includes('Invalid coin') ? 400 : 500).json({ error: error.message });
    }
}

module.exports = {
    getStats,
    getDeviation
};