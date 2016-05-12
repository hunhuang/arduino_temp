import serial
import time
import random
import numpy as np
import math
ser = serial.Serial('COM1', 9600)  # open first serial port
print ser.portstr       # check which port was really used
N=200
x1 = np.linspace(0, 2*3.14, N)
i=0

while True:
	i=(i+1)%N
	ser.write("%.4f\n" % (math.sin(x1[i])))
	      # write a string
	# print "ok "
	time.sleep(0.05)	