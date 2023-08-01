const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { mongooseConnect } = require('./database/shop');

require('dotenv').config();

const app = express();
const api = require('./routes/api');
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://486-shoe.shop'],
    credential: true,
  })
);

app.use('/api', api);

mongooseConnect(() => {
  app.listen(PORT, async () => {
    console.log(`app listening on http://localhost:${PORT}`);
  });
});
