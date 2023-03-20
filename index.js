const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');

connectDb();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const contactRoutes = require('./routes/contactRoutes');

app.use('/api/contacts', contactRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
