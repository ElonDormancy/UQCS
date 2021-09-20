import numpy as np
#SingleGateSets
class SingleGateSets:
    def __init__(self,theta=None):
        self.theta = theta
    def R(self):
        return np.array([[1,0],[0,np.exp(1j*self.theta)]])
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
