const { assert } = require('chai');
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  test('convertHandler should correctly read a whole number input', () => {
    assert.strictEqual(convertHandler.getNum('12kg'), 12, "Number of '12kg' should be 12");
  });
  test('convertHandler should correctly read a decimal number input', () => {
    assert.strictEqual(convertHandler.getNum('2.95kg'), 2.95, "Number of '2.95kg' should be 2.95");
  });
  test('convertHandler should correctly read a fractional input', () => {
    assert.strictEqual(convertHandler.getNum('15/50kg'), 0.3, "Number of '15/50kg' should be 0.3");
  });
  test('convertHandler should correctly read a fractional input with a decimal', () => {
    assert.strictEqual(
      convertHandler.getNum('15.32/50.86kg'),
      15.32 / 50.86,
      "Number of '15.32/50.86kg' should be 0.3",
    );
    assert.strictEqual(
      convertHandler.getUnit('15.32/50.86kg'),
      'kg',
      "Unit of '15.32/50.86kg' should be 'kg'",
    );
  });
  test('convertHandler should correctly return an error on a double-fraction', () => {
    assert.throws(() => convertHandler.getNum('3/2/3'), 'invalid number');
  });
  test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', () => {
    assert.strictEqual(convertHandler.getNum('kg'), 1, "Number of 'kg' should be 1");
  });
  test('convertHandler should correctly read each valid input unit', () => {
    assert.strictEqual(convertHandler.getUnit('12gal'), 'gal', "Unit of '12gal' should be 'gal'");
    assert.strictEqual(convertHandler.getUnit('12L'), 'L', "Unit of '12L' should be 'L'");
    assert.strictEqual(convertHandler.getUnit('12mi'), 'mi', "Unit of '12mi' should be 'mi'");
    assert.strictEqual(convertHandler.getUnit('12km'), 'km', "Unit of '12km' should be 'km'");
    assert.strictEqual(convertHandler.getUnit('12lbs'), 'lbs', "Unit of '12lbs' should be 'lbs'");
    assert.strictEqual(convertHandler.getUnit('12kg'), 'kg', "Unit of '12kg' should be 'kg'");
  });
  test('convertHandler should correctly return an error for an invalid input unit', () => {
    assert.throws(() => convertHandler.getUnit('12z'), 'invalid unit');
  });
  test('convertHandler should return the correct return unit for each valid input unit', () => {
    assert.strictEqual(
      convertHandler.getReturnUnit('gal'),
      'L',
      "Return unit of 'gal' should be 'L'",
    );
    assert.strictEqual(
      convertHandler.getReturnUnit('L'),
      'gal',
      "Return unit of 'L' should be 'gal'",
    );
    assert.strictEqual(
      convertHandler.getReturnUnit('mi'),
      'km',
      "Return unit of 'mi' should be 'km'",
    );
    assert.strictEqual(
      convertHandler.getReturnUnit('km'),
      'mi',
      "Return unit of 'km' should be 'mi'",
    );
    assert.strictEqual(
      convertHandler.getReturnUnit('lbs'),
      'kg',
      "Return unit of 'lbs' should be 'kg'",
    );
    assert.strictEqual(
      convertHandler.getReturnUnit('kg'),
      'lbs',
      "Return unit of 'kg' should be 'lbs'",
    );
  });
  test('convertHandler should correctly return the spelled-out string unit for each valid input unit', () => {
    assert.strictEqual(
      convertHandler.spellOutUnit('gal'),
      'gallons',
      "'gal' spelled out should be 'gallons'",
      convertHandler.spellOutUnit('L'),
      'liters',
      "'L' spelled out should be 'liters'",
      convertHandler.spellOutUnit('mi'),
      'miles',
      "'mi' spelled out should be 'miles'",
      convertHandler.spellOutUnit('km'),
      'kilometers',
      "'km' spelled out should be 'kilometers'",
      convertHandler.spellOutUnit('lbs'),
      'pounds',
      "'lbs' spelled out should be 'pounds'",
      convertHandler.spellOutUnit('kg'),
      'kilograms',
      "'kg' spelled out should be 'kilograms'",
    );
  });

  const delta = 0.000001;
  test('convertHandler should correctly convert gal to L', () => {
    assert.approximately(
      convertHandler.convert(12, 'gal'),
      45.42492,
      delta,
      '12gal should be converted to 45.42492L',
    );
  });
  test('convertHandler should correctly convert L to gal', () => {
    assert.approximately(
      convertHandler.convert(45.42492, 'L'),
      12,
      delta,
      '45.42492L should be converted to 12gal',
    );
  });
  test('convertHandler should correctly convert mi to km', () => {
    assert.approximately(
      convertHandler.convert(12, 'mi'),
      19.31208,
      delta,
      '12mi should be converted to 19.31208km',
    );
  });
  test('convertHandler should correctly convert km to mi', () => {
    assert.approximately(
      convertHandler.convert(19.31208, 'km'),
      12,
      delta,
      '19.31208km should be converted to 12mi',
    );
  });
  test('convertHandler should correctly convert lbs to kg', () => {
    assert.approximately(
      convertHandler.convert(12, 'lbs'),
      5.4431,
      delta,
      '12lbs should be converted to 5.4431kg',
    );
  });
  test('convertHandler should correctly convert kg to lbs', () => {
    assert.approximately(
      convertHandler.convert(5.443104, 'kg'),
      12,
      delta,
      '5.443104kg should be converted to 12lbs',
    );
  });
});
