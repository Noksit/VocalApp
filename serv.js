const express = require('express');
const path = require('path');
const app = new express();

app.use('/artyom', express.static(__dirname + '/node_modules/artyom.js/build/'));
app.use(express.static(path.join(__dirname, './')));
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})