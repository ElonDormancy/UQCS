"""Single Gate Module."""
import numpy as np
def Single_Gate(q,targ,gate,sym,cir):
    '''
    q:The vector form of the qubit(q = init_vector(qubit))
    The length of qubit is L;And the length of q is 2^L;

    targ:The index of the targ qubit

    gate:The type of Control Gate

    sym: The symbol of the gate(The type of the sym is string)

    cir:circuit

    Example:
    >>> from SingleGate import Single_Gate
    >>> n=2,cir=[]
    >>> qubit = np.zeros(n)
    >>> q = init_vector(qubit)
    >>> q,cir = Single_Gate(q,0,H,"H",cir)
    >>> q,cir = Single_Gate(q,1,H,"H",cir)
    >>> q
    >>> array([0.5, 0.5, 0.5, 0.5])
    '''
    cir.append((sym,targ))
    qn = np.zeros(len(q),dtype=complex)
    def operator(qubit):
        qubit = np.dot(gate,qubit)
        return qubit
    ls = []
    index = []
    n = int(np.log2(len(q)))
    indexset = list(np.arange(0,len(q),dtype = int))
    for i in indexset:
        ls.append([q[i],q[i+2**(n-targ-1)]])
        index.append([i,i+2**(n-targ-1)])
        indexset.remove(i+2**(n-targ-1))
    ls = np.array(list(map(operator,ls)),dtype=complex)
    #The part can be run parallelly
    for i in range(len(ls)):
        qn[index[i][0]]=  ls[i][0]
        qn[index[i][1]]=  ls[i][1]
    return qn,cir
