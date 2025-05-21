const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const setupMiddleware = require('./middleware/setupMiddleware');
const statsRoute = require('./routes/statsRoute');
const { storeCryptoStats } = require('./services/cryptoService');
const setupNats = require('./config/nats');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const NATS_URL = process.env.NATS_URL || 'nats://localhost:4222';

setupMiddleware(app);

app.use('/', statsRoute);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

const startServer = async () => {
    try {
        await connectDB();
        console.log('MongoDB connected successfully');

        app.listen(PORT, async ()=> {
            console.log(`Server is running on port ${PORT}`);
            try{
                await storeCryptoStats();
                console.log('Initial crypto stats fetched successfully');
            } catch (error) {
                console.error('Error fetching initial crypto stats:', error.message);
            }
            await setupNats(NATS_URL);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;