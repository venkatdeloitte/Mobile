
let num = ''
const isMappedToValue = (text) => {
  switch (text.toLowerCase()) {
    case 'first':
      num = 1;
      break;
    case 'second':
      num = 2;
      break;
    case 'third':
      num = 3;
      break;
    case 'fourth':
      num = 4;
      break;
    case 'fifth':
      num = 5;
      break;
    case 'sixth':
      num = 6;
      break;
    case 'seventh':
      num = 7;
      break;
    case 'eighth':
      num = 8;
      break;
    case 'ninth':
      num = 9;
      break;
    case 'tenth':
      num = 10;
      break;

    default:
      num = undefined;
      break;
  }
  return num;
}

module.exports = {
  isMappedToValue,
}
