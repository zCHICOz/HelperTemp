const express = require('express');
const app = express();
let port = process.env.PORT || 8080;

app.use(express.static('src'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

app.listen(port);