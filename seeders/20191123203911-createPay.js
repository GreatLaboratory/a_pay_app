'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let datas = [];

    for (let i = 0; i < 20; i++) {
        const store = ["스타벅스", "이디야", "카페베네", "커피빈"];
        let obj = {
          userId: 1,
          cardId: 1,
          payMoney: 15000,
          monthPayment: 50000 + 15000*i,
          benefitCategory: "카페",
          benefitStoreName: store[i%4],
          benefitMoney: 1500,
          monthBenefit: 10000 + 1500*i,
          createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        };
        datas.push(obj)
    }

    return queryInterface.bulkInsert('pay', datas, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
