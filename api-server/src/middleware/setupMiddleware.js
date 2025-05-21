const express = require('express');
const cors = require('cors');

function setupMiddleware(app) {
    app.use(cors());
    app.use(express.json());
}

module.exports = setupMiddleware;