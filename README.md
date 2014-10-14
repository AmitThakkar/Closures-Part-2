#Closures in JavaScript - Part 2

This repository contains **JavaScript Closure** Part 2 Demo.

In the previous blog on **[closures](https://github.com/NamitaMalik/Closures)**, we had seen some of the basic concepts related to **closures**, now it is time to see things with deeper outlook.

**[Closures in JavaScript](https://github.com/NamitaMalik/Closures)** had an example through which we had seen **scope** chaining, See the modified code here:

```javascript
var grandFatherName = "John";
function father() {
    var fatherName = "Devis";
    function child() {
        var childName = "Tom";
        var description = "My name is" + childName + " ,my grandfather is " + grandfatherName + " and my father is " + fatherName;
        return description;
    }
    return child; // we are returning child function here
}
var tom = father(); // child function is referred into tom outer variable(which is global here.)
console.log(tom());
```

Here, we had seen that **inner function** 'child' was getting returned by **outer function** 'father'. Now, other way to do this is by assigning the **inner function** to **global variable**.

See the slightly tweaked code below:

```javascript
var tom;
var grandFatherName = "John";
function father() {
    var fatherName = "Devis";
    var child = function() {
        var childName = "Tom";
        var description = "My name is" + childName + " ,my grandfather is " + grandFatherName + " and my father is " + fatherName;
        return description;
    };
    tom = child;
}
father();
console.log(family());
```

In the above code we have defined a **global variable** 'tom' and assigned **function** 'child' to it. The output would be same as the output of the first snippet.

Let us see a diagrammatic representation of the above code:

![output.png](https://raw.githubusercontent.com/NamitaMalik/Closures-Part-2/master/Family_Example_Closures.png)

To move further, I would like to share that recently I came across a line : "Every function can be considered **closure**."

Well Really?? Then How??

Well the above line holds true as every **function** has a link to the environment in which it is created. A **closure** is created when a function keeps a 'link' to its **parent scope** even after the parent has returned that **function**. Every **function** is a **closure** since it maintains a 'secret link' to the **global space** in which it created and this 'secret link' is maintained till eternity!

Consider the word 'link' here as a **snapshot** while 'secret link' as **reference**. 

Now, let's see the following example:

```javascript
function incrementer(param) {
    var calculate = function () {
        return param;
    };
    param++;
    return calculate;
}
```

Let's see what would be the output of above code.

```javascript
var cal = incrementer(5);
console.log(cal()); // 6
```

We called **Function** incrementer with value '5'. **Function** incrementer first defined the calculate function which return the value of param then increments the value of param by one and at last returns the **function** calculate. **Function** calculate is defined inside the **function** incrementer so when it returns from parent/incrementer **function**, it gets snapshot of parent/incrementer **function** with it.

At times many books while giving explanation for the above example states that updated value of 'param' got printed because function maintains a reference to the scope where it is defined, reference is actually snapshot. But in case of **outer function** or **inner function** or whatever function it is, it maintains a reference to the **global scope**. Please keep in mind the points given below:

1. A function keeps the snapshot of the outer function when it is returned by the outer function.

2. All functions maintain reference to the global scope.

Keeping these rules in mind let's put closure in a looping situation:

```javascript
function counting() {
    var arr = [] , counter;
    for (counter = 0; counter < 5; counter++) {
        arr[counter] = function () {
            return counter;
        }
    }
    return arr;
}
var arr = counting();
```

Let's check the output:

```javascript
console.log(arr[0]()); // 5
```

Let's check again:

```javascript
console.log(arr[3]()); // 5
```

Once again!!

```javascript
console.log(arr[4]()); // 5
```

So it's always 5!!

All 5 functions return the same value, because they keep link/reference to the environment in which they were created! Confused ??
Well, as per the first thumb rule written above, snapshot of the outer function is taken when it returns inner function and not when inner function is defined.

The value of counter changed to '5' at the end of loop. The inner function returned this updated value of 'counter' to array 'arr', hence the result.

Now, what is the solution to the above problem??

Didn't you read between the lines?

Yes, you are right..... We need to create a situation where snapshot is taken by the closure and added to the array. This situation can be created as given here:

```javascript
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
```

What has been done in above code is that we have tried to localize the value of the parameter passed.

When loop executes:

1. Localize function is called and argument newCounter is passed to it.
2. Localize function returns a function which in turn returns the value of the parameter.

The above steps are repeated till the loop executes i.e. when newCounter attains the value '5'.