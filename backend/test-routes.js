// Test script to check if audio routes are loaded correctly
require('dotenv').config();
const express = require('express');
const audioRoutes = require('./src/routes/audio.routes');

const app = express();
app.use('/api/audio', audioRoutes);

// List all routes
function listRoutes(app) {
    const routes = [];
    app._router.stack.forEach((middleware) => {
        if (middleware.route) {
            routes.push({
                path: middleware.route.path,
                methods: Object.keys(middleware.route.methods).join(', ')
            });
        } else if (middleware.name === 'router') {
            middleware.handle.stack.forEach((handler) => {
                if (handler.route) {
                    routes.push({
                        path: '/api/audio' + handler.route.path,
                        methods: Object.keys(handler.route.methods).join(', ')
                    });
                }
            });
        }
    });
    return routes;
}

console.log('Audio Routes Registered:');
console.log(JSON.stringify(listRoutes(app), null, 2));
