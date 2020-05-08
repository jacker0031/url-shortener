const url = require("url");
 function isValidHttpUrl(string) {
 let  url;
  let x= string.toString().split('/');
  url = x[0]+'//'+x[2];
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

module.exports = {
  isValidHttpUrl:isValidHttpUrl,
};