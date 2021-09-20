import numpy as np
def single_q(i):
    if i == 0:
        return np.array([1,0])
    elif i==1:
        return np.array([0,1])
    else:
        return "NULL"
def init_vector(qubit):
    q = single_q(qubit[0])
    for i in range(1,len(qubit)):
        q = np.kron(q,single_q(qubit[i]))
    return np.array(q,dtype = complex)
def vec2Aq(q):
    n = int(np.log2(len(q)))
    Aq = []
    for i in range(len(q)):
        Aq.append([q[i],itb(i,n)])
    return Aq
