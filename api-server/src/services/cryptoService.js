const axios = require('axios');
const CryptoStat = require('../models/cryptoStat');
const SUPPORTED_COINS = ['bitcoin', 'ethereum', 'matic-network'];
const CoinGeckoEndpoint = 'https://api.coingecko.com/api/v3/coins/markets'

const storeCryptoStats = async () => {
    try{
        console.log('Fetching crypto stats from CoinGecko API');
        const response = await axios.get(CoinGeckoEndpoint, {
            params: {
                vs_currency: 'usd',
                ids: SUPPORTED_COINS.join(','),
                order: 'market_cap_desc',
                per_page: 100,
                page: 1,
                sparkline: false,
                price_change_percentage: '24h'
            }
        });

        if (!response.data || response.data.length === 0) {
            throw new Error('No data received from CoinGecko API');
        }

        const promises = response.data.map(async (coin) => {
            const cryptoStat = new CryptoStat({
                coin: coin.id,
                price: coin.current_price,
                marketCap: coin.market_cap,
                change24h: coin.price_change_percentage_24h || 0
            });

            console.log(`Saving stats for ${coin.id}`);

            return cryptoStat.save();
        });
        
        const savedData = await Promise.all(promises);
        console.log('Crypto stats saved successfully');
        return savedData;
    } catch (error) {
        console.error('Error fetching or saving crypto stats:', error.message);
        throw error;
    }
};

module.exports = {
    storeCryptoStats,
    SUPPORTED_COINS
};