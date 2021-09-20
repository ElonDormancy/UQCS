from plot_quantum_circuit import plot_quantum_circuit
from ControlGate import Control_Gate
from SingleGate import Single_Gate
from SingleGateSets import SingleGateSets
from init import init_vector,vec2Aq
import numpy as np
from algorithm import qft
#FOURIER TRANSFORM
n = 10
qubit = np.zeros(n)
cir = []
q = init_vector(qubit)
q,cir = qft(q,cir)
print(q)
