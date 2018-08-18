
const express = require("express");
const path = require('path');
const http = require('http');


const appPath = path.join(__dirname, '/dist');
const app = express();
const port = process.env.PORT || 9999;

var server = http.createServer(app);

app.use(express.static(appPath));

app.get('/', (req, res) => {
    res.render(__dirname + 'index.html');
});


server.listen(port, () => {
    console.log(`Server running on ${port}`);
})