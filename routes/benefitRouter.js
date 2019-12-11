import express from 'express';
import { getAllTotalBenefit, getEachTotalBenefit } from '../controller/benefitController'

const router = express.Router();

// 전체 카드의 전체 혜택 총 누적 금액 (이번 달)
router.get('/getAllBenefit', getAllTotalBenefit);


// 전체 카드의 카테고리별 혜택 총 누적 금액 (이번 달)
router.get('/getEachBenefit', getEachTotalBenefit);


module.exports = router;
