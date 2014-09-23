Closures-Gotcha
===============

In the previous blog on closures, we had seen some of the basic concepts related to closures, now it is time to see things with deeper outlook.

"Closures in JavaScript" had an example through which we had seen scope chaining, I hope that you must have noticed that it was also a perfect example of closures.

I have again copied that code here:

``
var grandFatherName = "John";
function father() {
    var fatherName = "Devis";

    function child() {
        var childName = "Tom";
        var description = "My name is" + childName + " ,my grandfather is " + grandfatherName + " and my father is " + fatherName;
        return description;
    }

    return child();
}
console.log(father());

``
Here, we had seen that inner function 'child' was getting returned by outer function 'father'. Now, other way to do this is by assigning the inner function to global variable.

See the slightly tweaked code below:

``
var family;
var grandFatherName = "John";
function father() {
    var fatherName = "Devis";

    var child = function() {
        var childName = "Tom";
        var description = "My name is" + childName + " ,my grandfather is " + grandFatherName + " and my father is " + fatherName;
        return description;
    };

    family = child;
}
father();
console.log(family());

``
In the above code we have defined a global variable 'family' and assigned function 'child' to it. The output would be same as the output of the first snippet. Let us see a diagrammatic representation of the above code:


To move further, I would like to share that recently I came across a line : "Every function can be considered closure!"

Well Really?? Then How??

Well the above line holds true as every function has a link to the environment in which it is created. A closure is created when a function keeps a 'link' to its parent scope even after the parent has returned. Every function is a closure since it maintains a 'secret link' to the global space in which it created and this 'secret link' is maintained till eternity!


For now, see the following example:

``
function incrementer(param){
var calculate = function(){
    return param;
};
param ++;
return calculate;
}
}

``

Let's see what would be the output of above code.

incrementer(5);

o/P would be 6.

Function incrementer is called and '5' is passed to it.Function 'calculate' returns the value of param and then value of param is incremented to 6.


At times many books while giving explanation for thr above example states that updated value of 'param' got printed because function maintains a reference to the scope where it is defined but this is wrong. Let us just modify the previous code a little bit.

``
function incrementer(param){
var calculate = function(){
    return param;
};
return calculate;
param ++;
}
}
``

O/P would be 5 in this case , since what inner function 'calculate' had was the snapshot of the scope of the outer function and not the reference to the variables. But in case of 'outer function' or 'inner function' or whatever function it is, it maintains a reference to the global scope. Please keep in mind the bullet points given below:

1. A function keeps the snapshot of the outer function when it is returned by the outer function.

2. All functions maintain reference to the global scope.

Keeping these rules in mind let's put closure in a looping situation:

``
function counting (){
var arr = [] , counter;
for(counter=0;counter<5;counter++){
arr[counter] = function(){
return counter;
}
};
return arr;
}
var arr = counting();

``

Let's check the output:

arr[0]();

5

Let's check again:

arr[3]();

5

Once again!!

arr[4]();

5

So it's always 5!!

All 5 functions return the same value, because they keep link to the environment in which they were created! Confused ??
Well, as per the first thumb rule written above that snapshot of the outer function is taken when they return inner function and not when they are defined.

The value of year changed to '5' at the end of loop. The inner function returned this updated value of 'year' to array 'arr' , hence the result.

Now, what is the solution to the above problem??

Didn't you read between the lines?

Yes, you are right.....we need to create a situation where snapshot is taken by the closure and added to the array. This situation can be created as given here:

``
function improvedCounting (){
function localize(x){
return function(){
return x;
}
}
var newArr = [],newCounter;
for(newCounter=0;newCounter<5;newCounter++){
newArr[newCounter] = localize(newCounter);
}
return newArr;
};
var newArr = improvedCounting();

``
What has been done in above code is that we have tried to localize the value of the parameter passed.

When loop executes:

1. Localize function is called and argument newCounter is passed to it.
2. Localize function returns a function which in turn returns the value of the parameter.

The above steps are repeated till the loop executes i.e. when newCounter attains the value '5'.