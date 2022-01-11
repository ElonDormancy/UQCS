'''SingleGateSets Class'''
import numpy as np
class SingleGateSets:
    def __init__(self,n=None):
        self.n = n
    def R(self):
        return np.array([[1,0],[0,np.exp(1j*np.pi/2**(self.n -1))]])
    def Id(self):
        return np.identity(2)
    def X(self):
        return np.array([[0,1],[1,0]])
    def Y(self):
        return np.array([[0,-1j],[1j,0]])
    def Z(self):
        return np.array([[1,0],[0,-1]])
    def S(self):
        return np.array([[1,0],[0,1j]])
    def Sd(self):
        return np.array([[1,0],[0,-1j]])
    def T(self):
        return np.array([[1,0],[0,np.exp(1j*(np.pi/4))]])
    def Td(self):
        return np.array([[1,0],[0,np.exp(-1j*(np.pi/4))]])
    def H(self):
        return (1/2**0.5)*np.array([[1,1],[1,-1]])
