let insulinPerCarbs = document.getElementById("inputInsulinPerCarbs");
let carbsInMeal = document.getElementById("inputCarbsInMeal");
let currentGlucose = document.getElementById("inputCurrentGlucoseRange");
let resultBox = document.getElementById("resultContainer");

document.getElementById("submit").addEventListener("click", function() {
    let values = getValues();
    if (!validate(values)) {
        return;
    }
    calculate(values);
});

function calculate(values) {
    let result = values.insulinPerCarbsValue * Math.round(values.carbsInMealValue/10);
    let rangeCorrection = roundHalfDown((values.currentGlucoseValue - 5) / 2);
    if (rangeCorrection < 0) {
        rangeCorrection = 0;
    }
    displayResult(result + rangeCorrection, "Insulin for this meal: ");
}

function roundHalfDown(num) {
    return Math.floor(num*2)/2;
}

function displayResult(result, message) {
    resultBox.classList.remove("d-none");
    resultBox.innerHTML = message + result;
}

function getValues() {
    let values = {
        "insulinPerCarbsValue":insulinPerCarbs.value,
        "carbsInMealValue":carbsInMeal.value,
        "currentGlucoseValue":currentGlucose.value
    };

    return values;
}

function validate(values) {
    let returnValue = true;
    for (const prop in values) {
        if (values[prop] == '') {
            returnValue = false;
            alert("All values must be entered");
            break;
        }
        if (isNaN(values[prop])) {
            returnValue = false;
            alert("All values must be numeric");
            break;
        }
    }
    return returnValue;
}