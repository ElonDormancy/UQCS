import numpy as np
def Single_Gate(q,targ,gate,sym,cir):
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
    for i in range(len(ls)):
        qn[index[i][0]]=  ls[i][0]
        qn[index[i][1]]=  ls[i][1]
    return qn,cir
