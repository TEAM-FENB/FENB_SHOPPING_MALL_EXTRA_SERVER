const router = require('express').Router();

const { authCheck } = require('../middleware/auth');
const { expireCoupon } = require('../middleware/coupon');
const { getCoupon, createUserCoupon } = require('../controllers/coupons');
const { getUser } = require('../controllers/users');
const { getDateAfter } = require('../utils/date');

router.get('/', authCheck, expireCoupon, async (req, res) => {
  // OK!
  const { coupons } = req.locals;

  res.send(coupons);
});

// 쿠폰을 유저에 추가하기
router.post('/:id', authCheck, expireCoupon, async (req, res) => {
  // OK!
  const { email } = req.locals;
  const { id: couponId } = req.params;

  const coupon = await getCoupon(couponId);
  if (!coupon) return res.status(404).send({ message: '요청하신 쿠폰이 없습니다.' });

  const user = await getUser(email);

  if (
    '64a051f8a1df112941c05596' === couponId &&
    getDateAfter(coupon.validDate, user.createdAt).getTime() < new Date().getTime()
  ) {
    // 신규가입 쿠폰을 발급
    return res.status(401).send({ message: '쿠폰 받는 유효기간이 지났습니다.' });
  } else if (coupon.endTime < new Date().getTime()) {
    return res.status(401).send({ message: '쿠폰 받는 유효기간이 지났습니다.' });
  }

  createUserCoupon(email, couponId);

  res.send({ message: '쿠폰이 정상발급되었습니다.' });
});

module.exports = router;
