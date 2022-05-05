const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

const app = express();

dotenv.config({ path: path.resolve(`${__dirname}`, '../vars/config.env') });

//DB connection

const CONNECTION_URL = process.env.CONNECTION_URL.replace(
  '<password>',
  process.env.PASSWORD
);

const PORT = process.env.PORT;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.log(err.message));

// Middlewares

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRoutes);
