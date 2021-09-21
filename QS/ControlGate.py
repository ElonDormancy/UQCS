"""Control Gate Module."""
import numpy as np
from init import i2b
def Control_Gate(q,ctrl,targ,gate,sym,cir):
    '''
    q:The vector form of the qubit(q = init_vector(qubit))
    The length of qubit is L;And the length of q is 2^L;
    
    ctrl:The index of the control qubit

    targ:The index of the targ qubit

    gate:The type of Control Gate

    sym: The symbol of the gate(The type of the sym is string)

    cir:circuit

        Example:
    >>> from ControlGate import Control_Gate
    >>> n=2,cir=[]
    >>> qubit = np.zeros(n)
    >>> q = init_vector(qubit)
    >>> q,cir = Control_Gate(q,0,1,H,'H',cir)
    >>> q
    >>> array([0.70710678+0.j, 0.+0.j, 0.70710678+0.j, 0.+0.j])
    '''
    cir.append((sym,targ,ctrl))
    qn = np.zeros(len(q),dtype=complex)
    def operator(qubit):
        qubit = np.dot(gate,qubit)
        return qubit
    ls = []
    index = []
    n = int(np.log2(len(q)))
    indexset = list(np.arange(0,len(q),dtype = int))
    for i in indexset:
        if (i+2**(n-targ-1))<len(q):
            ls.append([q[i],q[i+2**(n-targ-1)]])
            index.append([i,i+2**(n-targ-1)])
    ls = np.array(list(map(operator,ls)),dtype=complex)
    #The part can be run parallelly
    for i in range(len(ls)):
        if i2b(index[i][0],n)[ctrl] == 1:
            qn[index[i][0]]=  ls[i][0]
        else:
            qn[index[i][0]] = q[index[i][0]]
        if i2b(index[i][1],n)[ctrl] == 1:
            qn[index[i][1]]=  ls[i][1]
        else:
            qn[index[i][1]] = q[index[i][1]]
    return qn,cir
