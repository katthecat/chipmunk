// Parabolic Encryption Function -- Version 1.3
function encryptString(string,seed) {
	// Function that returns random interger between two numbers
	function getRandomInt(min,max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		if (Math.floor(Math.random()*(max-min)) + min !== 0) {
			return Math.floor(Math.random()*(max-min)) + min;
		} else {
			return Math.floor(Math.random()*(max-min)) + min-1;
		}
	}
	function decimalPlaces(num) {
  		var match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
		if (!match) { return 0; }
  		return Math.max(
       	0,
       // Number of digits right of decimal point.
       (match[1] ? match[1].length : 0)
       // Adjust for scientific notation.
       - (match[2] ? +match[2] : 0));
	}
	// Binary to decimal function
	function binToDec(bstr) { 
    	return parseInt((bstr + '')
    	.replace(/[^01]/gi, ''), 2);
	}
	// Function that solves quadratic given a, b, and c
	function quadraticFormula(a,b,c) {
		return ((-b+sqrt(b**2-4*a*c))/2*a , (-b-sqrt(b**2-4*a*c))/2*a);
	}
	function solveYGivenX(a,b,c,x) {
		return (((a)*(x*x))+(b*x)+c);
	}
	// Variable that defines validity of first quadratic
	let validFirst = false;
	function defineFirstQuadratic() {
		// console.log("I defined the first quadratic.")
		// START FIRST QUADRATIC
		let a = getRandomInt(-200,200);
		let b = getRandomInt(-200,200);
		let c = getRandomInt(-200,200);
		// y = a(x-h)^2-k
		// y = ax^2+bx+c
		// y-c = ax^2+bx
		// y-c+(b/2)^2 = ax^2+bx+(b/2)^2
		// y-c+(b/2)^2 = a(x+(b/2))^2
		// y = a(x+(b/2))^2+c-(b/2)^2
		let xVertex = (-(b/2*a));
		let yVertex = ((4*a*c-b**2)/(4*a));
		// y = 1/(4a)
		let directrix = yVertex-(1/(4*a));
		let yFocus = yVertex+(1/(4*a));
		let xFocus = xVertex;
		return [a,b,c,xVertex,yVertex,directrix,xFocus,yFocus];
		// END FIRST QUADRATIC
	}
	function defineSecondQuadratic() {
		let directrix = 0;
			// console.log("I got to defining the second quadratic.")
			if (firstQuadratic[5]<0) {
				directrix = seed;
				// console.log(directrix);
				// console.log("I defined the directrix.")
			}
			else if (firstQuadratic[5] === 0) {
				console.log("Not a valid first directrix.");
			}
			else {
				directrix = seed;
				// console.log("I defined the directrix.")
				// console.log(directrix);
			}
			let xVertex = (firstQuadratic[4]-directrix)/2;
			let yVertex = firstQuadratic[3];
			let yFocus = (yVertex-directrix)+yVertex;
			let xFocus = firstQuadratic[6];
			// DERIVING SECOND QUADRATIC FROM FOCUS AND DIRECTRIX HELLO MR. CHAFFEE
			// VARIABLES: x2,y2
			// CONSTANTS: xFocus,yFocus,directrix
			// sqrt((xFocus-x2)^2+(yFocus-y2)^2)=sqrt((y2-directrix)^2) --> square root both sides
			// (xFocus-x2)^2+(yFocus-y2)^2=(y2-directrix) --> expand
			// xFocus^2-(2(xFocus)*x2)+x2^2+yFocus^2 - (2*(yFocus)*y2)+y2^2 = y^2-(2*yFocus*y2)-(2*y2*directrix) --> Simplify
			// (xFocus^2)-(2*xFocus*x2)+x2^2+yFocus^2-(2*yFocus*y2)+(2*y2*directrix)-directrix^2=0
			// (xFocus)^2-(2*xFocus*x2)+(x2)^2-(directrix)^2+(yFocus)^2 = (2*yFocus*y2)-(2*y2*directrix) --> Simplify
			// (x2)^2-(2*xFocus*x2)+(xFocus)^2-(directrix)^2+(yFocus)^2 = (2*yFocus-2*directrix)*y2 <-- Now almost in the form of a quadratic
			// ((x2)^2-(2*xFocus*x2)+((xFocus)^2-(directrix)^2+(yFocus)^2))/(2*yFocus-2*directrix) = y2 <-- A quadratic
			// Now let's simplify the coefficients into code
			let a = 1/(2*yFocus-2*directrix);
			let b = (-2*xFocus)/(2*yFocus-2*directrix);
			let c = ((xFocus)**2-(directrix)**2+yFocus**2)/(2*yFocus-2*directrix);
		return [a,b,c,xVertex,yVertex,directrix,xFocus,yFocus];
	}
	// DEFINE QUADRATICS
	let validity = false;
	let firstQuadratic = defineFirstQuadratic();
	let secondQuadratic = defineSecondQuadratic();
	while (validity === false) {
		if (firstQuadratic[5]!== 0 && Number.isInteger(firstQuadratic[3]) && Number.isInteger(firstQuadratic[4]) && Number.isInteger(firstQuadratic[6]) && decimalPlaces(firstQuadratic[7]) < 3) {
			secondQuadratic = defineSecondQuadratic();
			if (secondQuadratic[3] == firstQuadratic[3] && isFinite(secondQuadratic[0]) && isFinite(secondQuadratic[1]) && isFinite(secondQuadratic[2]) && decimalPlaces(secondQuadratic[0]) < 10 && decimalPlaces(secondQuadratic[1]) < 10 && decimalPlaces(secondQuadratic[2]) < 10) {
				validity = true;
			} else {
				firstQuadratic = defineFirstQuadratic();
				secondQuadratic = defineSecondQuadratic();
			}
		} else {
			firstQuadratic = defineFirstQuadratic();
			// console.log("I am redefining the first quadratic.")
		}
	}
	// Little tid bit for presentation
	console.log("Your two parabolic equations have the equations:");
	console.log(firstQuadratic[0] + "x2 + " + firstQuadratic[1] + "x + " + firstQuadratic[2]);
	console.log(secondQuadratic[0] + "x2 + " + secondQuadratic[1] + "x + " + secondQuadratic[2]);
	// START BIT ENCRYPTION
	function createDictionary() {
		// find all x-values with an integer difference
		xValues = [];
		yValues = [];
		let charDictionary = {};
		for (let x = firstQuadratic[3]+1 ; xValues.length <= 64 ; x++) {
			if (solveYGivenX(firstQuadratic[0],firstQuadratic[1],firstQuadratic[2],x)>=solveYGivenX(secondQuadratic[0],secondQuadratic[1],secondQuadratic[2],x)) {
				if (Number.isInteger(solveYGivenX(firstQuadratic[0],firstQuadratic[1],firstQuadratic[2],x)-solveYGivenX(secondQuadratic[0],secondQuadratic[1],secondQuadratic[2],x))) {
					xValues.push(x);
					yValues.push(solveYGivenX(firstQuadratic[0],firstQuadratic[1],firstQuadratic[2],x)-solveYGivenX(secondQuadratic[0],secondQuadratic[1],secondQuadratic[2],x));
					charDictionary[x] = solveYGivenX(firstQuadratic[0],firstQuadratic[1],firstQuadratic[2],x)-solveYGivenX(secondQuadratic[0],secondQuadratic[1],secondQuadratic[2],x);
					// console.log("I\'m pushing plus values. 1");
				}
			} else {
				if (Number.isInteger(solveYGivenX(secondQuadratic[0],secondQuadratic[1],secondQuadratic[2],x)-solveYGivenX(firstQuadratic[0],firstQuadratic[1],firstQuadratic[2],x))) {
					xValues.push(x);
					yValues.push(solveYGivenX(secondQuadratic[0],secondQuadratic[1],secondQuadratic[2],x)-solveYGivenX(firstQuadratic[0],firstQuadratic[1],firstQuadratic[2],x));
					charDictionary[x] = solveYGivenX(secondQuadratic[0],secondQuadratic[1],secondQuadratic[2],x)-solveYGivenX(firstQuadratic[0],firstQuadratic[1],firstQuadratic[2],x);
					// console.log("I\'m pushing plus values. 2");
				}
			}
		}
		for (let x = firstQuadratic[3]-1 ; xValues.length < 128 ; x--) {
			if (solveYGivenX(firstQuadratic[0],firstQuadratic[1],firstQuadratic[2],x) >= solveYGivenX(secondQuadratic[0],secondQuadratic[1],secondQuadratic[2],x)) {
				if (Number.isInteger(solveYGivenX(firstQuadratic[0],firstQuadratic[1],firstQuadratic[2],x)-solveYGivenX(secondQuadratic[0],secondQuadratic[1],secondQuadratic[2],x))) {
					xValues.push(x);
					yValues.push(solveYGivenX(firstQuadratic[0],firstQuadratic[1],firstQuadratic[2],x)-solveYGivenX(secondQuadratic[0],secondQuadratic[1],secondQuadratic[2],x));
					charDictionary[x] = solveYGivenX(firstQuadratic[0],firstQuadratic[1],firstQuadratic[2],x)-solveYGivenX(secondQuadratic[0],secondQuadratic[1],secondQuadratic[2],x);
					// console.log("I\'m pushing minus values. 1");
				}
			} else {
				if (Number.isInteger(solveYGivenX(secondQuadratic[0],secondQuadratic[1],secondQuadratic[2],x)-solveYGivenX(firstQuadratic[0],firstQuadratic[1],firstQuadratic[2],x))) {
					xValues.push(x);
					yValues.push(solveYGivenX(secondQuadratic[0],secondQuadratic[1],secondQuadratic[2],x)-solveYGivenX(firstQuadratic[0],firstQuadratic[1],firstQuadratic[2],x));
					charDictionary[x] = solveYGivenX(secondQuadratic[0],secondQuadratic[1],secondQuadratic[2],x)-solveYGivenX(firstQuadratic[0],firstQuadratic[1],firstQuadratic[2],x)
					// console.log("I\'m pushing minus values. 2");
				}
			}
		} 
	return charDictionary;
	}
	var dictionaryArray = [];
	// Create charcter dictionary
	let charDictionary = createDictionary();
	// Convert character dictionary in array of arrays
	for (var key in charDictionary) {
		if (charDictionary.hasOwnProperty(key)) {
			dictionaryArray.push( [ key, charDictionary[key] ] );
		}
	}
	// START bit encryption
	bitArray = [];
	for (let x = 0 ; x<=string.length-1 ; x++) {
		bitArray.push(string.charCodeAt(x).toString(2));
	}
	let newArray = [];
	for (let x = 0 ; x<bitArray.length ; x++) {
		newArray.push((bitArray[x]*dictionaryArray[x][1]).toString(2));
	} 
	let binary = newArray.join('');
	let newString = binary.fromCharCode(10);
	console.log(newString);
	// END bit encryption
}
// Test
encryptString("hello",0);