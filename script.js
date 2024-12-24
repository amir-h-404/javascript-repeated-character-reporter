// checking the repeated character:
function checkRepeatedCharacter() {
  const listOfCharacters = document
    .querySelector("input[name=inputBox]")
    .value.split("");
  const listObject = [];
  new Set(listOfCharacters).forEach((value) => {
    const unicode = value.charCodeAt(0),
      uni16 = unicode.toString(16).toUpperCase();
    listObject.push({
      character: value,
      repeat: listOfCharacters.filter((item) => item === value).length,
      ascii: unicode <= 127 && unicode >= 0 ? unicode : false,
      css: "\\" + uni16,
      html: "&#x" + uni16 + ";",
    });
  });
  console.log(listObject);
}
