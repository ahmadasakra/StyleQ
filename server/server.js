const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const connect = require('./config/connectDB');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const apikey = process.env.API_KEY;
const port = process.env.PORT || 3001;

connect();

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ limit: "10000kb", extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.resolve(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.status(200).send("Hello, World!");
});

app.use(`/${apikey}/api/admin`, require('./routes/admin/adminLogin'));
app.use(`/${apikey}/api/auth`, require('./routes/auth'));


app.use(`/${apikey}/appointment`, require('./routes/auth'));


// Catch-all handler to serve the React app for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`server listening at port ${port}`);
});
