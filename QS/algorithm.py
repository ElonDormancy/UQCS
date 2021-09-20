from ControlGate import Control_Gate
from SingleGate import Single_Gate
from SingleGateSets import SingleGateSets
import numpy as np
def UN(q,gate,sym,cir):
    n = int(np.log2(len(q)))
    for i in range(n):
        q,cir = Single_Gate(q,i,gate,sym,cir)
    return q,cir
def qft(q,cir):
    n = int(np.log2(len(q)))
    for j in range(n):
        q,cir = Single_Gate(q,j,SingleGateSets().H(),"H",cir)
        for i in range(j+1,n):
            q,cir = Control_Gate(q,i,j,SingleGateSets(np.pi/2**i).R(),f"R{2**i}",cir)
    return q,cir
