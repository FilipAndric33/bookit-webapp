require('dotenv').config();
const express = require ('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const path = require('path');


app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());

const connectDB = async () => {
    try {
        (mongoose).connect(process.env.dbURI);
        console.log('connected.');
    } catch (err) {
        console.error(err);
    };
};

connectDB().then(result => app.listen(4000, () => {
    console.log('listening on port 4k');
})); 

app.use('/api', routes);