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

// show or hide alert and table:
function alertOfResult(listOfCharacters = [], visible = true) {
  const alert = document.getElementById("alertOfResult"),
    tableOfCharacters = document.getElementById("tableOfCharacters"),
    tbodyOfTable = tableOfCharacters.querySelector("table tbody");
  tbodyOfTable.innerHTML = "";
  if (!visible) {
    alert.classList.add("d-none");
    tableOfCharacters.classList.add("d-none");
    return;
  }
  alert.classList.remove("d-none");
  tableOfCharacters.classList.remove("d-none");
  listOfCharacters.sort((a, b) => b["repeat"] - a["repeat"]);
  let counter = 1;
  listOfCharacters.map((char) => {
    if (counter === 1) {
      let message = char["character"];
      if (char["repeat"] === 1) message = "Repeated character not found! (404)";
      alert.querySelector("strong").innerHTML = message;
    }
    const tr = document.createElement("tr"),
      th = document.createElement("th"),
      tdChar = document.createElement("td"),
      tdCount = document.createElement("td"),
      tdAscii = document.createElement("td"),
      tdCss = document.createElement("td"),
      tdHtml = document.createElement("td");
    th.scope = "row";
    th.innerHTML = String(counter);
    tdChar.innerHTML = char["character"];
    tdCount.innerHTML = char["repeat"];
    char["ascii"] === false
      ? (tdAscii.innerHTML = "- - -")
      : (tdAscii.innerHTML = char["ascii"]);
    tdCss.innerHTML = char["css"];
    tdHtml.innerHTML = char["html"];
    tr.appendChild(th);
    tr.appendChild(tdChar);
    tr.appendChild(tdCount);
    tr.appendChild(tdAscii);
    tr.appendChild(tdCss);
    tr.appendChild(tdHtml);
    tableOfNumbers.querySelector("tbody").appendChild(tr);
    counter++;
  });
}
