# Ellipse Generation Function

import random
import numpy

def encryptString(string,seed):
	def generateCurve():
		validity = False 
		while validity == False:
			a = random.randint(1, 10000)
			b = random.randint(1, 10000)
			if (4*a**3+27*b**3 != 0 and a != 2 and b != 3):
				print("Your generated curve has the equation: y2 = x3 + " + str(a) + "x + " + str(b))
				print(" ")
				validity = True
			return (a,b)
	curveValues = generateCurve()
	# START Generate Private Key with ASCII Values

	# Generate dictionary of ASCII values
	charArray = []
	asciiArray = []
	for i in range(0,128):
		charArray.append(chr(i))
		asciiArray.append(ord(charArray[i]))

	asciiDictionary = {}
	asciiDictionary = dict(zip(charArray, asciiArray))

	# Convert string to list of ASCII values

	asciiString = [ord(c) for c in string]

	# END Generate Private Key with ASCII Values

	# START Generate Public Key

	# START Solve Polynomial Equation

	# Convert encrypted data...
	data = []
	for y in range(0,seed):
		for x in range(0,len(asciiString)):
			newValue = asciiString[x]**3+curveValues[0]*asciiString[x]+curveValues[1]
			# Polynomial solver function 
	def solvePolynomial(a,b,c,d):
		# y2 = x3 + ax + b AND y = cx + d
		# cx + d = x3 + ax + b
		# 0 = x3 + ax-cx + b-d
		coefficients = [1,0,a-c,b-d]
		roots = numpy.roots(coefficients)
		realRoots = []
		for i in range(len(roots)):
			if numpy.isreal(roots[i]):
				realRoots = realRoots.append(roots[i])
		return realRoots

	# n*Q Multiplier (finding R)
	newValue = seed*newValue
	data.append(bin(newValue))
	binary = ''.join(data)
	print(''.join(data))
	return ''.join(data)

	# END Solve Polynomial Equation

	# END Generate Public Key