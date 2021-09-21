"""SWAP Gate Module."""
import numpy as np
from init import q2i,i2b
def SWAP(q,index1,index2,cir):
    '''
    q:The vector form of the qubit(q = init_vector(qubit))
    The length of qubit is L;And the length of q is 2^L;
    
    index1,index2:The index of the swap qubit position

    cir:circuit

        Example:
    >>> from SWAP import SWAP
    >>> cir=[]
    >>> qubit = [0,1]
    >>> q = init_vector(qubit)
    >>> q,cir = SWAP(q,0,1,cir)
    >>> q
    >>> [0.+0.j 0.+0.j 1.+0.j 0.+0.j]
    '''
    cir.append(("SWAP",index1,index2))
    qn = np.array(q.copy(),dtype = complex)
    n = int(np.log2(len(q)))
    for i in range(len(q)):
        if i2b(i,n)[index1] == i2b(i,n)[index2]:
            qn[i] = q[i]
        else:
            s0 = i2b(i,n)
            s1 = s0.copy()
            s1[index2] = s0[index1]
            s1[index1] = s0[index2]
            qn[q2i(s1)] = q[q2i(s0)]
            qn[q2i(s0)] = q[q2i(s1)]
    return qn,cir
