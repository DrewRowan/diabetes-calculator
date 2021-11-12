let insulinPerCarbs = document.getElementById("inputInsulinPerCarbs");
let adjustmentDose = document.getElementById("inputAdjustmentDose");
let carbsInMeal = document.getElementById("inputCarbsInMeal");
let currentGlucose = document.getElementById("inputCurrentGlucoseRange");
let glucoseUnits = document.getElementById("inputUnits");
let resultBox = document.getElementById("resultContainer");
let calculatorForm = document.getElementById("calculatorForm");

calculatorForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let values = getValues();
    if (!validate(values)) {
        return;
    }
    calculate(values);
});

function calculate(values) {
    let result = values.insulinPerCarbsValue * Math.round(values.carbsInMealValue/10);
    let rangeCorrection = calculateRangeCorrection(values);
    displayResult(result + rangeCorrection, "Insulin for this meal: ");
}

function calculateRangeCorrection(values) {
    let currentBloodGlucoseInMmol = getGlucoseInMmol(values.currentGlucoseValue);
    let rangeCorrection = adjustForRange((currentBloodGlucoseInMmol - 5) / 2);
    if (rangeCorrection < 0) {
        rangeCorrection = 0;
    }
    rangeCorrection = rangeCorrection * values.adjustmentDose;
    return rangeCorrection;
}

// this function adjusts for correction ranges
// e.g. 5-7 = 0 correction, 7-9 = 1, etc
function adjustForRange(num) {
    return Math.floor(num*2)/2;
}

function getGlucoseInMmol(bloodGlucose) {
    if (glucoseUnits.value == "mgdl") {
        bloodGlucose = bloodGlucose/18;
    }
    return bloodGlucose;
}

function displayResult(result, message) {
    resultBox.classList.remove("d-none");
    resultBox.innerHTML = message + result;
}

function getValues() {
    let values = {
        "insulinPerCarbsValue":insulinPerCarbs.value,
        "carbsInMealValue":carbsInMeal.value,
        "currentGlucoseValue":currentGlucose.value,
        "adjustmentDose":adjustmentDose.value
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