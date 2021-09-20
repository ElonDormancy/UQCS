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
def SWAP(q,index1,index2,cir):
    qn = np.array(q.copy(),dtype = complex)
    n = int(np.log2(len(q)))
    for i in range(len(q)):
        if itb(i,n)[index1] == itb(i,n)[index2]:
            qn[i] = q[i]
        else:
            s0 = itb(i,n)
            s1 = s0.copy()
            s1[index2] = s0[index1]
            s1[index1] = s0[index2]
            qn[q2i(s1)] = q[q2i(s0)]
            qn[q2i(s0)] = q[q2i(s1)]
    cir.append((SWAP,index1,index2))
    return qn,cir
