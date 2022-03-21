from scipy import special
import numpy as np
###################Solve Time Evolution###################


def Spectral_Radius(A):
    n = len(A)
    ini_list = np.zeros(n)
    for i in range(n):
        abs_sum = np.sum(np.abs(A[i]))
        ini_list[i] = abs_sum
    return np.max(ini_list)


def Chebyshev(t, H):
    z = t*Spectral_Radius(H)
    A = H/Spectral_Radius(H)
    size = len(H)
    I = np.identity(size, dtype=complex)
    Tlist = [I, A]
    Init_Matrix = special.jv(0, z)*I
    n = 1
    while(True):
        if np.abs(special.jv(n, z)) < 10**(-13):
            break
        Init_Matrix += 2*special.jv(n, z)*(-1j)**n*Tlist[1]
        temp0 = Tlist[0]
        temp1 = Tlist[1]
        Tlist[0] = temp1
        Tlist[1] = 2*np.dot(A, temp1)-temp0
        n += 1
    return Init_Matrix


###################Solve Time Evolution###################
