import { Pay } from '../models'

// GET -> 전체 카드의 전체 혜택 총 누적 금액 (이번 달)
const getAllTotalBenefit = async (req, res, next) => {

    try {
        const result = await Pay.findOne({
            order : [["id", "DESC"]],
            limit : 1
            // createdAt: {between: [Date.parse(startDate), Date.parse(endDate)]}
        });
        const totalBenefit = result.monthBenefit;
        return res.status(200).json({ totalBenefit : totalBenefit })
    } catch (err) {
        console.error(err);
        return next(err);
    }
};



// GET -> 전체 카드의 카테고리별 혜택 총 누적 금액 (이번 달)
const getEachTotalBenefit = async (req, res, next) => {
    const { category } = req.query;
    var categoryTotalMoney = 0;
  try {
      const result = await Pay.findAll({
          where : {
              // userId : req.user.id,
              userId : 1,
              benefitCategory : category
          }
      });
      for (var i = 0; i < result.length; i++) {
          categoryTotalMoney += result[i].benefitMoney
      }

      return res.status(200).json({ categoryTotalMoney : categoryTotalMoney });
  } catch (err) {
      console.error(err);
      return next(err);
  }
};


export { getAllTotalBenefit, getEachTotalBenefit }