const express = require('express');
const path = require('path');
const app = new express();

let port = 3000;

//paths
app.use('/artyom', express.static(`${__dirname}/node_modules/artyom.js/build/`));
app.use(express.static(path.join(__dirname, './')));

//route
app.get('/', function (request, response) {
    response.sendFile(`${__dirname}/index.html`);
});

//start app
app.listen(port, function () {
    console.log(`Example app listening on port ${port} !`)
});