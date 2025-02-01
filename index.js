var express = require('express');
var app = module.exports = express();

app.get('/', (req, res) =>{
    res.send('Hello World');
});

app.get('/heartbeat', (req, res) =>{
    res.json({status: 200, data: `Gaming Backlog service - ${new Date().toLocaleString()}`});
});

if (!module.parent) {
  app.listen(3000);
  console.log('Gaming Backlog service started on port 3000...');
};