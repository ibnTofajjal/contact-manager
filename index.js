const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');

connectDb();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

const contactRoutes = require('./routes/contactRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
