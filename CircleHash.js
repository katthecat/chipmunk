// Circle Hash -- Version 1.0
// seed is the radius of the circle
// convertToStandard form from the form sqrt((x-a)^2+(y-b)^2)+sqrt((x-c)^2+(y-b)^2)=d
function convertToStandard(a,b,c,d) {
	console.log("(x-" + (Math.abs(c-a)/2+a) + ")^2/(" + (d/2) + ")^2+(y-" + b + ")^2/(" + (Math.sqrt((a-(Math.abs(c-a)/2+a)+((d/2)*(d/2))))) + "^2)=1");
}
function hashCircle(string,seed) {
	let productArray = [];
	for (let x = 0 ; x<string.length ; x++) {
		productArray.push(x*string.charCodeAt(x));
	}
	let sum = 0;
	for (let x = 0 ; x<productArray.length ; x++) {
		sum += productArray[x];
	}
	let yCenter = sum/string.length;
	// The yCenter is now the y-position center of the circle
	let asciiArray = [];
	for (let i = 0 ; i<string.length ; i++) {
		asciiArray.push(string.charAt(i));
	}
	asciiArray.reverse();
	// Convert to ascii to binary function
	var asciiToBin = (function () {
	    var pad = '00000000';

	    return function (str) {
	        return str.replace(/./g, function (c) {
	            var bin = c.charCodeAt(0).toString(2);
	            return pad.substring(bin.length) + bin;
	        });
	    };
	}());
	let binaryArray = [];
	for (let x = 0 ; x<asciiArray.length ; x++) {
		binaryArray.push(asciiToBin(asciiArray[x]));
	}
	// This stupid array is an array of the number base ten tuples
	let xStupidArray = [];
	let yStupidArray = [];
	for (let x = 0 ; x<binaryArray.length ; x++) {
		let fourCharBinary1 = String((binaryArray[x]).slice(0,4));
		let fourCharBinary2 = String((binaryArray[x]).slice(3,7));
		xStupidArray.push(fourCharBinary1);
		yStupidArray.push(fourCharBinary2);
	}
	// This other stupid array is an array of the reverse characters in the string
	let thisOtherDumbArray = [];
	for (let x = string.length ; x>=0 ; x--) {
		thisOtherDumbArray.push(x);
	}
	let otherProductArray = [];
	for (let x = 0 ; x<asciiArray.length ; x++) {
		otherProductArray.push(xStupidArray[x]*thisOtherDumbArray[x]);
		otherProductArray.push(yStupidArray[x]*thisOtherDumbArray[x]);
	}
	var xCenter = otherProductArray.reduce((a, b) => a + b, 0);
	// product sum is the x Position of the center
	console.log("Your circle equation: (x-" + xCenter + ")^2/(" + seed + ") + (y-" + yCenter + ")^2/(" + seed + ") = 1");
	// convert to standard form function
	// convertToStandard form from the form sqrt((x-a)^2+(y-b)^2)+sqrt((x-c)^2+(y-b)^2)=d
	console.log("Your linear equation: y = x + " + (yCenter-xCenter));
	// Hey Kendall, now these equations can be solved. Then, input the solution into the function below:
	function createHash(solutionX,solutionY) {
		let hashX = String(solutionX).splice(0,4).replace(/r/g, '.');
		let hashY = String(solutionY).splice(0,4).replace(/r/g, '.')
		let hash = hashX.concat(hashY);
		return hash;
	}
}

// Test 
hashCircle("hello",2);