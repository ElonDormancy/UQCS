import numpy as np
def init_vector(qubit):
    '''
    qubit:[x1,x2,x3,...,xn](The length of qubit is L) 
    
    Note:
        transform qubit to vector form which is considered as initial state
        (It consists all information about the state)
    Example:
    >>> from init import init_vector
    >>> init_vector([0,0])
    >>> array([1,0,0,0])
    '''
    n = len(qubit)
    s = 0
    state = np.zeros(2**n,dtype = "complex")
    for i in range(n):
        s+=qubit[n-i-1]*2**i
    state[s] = 1
    return state
