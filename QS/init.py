"""initialization Module."""
import numpy as np
def i2b(k,n):
    '''
    i2b means Integer to binary

    k:integer which k<n

    n:The length of the initial qubit

    Example:
    >>> from ControlGate import i2b
    >>> binary = i2b(1,2)
    >>> [0,1]
    '''
    result = bin(k).replace('0b','')
    while(len(result) < n):
        result = "0"+ result
    array = []
    for i in result:
        array.append(int(i))
    return array
def q2i(qubit):
    '''
    q2i means binary to Integer
    qubit:[0,0,...]

    Note:
        qubit value cannot be complex number

    Example:
    >>> from ControlGate import q2i
    >>> Integer  = q2i([0,1])
    >>> 1
    '''
    strings = ""
    for i in qubit:
        strings+=f"{int(i)}"
    return int(strings,2)
def single_q(i):
    '''
    i:0 or 1

    Note:
        transform 0 to [1,0];transform 1 to [0,1]
    
    Example:
    >>> from init import single_q
    >>> single_q(0)
    >>> array([1,0])
    '''
    if i == 0:
        return np.array([1,0])
    elif i==1:
        return np.array([0,1])
    else:
        return "NULL"
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
    q = single_q(qubit[0])
    for i in range(1,len(qubit)):
        q = np.kron(q,single_q(qubit[i]))
    return np.array(q,dtype = complex)
def vec2Aq(q):
    '''
    q:[0,0,....,0](The Vector of the qubit;the length of the vector is 2^L)
    
    Note:
        transform q to array form which form are more intuitive
        It's data form consist the amplitude(array[0]) and corresponding quantum state(array[1])
        
    Example:
    >>> from init import vec2Aq
    >>> q = init_vector([0,0])
    >>> vec2Aq(q)
    >>> [[1, [0, 0]], [0, [0, 1]], [0, [1, 0]], [0, [1, 1]]]
    '''
    n = int(np.log2(len(q)))
    Aq = []
    for i in range(len(q)):
        Aq.append([q[i],i2b(i,n)])
    return Aq
