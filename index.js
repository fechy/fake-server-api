const express = require('express');
const app = express();
const port = process.env.PORT || 8080; // If changed, it should also be changed in the server

// Web GUI
app.get('/', (request, response) => {
    response.send('working!');
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
});