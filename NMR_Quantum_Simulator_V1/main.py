import numpy as np
from init import fidelity, Initial_Rho, Density_Matrix
from Hamiltonian import Time_Evolution_Tot, single_ham


def Rx(theta):
    return np.array([[np.cos(theta/2), -1j*np.sin(theta/2)], [-1j*np.sin(theta/2), np.cos(theta/2)]])


def Ry(theta):
    return np.array([[np.cos(theta/2), -np.sin(theta/2)], [np.sin(theta/2), np.cos(theta/2)]])


def Rz(theta):
    return np.array([[np.exp(-1j*theta/2), 0], [0, np.exp(1j*theta/2)]])


Hamiltonian_Parameters = np.zeros([2, 2])
Hamiltonian_Parameters[0][0] = -500*10**6
Hamiltonian_Parameters[1][1] = -125*10**6
Hamiltonian_Parameters[0][1] = 215

rho0 = Initial_Rho(1, [0, 0])
Parameter = Hamiltonian_Parameters
GAD_T = [18.8, 10.9]
PD_T = [0.35, 3.3]
W = [50*10**3, 50*10**3]
Wrf = -500*10**6

rho_final1 = Time_Evolution_Tot(
    np.pi/(4*50*10**3), 10**(-7), W, Wrf, Parameter, 0, rho0, GAD_T, PD_T, 300)
rho_final = Time_Evolution_Tot(
    np.pi/(4*50*10**3), 10**(-7), W, Wrf, Parameter, 0, rho_final1, GAD_T, PD_T, 300)
# rho_final = Time_Evolution_Tot(np.pi/(4*50*10**3),10**(-7),W,Wrf,Parameter,np.pi,rho_final,GAD_T,PD_T,300)
U = np.matrix(single_ham(0, Rx(np.pi), 2))
rho_expect = np.array(np.dot(np.dot(U, rho0), U.H))
Density_Matrix(np.real(rho_final))
Density_Matrix(np.imag(rho_final))
print(fidelity(rho_final, rho_expect))
