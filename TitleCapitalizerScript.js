var activeButton = [];
var capitalizationMode = [];
var input = document.getElementById("textarea");

var toTitleCaseButton = document.getElementById("title-case");
var toSentenceCaseButton = document.getElementById("sentence-case");
var toUppercaseButton = document.getElementById("uppercase");
var toFirstLetterButton = document.getElementById("first-letter");

const BUTTON_COLOR_NORMAL = "#1D3557";
const BUTTON_COLOR_CLICKED = "#E63946";
const MINOR_WORDS = ["a","an", "the", "and", "as", "at", "but", "by", "for", "in", "nor", "of", "off", "on", "or", "per", "to", "up", "via"];

function toTitleCase() {
    deactivateButton();
    activateButton(toTitleCaseButton);
    updateCapitalization(toTitleCase);
    
    if (input.value != "") {
        var userInput = input.value.toLowerCase().replace(/  /g, " ");
        var result = userInput[0].toUpperCase();
        
        for (i = 1; i < userInput.length; i++) {
            var letter = userInput[i];
            if (letter != " " & userInput[i-1] == " ") {
                letter = letter.toUpperCase();
            }
            result += letter;
        }
        input.value = result;

        for (i = 0; i < MINOR_WORDS.length; i++) {
            var minor = " " + capitalizeFirstLetter(MINOR_WORDS[i]) + " ";
            while (result.includes(minor)) {
                result = result.replace(minor, " " + MINOR_WORDS[i] + " ");
                input.value = result;
            }
        }
    }
}

function toSentenceCase() {
    deactivateButton();
    activateButton(toSentenceCaseButton);
    updateCapitalization(toSentenceCase);
    if (input.value != "") {
        var userInput = input.value.toLowerCase();
        var firstLetter = userInput[0].toUpperCase();
        userInput = userInput.replace(/ i /g, " I ");
        input.value = firstLetter + userInput.slice(1);
    }
}

function titleToUppercase() {
    deactivateButton();
    activateButton(toUppercaseButton);
    updateCapitalization(titleToUppercase);
    input.value = input.value.toUpperCase();
}

function toFirstLetter() {
    deactivateButton();
    activateButton(toFirstLetterButton);
    updateCapitalization(toFirstLetter);
    if (input.value != "") {
        var userInput = input.value.toLowerCase();
        var result = userInput[0].toUpperCase();
        for (i=1; i < userInput.length; i++) {
            var letter = userInput[i];
            if (letter != " " & userInput[i-1] == " ") {
                letter = letter.toUpperCase();
            }
            result += letter;
        }
        input.value = result;
    }
}

function deactivateButton() {
    if (activeButton.length > 0) {
        document.getElementById(activeButton.pop()).style.backgroundColor = BUTTON_COLOR_NORMAL;
    }
}

function activateButton(buttonObject) {
    buttonObject.style.backgroundColor = BUTTON_COLOR_CLICKED;
    activeButton.push(buttonObject.id);
}

function updateCapitalization(newFunction) {
    if (capitalizationMode.length > 0) {
        input.removeEventListener("input", capitalizationMode.pop());
    }
    input.addEventListener("input", newFunction);
    capitalizationMode.push(newFunction);
}

function isMinorWord(str) {
    if (str.length > 3) {
        return false;
    }
    for (i = 0; i < MINOR_WORDS.length; i++) {
        if (str == MINOR_WORDS[i]) {
            return true;
        }
    }
    return false;
}

function capitalizeFirstLetter(str) {
    if (str.length >= 1) {
        return str[0].toUpperCase() + str.slice(1);
    }
}