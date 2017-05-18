// convertToStandard form from the form sqrt((x-a)^2+(y-b)^2)+sqrt((x-c)^2+(y-b)^2)=d
function convertToStandard(a,b,c,d) {
	console.log("(x-" + (Math.abs(c-a)/2+a) + ")^2/(" + (d/2) + ")^2+(y-" + b + ")^2/(" + (Math.sqrt((a-(Math.abs(c-a)/2+a)+((d/2)*(d/2))))) + "^2)=1");
}