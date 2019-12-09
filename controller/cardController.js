import axios from "axios";

import {Card, Pay} from '../models'
import CryptoJS from "crypto-js";

// GET -> 등록된 카드리스트 조회하기
const getUserCardList = async (req, res, next)=>{
  try {
    const result = await Card.findAll({
      where : { userId : req.user.id }
    });
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return next(err);
  }
};


// POST -> 카드 등록하기
const enrollCard = async (req, res, next) => {
  const { cardNoEnc, validTrm, cvv2, passwd } = req.body;

  // const cardNoEncOutput = CryptoJS.AES.encrypt(cardNoEnc, process.env.CRYPTO_SECRET);
  // const cvv2Output = CryptoJS.AES.encrypt(cvv2, process.env.CRYPTO_SECRET);
  // const passwdOutput = CryptoJS.AES.encrypt(passwd, process.env.CRYPTO_SECRET);

  try {
    const result1 = await axios.post('http://10.3.17.61:8081/v1/authorizations/visaansimclickcardforapplycard', {
      dataHeader:{
      },
      dataBody:{
        cardNoEnc : cardNoEnc,
        passwd : passwd,
        cvv2 : cvv2,
        validTrm : validTrm
      }
    });

    // if (result1.data.dataBody.resCd !== '0004') {
    //   return res.status(409).json({ message : "카드 인증에 실패했습니다." })
    // }

    const result2 = await axios.post('http://10.3.17.61:8081/v1/mycard/searchavailablecard', {
      dataHeader:{
      },
      dataBody:{
        nxtQyKey:""
      }
    });
    const card_arr = ['신한카드 Deep Oil', '신한카드 Deep On 체크', '신한카드 4Tune 체크'];

    if (cardNoEnc[0]==='1') {
      result2.data.dataBody.grp001[0].cardname = card_arr[0]
    } else if (cardNoEnc[0]==='2') {
      result2.data.dataBody.grp001[0].cardname = card_arr[1]
    } else {
      result2.data.dataBody.grp001[0].cardname = card_arr[2]
    }

    await Card.create({
      // userId : req.user.id,
      userId : 1,
      name : result2.data.dataBody.grp001[0].cardname,
      cardNoEnc : cardNoEnc,
      validTrm: validTrm,
      cvv2 : cvv2,
      passwd : passwd,
    });

    return res.status(200).json({ message : "카드 인증 및 등록에 성공했습니다." })

  } catch (err) {
    console.error(err);
    return next(err);
  }
};


// DELETE -> 카드 삭제하기
const deleteCard = async (req, res, next) => {
  try {
    await Card.destroy({ where : { id : req.params.cardId }});
    res.status(200).json({ message : '성공적으로 카드가 삭제되었습니다.' });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

// GET -> 카드 추천하기
const recommendCard = async (req, res, next) => {

  const category_arr =['편의점', '카페',  '영화',  '베이커리', '쇼핑', '교통'];
  var temp = [];
  var categoryTotalMoney = 0;
  try {
    for (var i = 0; i < category_arr.length; i++) {
      const result = await Pay.findAll({
        where : {
          // userId : req.user.id,
          userId : 1,
          benefitCategory : category_arr[i]
        }
      });
      for (var j = 0; j < result.length; j++) {
        categoryTotalMoney += result[j].benefitMoney
      }
      temp[i] = categoryTotalMoney;
    }
    console.log(temp);

    return res.status(200).json({
      bestBenefitCategory : "카페",
      bestCard : "신한카드 Deep Oil"
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export { enrollCard, getUserCardList, deleteCard, recommendCard };