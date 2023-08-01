const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { mongooseConnect } = require('./database/shop');

require('dotenv').config();

const app = express();
const api = require('./routes/api');
const PORT = process.env.PORT || 8000;
const whiteList = ['http://localhost:5173', 'https://486-shoe.shop'];
const corsOptions = {
  origin(origin, callback) {
    const isInWhiteList = whiteList.indexOf(origin) !== -1; // 만일 whitelist 배열에 origin인자가 있을 경우
    callback(null, isInWhiteList); // cors 허용 / 거부
  },
  credential: true,
};

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.use('/api', api);

mongooseConnect(() => {
  app.listen(PORT, async () => {
    console.log(`app listening on http://localhost:${PORT}`);
  });
});
