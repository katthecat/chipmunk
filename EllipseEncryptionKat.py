# Ellipse Generation Function

import random
import numpy
import math

def encryptString(string,seed):
	# Elliptic Curve Generating Function
	def generateCurve():
		validity = False 
		while validity == False:
			a = random.randint(1, 10000)
			b = random.randint(1, 10000)
			p = random.randint(1, 10000)
			if (4*a**3+27*b**3 != 0 and a != 2 and b != 3):
				print("Your generated curve has the equation: y2 = x3 + " + str(a) + "x + " + str(b) + ", with a modular constant of " + str(p))
				print(" ")
				validity = True
			return [a,b,p]
	curveValues = generateCurve()
	print(curveValues)

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

	def xEvaluate(x):
		return sqrt(x**2+curveValues[0]*x+curveValues[1])

	# Add Two Points Function --> returns a tuple (x,y)
	def add(x1,y1,x2,y2):
		s = (y1-y2)/(x1-x2)
		rx = s**2-x1-x2
		ry = s*(x1-rx)-y1
		return (rx,ry)

	# Point Doubling Function --> returns a tuple (x,y)
	def double(x,y):
		s = (3*x**2+curveValues[0])/(2*y)
		rx = s**2-2*x
		ry = s*(x-rx)-y
		return (rx , ry)

	# Multiply two intergers with a bitlength
	def scalarMultiply(i, k):
		n = i
		r = 0
		for bit in range(int(math.log(bit, 2)) + 1):
			if (bitset(k , bit)):
				r = add(r,xEvaluate(r),n,xEvaluate(n))
		return r

	def checkPoint(x,y):
		if (y**2 == x**3+curveValues[0]*x+curveValues[2]):
			return True
		else:
			return False

	def printParameters():
		print("Modulo Constant: " + curveValues[2])
		print("Equation: y2 = x3 + " + str(a) + "x + " + str(b))
		print("Base point: The point cycled through in the binary.")		

	# Convert encrypted data...
	data = []
	for y in range(0,len(asciiString)-1):
		for x in range (1,seed):
			if scalarMultiply(asciiString[y],x) == asciiString[x]:
				data.append(scalarMultiply(asciiString[y],x)*seed)


	binary = ''.join(data)
	print(''.join(data))
	return ''.join(data)

	# END Solve Polynomial Equation

	# END Generate Public Key