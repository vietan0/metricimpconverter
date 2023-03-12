const regex = /^(\d+(\.\d+)?)(\/(\d+(\.\d+)?))?[a-z]+$/g;
const matchNum = /^(\d+(\.\d+)?)(\/(\d+(\.\d+)?))?(?=[a-z]+$)/g;
const matchUnit = /(?<=(^(\d+(\.\d+)?)(\/(\d+(\.\d+)?))?)?)[a-z]+$/g;

const str = 'kg';

console.log(str.match(matchNum));
console.log(str.match(matchUnit));

console.log(str.match(matchUnit) && str.match(matchNum) === null)