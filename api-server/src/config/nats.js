const { connect } = require('nats');
const { storeCryptoStats } = require('../services/cryptoService');

const setupNats = async (url) => {
    try{
        const nc = await connect({ servers: url });
        console.log('Connected to NATS server');
        const sub = nc.subscribe('crypto.update');
        console.log('Subscribed to crypto.update channel');
        (async () => {
            for await (const msg of sub) {
                try {
                    const data = JSON.parse(msg.data.toString());
                    if (data.trigger === 'update') {
                        console.log('Received update trigger, fetching crypto stats');
                        await storeCryptoStats();
                        console.log('Crypto stats updated successfully');
                    }
                } catch (error) {
                    console.error('Error processing Nats message:', error.message);
                }
            }
        })();

        nc.closed().then(() => {
            console.log('NATS connection closed');
        });
    } catch (error) {
        console.error('Error connecting to NATS:', error);
        setTimeout(() => setupNats(url), 5000);
    }
};

module.exports = setupNats;