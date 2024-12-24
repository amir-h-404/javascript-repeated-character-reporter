// checking the repeated character:
function checkRepeatedCharacter() {
  const listOfCharacters = document
      .querySelector("input[name=inputBox]")
      .value.split(""),
    listObject = [];
  if (!isEmptyData(listOfCharacters)) {
    alertOfResult([], false);
    return;
  }
  new Set(listOfCharacters).forEach((value) => {
    const unicode = value.codePointAt(0),
      uni16 = unicode.toString(16).toUpperCase();
    listObject.push({
      character: value,
      repeat: listOfCharacters.filter((item) => item === value).length,
      ascii: unicode <= 127 && unicode >= 0 ? unicode : false,
      css: "\\" + uni16,
      html: "&amp;" + "#x" + uni16 + ";",
    });
  });
  alertOfResult(listObject);
}

// show or hide alert and table:
function alertOfResult(listOfCharacters = [], visible = true) {
  const alertMsg = document.getElementById("alertOfResult"),
    tableOfCharacters = document.getElementById("tableOfCharacters"),
    tbodyOfTable = tableOfCharacters.querySelector("table tbody");
  tbodyOfTable.innerHTML = "";
  alertMsg.classList.remove("d-none");
  if (!visible) {
    tableOfCharacters.classList.add("d-none");
    displayError(alertMsg, "Type a character, please!");
    return;
  }
  alertMsg.querySelector("span").innerHTML = "The most repeated character: ";
  alertMsg.classList.remove("alert-danger");
  alertMsg.classList.add("alert-success");
  tableOfCharacters.classList.remove("d-none");
  listOfCharacters.sort((a, b) => b["repeat"] - a["repeat"]);
  let counter = 1;
  listOfCharacters.map((char) => {
    const validChar = specialCharacters(char["character"]);
    if (counter === 1) {
      let messageOfResult = validChar;
      if (char["repeat"] === 1) {
        messageOfResult = "A repeated character not found!";
        displayError(alertMsg);
      }
      alertMsg.querySelector("strong").innerHTML = messageOfResult;
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
    tdChar.innerHTML = validChar;
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
    tbodyOfTable.appendChild(tr);
    counter++;
  });
}

// checking user input is not empty:
function isEmptyData(data) {
  return data.length !== 0;
}

// Converting special characters:
function specialCharacters(char = "") {
  if (char.codePointAt(0).toString(16).toUpperCase() === "200C")
    return "half space «»";
  switch (char) {
    case " ":
      return "space « »";
    case "<":
      return "&lt;";
    case ">":
      return "&gt;";
    default:
      return char;
  }
}

// display Error:
function displayError(alertMsg, message = "") {
  alertMsg.querySelector("span").innerHTML = "Message: ";
  alertMsg.classList.add("alert-danger");
  alertMsg.classList.remove("alert-success");
  alertMsg.querySelector("strong").innerHTML = message;
}
