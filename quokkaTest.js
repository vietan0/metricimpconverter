class ConvertHandler {
  constructor() {
    this.regex = /^(\d+(\.\d+)?)(\/(\d+(\.\d+)?))?[a-z]+$/gi;
    this.numRegex = /^(\d+(\.\d+)?)(\/(\d+(\.\d+)?))?(?=([a-z]+$)|$)/gi;
    this.unitRegex = /(?<=(^(\d+(\.\d+)?)(\/(\d+(\.\d+)?))?)?)[a-z]+$/gi;
    this.unitTable = {
      gal: { pair: 'L', spelled: 'gallons' },
      l: { pair: 'gal', spelled: 'liters' },
      mi: { pair: 'km', spelled: 'miles' },
      km: { pair: 'mi', spelled: 'kilometers' },
      lbs: { pair: 'kg', spelled: 'pounds' },
      kg: { pair: 'lbs', spelled: 'kilograms' },
    };
    this.unitList = Object.keys(this.unitTable);
  }

  matchNum(input) {
    return input.match(this.numRegex);
  }
  matchUnit(input) {
    return input.match(this.unitRegex);
  }

  getNum(input) {
    let numInString = this.matchNum(input) && this.matchNum(input)[0]; // string or null
    if (this.matchUnit(input) && this.matchNum(input) === null) {
      // has unit and
      if (!/\d/g.test(input)) return 1; // no number
      else throw new Error(`invalid number`); // invalid number
    }
    if (numInString) {
      if (numInString.includes('/')) {
        const [numerator, denominator] = numInString.split('/');
        return parseFloat(numerator) / parseFloat(denominator);
      } else return parseFloat(numInString);
    } else throw new Error(`invalid number`);
  }

  getUnit(input) {
    const lowerCasedInput = input.toLowerCase();
    if (
      this.matchUnit(lowerCasedInput) &&
      this.unitList.includes(this.matchUnit(lowerCasedInput)[0])
    ) {
      const unit = this.matchUnit(input)[0];
      return unit.match(/^l$/i) ? 'L' : unit.toLowerCase();
    } else throw new Error(`invalid unit`);
  }

  splitInput(input) {
    // return [num, unit] or
    // error messages: `invalid input`, `invalid unit` or `invalid input and unit`
    const result = [];
    let errors = [];
    try {
      const num = this.getNum(input);
      result.push(num);
    } catch (err) {
      errors.push(err.message);
    }

    try {
      const unit = this.getUnit(input);
      result.push(unit);
    } catch (err) {
      errors.push(err.message);
    }

    if (errors.length === 0) return result;
    if (errors.length === 1) throw new Error(errors[0]);
    if (errors.length === 2) throw new Error('invalid number and unit');
  }

  getReturnUnit(initUnit) {
    return this.unitTable[initUnit.toLowerCase()].pair;
  }

  spellOutUnit(initUnit) {
    return this.unitTable[initUnit.toLowerCase()].spelled;
  }

  convert(initNum, initUnit) {
    const galToL = 3.78541;
    const miToKm = 1.60934;
    const lbsToKg = 0.453592;

    if (initUnit === 'gal') return Number((initNum * galToL).toFixed(5));
    if (initUnit === 'L') return Number((initNum / galToL).toFixed(5));
    if (initUnit === 'mi') return Number((initNum * miToKm).toFixed(5));
    if (initUnit === 'km') return Number((initNum / miToKm).toFixed(5));
    if (initUnit === 'lbs') return Number((initNum * lbsToKg).toFixed(5));
    if (initUnit === 'kg') return Number((initNum / lbsToKg).toFixed(5));
  }

  getString(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(
      initUnit,
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  }
}

let converter = new ConvertHandler();

try {
  const [initNum, initUnit] = converter.splitInput('3l');
  const returnNum = converter.convert(initNum, initUnit);
  const returnUnit = converter.getReturnUnit(initUnit);
  const string = converter.getString(initNum, initUnit, returnNum, returnUnit);
  console.dir({
    initNum,
    initUnit,
    returnNum,
    returnUnit,
    string,
  });
} catch (err) {
  console.log(err.message);
}
