'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convert = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    try {
      const [initNum, initUnit] = convert.splitInput(req.query.input);
      const returnNum = convert.convert(initNum, initUnit);
      const returnUnit = convert.getReturnUnit(initUnit);
      const string = convert.getString(initNum, initUnit, returnNum, returnUnit);
      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string,
      });
    } catch (err) {
      res.send(err.message);
    }
  });
};
