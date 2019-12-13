'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let datas = [];

      for(let j = 0; j < 2; j++) {
        const cardname_arr = ["신한카드 Deep Oil", "신한카드 Deep On 체크"];
        let obj = {
          userId: 1,
          name: cardname_arr[j],
          cardNoEnc: "1324-7894-4612-7665",
          validTrm: "201910",
          cvv2: "454",
          passwd: "4567",
          createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
          updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        };
        datas.push(obj)
      }

    return queryInterface.bulkInsert('card', datas, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('card', null, {});
  }
};
