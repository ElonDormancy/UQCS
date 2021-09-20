import numpy as np
def i2b(k,n):
    f = bin(k).replace('0b','')
    while(len(f) < n):
        f = "0"+ f
    array = []
    for i in f:
        array.append(int(i))
    return array
def q2i(qubit):
    str1 = ""
    for i in qubit:
        str1+=f"{i}"
    return int(str1,2)
def Control_Gate(q,ctrl,targ,gate,sym,cir):
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
