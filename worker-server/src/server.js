require('dotenv').config();

const { connect } = require('nats');
const cron = require('node-cron');

const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';

const start = async () => {
    try {
        const nc = await connect({ servers: NATS_URL });
        console.log('Worker connected to NATS server');
        cron.schedule('* * * * *', async () => {
            const msg = { trigger: 'update'};
            nc.publish('crypto.update', JSON.stringify(msg));
            console.log('Published message to crypto.update channel', new Date().toISOString());
        });
    }
    catch (error) {
        console.error('Failed connecting to NATS:', error);
    }
};

start();

module.exports = start;