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
    // 만일 (모바일, 로컬환경) 접속해서 origin이 없는 경우
    if (!origin) return callback(null, true); // cors 허용

    if (whiteList.indexOf(origin) !== -1) {
      // 만일 whitelist 배열에 origin인자가 있을 경우
      callback(null, true); // cors 허용
    } else {
      callback(new Error('Not Allowed Origin!')); // cors 비허용
    }
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
