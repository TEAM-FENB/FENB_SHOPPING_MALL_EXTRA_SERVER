const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { mongooseConnect } = require('./database/shop');

require('dotenv').config();

const app = express();
const api = require('./routes/api');
const { Product } = require('./models/shop');
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: '*', // 출처 허용 옵션
    credential: 'true', // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
  })
);

app.use('/api', api);

mongooseConnect(() => {
  app.listen(PORT, async () => {
    // await Product.updateMany({}, [
    //   {
    //     $set: {
    //       imgURL: {
    //         $replaceOne: {
    //           input: '$imgURL',
    //           find: 'http://localhost:8000/',
    //           replacement: 'https://486-shop-image.s3.ap-northeast-2.amazonaws.com/',
    //         },
    //       },
    //     },
    //   },
    // ]);

    // await Slide.updateMany({}, [
    //   {
    //     $set: {
    //       imgURL: {
    //         $replaceOne: {
    //           input: '$imgURL',
    //           find: 'http://localhost:8000/',
    //           replacement: 'https://486-shop-image.s3.ap-northeast-2.amazonaws.com/',
    //         },
    //       },
    //     },
    //   },
    // ]);

    console.log(`app listening on http://localhost:${PORT}`);
  });
});
