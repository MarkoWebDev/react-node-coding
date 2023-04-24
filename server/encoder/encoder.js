module.exports = function encoder(str) {
  let encodedStr = "";
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    count++;
    const current = str[i];
    const next = str[i + 1];
    if (current !== next) {
      encodedStr += current + count;
      count = 0;
    }
  }
  return encodedStr;
};


