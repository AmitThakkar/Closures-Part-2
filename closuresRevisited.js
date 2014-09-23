/**
 * Created by namita on 23/9/14.
 */
var family;
var grandFatherName = "John";
function father() {
    var fatherName = "Devis";

    var child = function () {
        var childName = "Tom";
        var description = "My name is" + childName + " ,my grandfather is " + grandFatherName + " and my father is " + fatherName;
        return description;
    };

    family = child;
}
father();
console.log(family());


function incrementer(param) {
    var calculate = function () {
        return param;
    };
    param++;
    return calculate;
}

function newIncrementer(param2) {
    var newCalculate = function () {
        return param2;
    };
    return newCalculate;
    param2++;
}


function counting() {
    var arr = [] , counter;
    for (counter = 0; counter < 5; counter++) {
        arr[counter] = function () {
            return counter;
        }
    }
    ;
    return arr;
}
var arr = counting();


function improvedCounting() {
    function localize(x) {
        return function () {
            return x;
        }
    }

    var newArr = [], newCounter;
    for (newCounter = 0; newCounter < 5; newCounter++) {
        newArr[newCounter] = localize(newCounter);
    }
    return newArr;
};
var newArr = improvedCounting();