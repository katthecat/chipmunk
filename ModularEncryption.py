# Chipmunk Encryption Program: Kat Nasif  Version --1.0

import random

def encryptString(string,seed):
	# Generate primes
	def get_primes(n):
		numbers = set(range(n, 1, -1))
		primes = []
		while numbers:
			p = numbers.pop()
			primes.append(p)
			numbers.difference_update(set(range(p*2, n+1, p)))
	return primes
	primes = get_primes(1000)
	# Generate field function
	def generateField():
		validity = False
		# a,b are equation constances p is the modular constant
		while validity == False:
			a = random.randomint(0,100000)
			b = random.randomint(0,100000)
			p = primes[random.randomint(0,len(primes)-1)]
			infinity = (0,0)
			if (4*a**3+27*b**3 != 0 and a != 2 and b != 3):
				print("Your generated curve has the equation: y2 = x3 + " + str(a) + "x + " + str(b) + ", with a modular constant of " + str(p))
				print(" ")
				validity = True
				return [a,b,p,infinity]
	# Generate field
	field = generateField()
	# Define addition under modular arithmetic
	def add(i,j):
		if i+j>field[2]:
			r = i+j
		else:
			r = i+j-field[2]
		return r
	def subtract(i,j):
		if i-j >= 0:
			r = i-j
		else:
			r = i-j+field[2]
		return r
	def multiply(i,j):
		n = i 
		r = 0
		bit = 0
		for bit in range(field[1]):
			if (j and (1 << bit)):
				r = (r+n) % field[2]
			n = (n+n) % field[2]
		return r
	def divide(i1,j1):
		# Extended Euclidian Algorithm (greatest common divisor = d) (Bezout-coefficeint = (m,n))
		def eea(i, j):
			assert(isinstance(i, int))
			assert(isinstance(j, int))
			(s, t, u, v) = (1, 0, 0, 1)
			while j != 0:
				(q, r) = (i // j, i % j)
				(unew, vnew) = (s, t)
				s = u - (q * s)
				t = v - (q * t)
				(i, j) = (j, r)
				(u, v) = (unew, vnew)
				(d, m, n) = (i, u, v)
			return (d, m, n)
		r = i*eea(j,field[2])[1]
		return r
	# Base, exponent
	def exponentate(i,j):
		n = i
		r = 1
		for bit in range(field[1]):
			if (j and (1 << bit)):
				r = multiply(r,n)
			n = multiply(n,n)
		return r
	def squareRoot(a):
		r = exponentate(a,((field[2]-1)/2))
		return r
	def pointAdd(px,py,qx,qy):
		s = (py-qy)/(px-qx)
		rx = s**2-px-qx
		ry = s*(px-rx)-py
		return (rx,ry)
	def pointDouble(px,py):
		s = (3*px**2+field[0])/(2*py)
		rx = s**2-2*px
		ry = s*(px-rx)-py
		return (rx,ry)
	# Define scalar multiplication where A is a coordinate in the affine system (ax,ay)
	# NOTE: inverse of this is the "discrete logarithm"
	def scalarMultiply(k,A):
		n = A
		r = 0
		for bit in range(field[1]):
			if (j and (1 << bit)):
				r = (r+n) % field[2]
			n = (n+n) % field[2]
		return r
	# Function that checks if a point is on a curve
	def checkPoint(qx,qy):
		if exponentate(qy,2) == exponentate(qx,3)+field[0]*qx+b:
			return True
		else:
			return False
	def generateGenerator(qx):
		# 0 = qx**3+ax+b
		y = exponentate(qx,3)+multiply(field[0],qx)+field[1]
		# Eudora's equation