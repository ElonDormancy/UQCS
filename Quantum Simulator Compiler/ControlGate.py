"""Control Gate Module."""
import numpy as np
from SingleGateSets import SingleGateSets
Gates = SingleGateSets()

def switch_gate(control_gate):
    if(control_gate == "X"):
        return "CNOT"
    else:
        return control_gate
def switch_operator(control_gate):
    
    if(control_gate[0] == "R"):
        return f"SingleGateSets({int(control_gate[1:])})"+".R()"
    else:
        return f"SingleGateSets().{control_gate}()"
def i2b(i_n,n):
    '''
    i2b means Integer to binary
    i:integer which i<n
    n:The length of the initial qubit
    Example:
    >>> from ControlGate import i2b
    >>> binary = i2b(1,2)
    >>> [0,1]
    '''
    result = bin(i_n).replace('0b','')
    while(len(result) < n):
        result = "0"+ result
    array = []
    for i in result:
        array.append(int(i))
    return array
def Control_Gate(q,ctrl,targ,gate,cir):
    '''
    q:The vector form of the qubit(q = init_vector(qubit))
    The length of qubit is L;And the length of q is 2^L;
    ctrl:The index of the control qubit
    targ:The index of the targ qubit
    gate:The type of Control Gate
    sym: The symbol of the gate(The type of the sym is string)
    cir:circuit
        Example:
    >>> cir=[]
    >>> q = init_vector([1,0])
    >>> q,cir = Control_Gate(q,0,1,"X",cir)
    >>> q
    >>> array([0., 0., 0., 1.])
    '''
    cir.append((switch_gate(gate),targ,ctrl))
    n = len(q)
    Have_list = []
    operator_gate = eval(switch_operator(gate))
    m = int(np.log2(n))
    for i in range(n):
        k = i+ 2**(m-1-targ)
        if((i not in Have_list) and int(i2b(i,m)[ctrl])==1):
            state = np.zeros([2,1],dtype = "complex")
            state[0][0] = q[i]
            state[1][0] = q[k]
            operator_state = np.dot(operator_gate,state)
            q[i] = operator_state[0][0]
            q[k] = operator_state[1][0]
            Have_list.append(k)
    return q,cir
