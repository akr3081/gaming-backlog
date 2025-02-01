const express = require('express');
const app = express();

app.get('/', (req, res) =>{
    res.json({status: 200, data: 'Hello World'});
});

app.get('/heartbeat', (req, res) =>{
    res.json({status: 200, data: `Gaming Backlog service - ${new Date().toLocaleString()}`});
});

app.listen(3000, () => console.log('Gaming Backlog service started on port 3000...'));
module.exports = app;