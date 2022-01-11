"""Single Gate Module."""
import numpy as np
from SingleGateSets import SingleGateSets
Gates = SingleGateSets()

def Single_Gate(q,targ,gate,cir):
    '''
    q:The vector form of the qubit(q = init_vector(qubit))
    The length of qubit is L;And the length of q is 2^L;

    targ:The index of the targ qubit

    gate:The type of Control Gate

    sym: The symbol of the gate(The type of the sym is string)

    cir:circuit

    Example:
    >>> cir=[]
    >>> q = init_vector([0,0])
    >>> q,cir = Single_Gate(q,0,"H",cir)
    >>> q,cir = Single_Gate(q,1,"H",cir)
    >>> q
    >>> array([0.5, 0.5, 0.5, 0.5])
    '''
    cir.append((gate,targ))
    operator_gate = eval("Gates."+gate+"()")
    n = len(q)
    Have_list = []
    m = int(np.log2(n))
    for i in range(n):
        k = i+ 2**(m-1-targ)
        if(i not in Have_list):
            Have_list.append(k)
            state = np.zeros([2,1],dtype = "complex")
            state[0][0] = q[i]
            state[1][0] = q[k]
            operator_state = np.dot(operator_gate,state)
            q[i] = operator_state[0][0]
            q[k] = operator_state[1][0]
    return q,cir
