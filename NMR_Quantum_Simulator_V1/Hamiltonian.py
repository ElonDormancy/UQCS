import numpy as np
from Chebyshev import Chebyshev
sigma_x = np.array([[0, 1], [1, 0]])
sigma_y = np.array([[0, -1j], [1j, 0]])
sigma_z = np.array([[1, 0], [0, -1]])
I = np.identity(2)
hbar = 1



# Construct Hamiltonian
# index:The index of pauli_matrix operate
# Pauli_Matrix:The class of Pauli_Matrix
# N:The total number of spin


def single_ham(index, Pauli_Matrix, N):
    if(index > N-1):
        raise Exception("Index is beyond N")
    if(index == 0):
        ham = Pauli_Matrix
    else:
        ham = I
    for i in range(1, N):
        if i == index:
            ham = np.kron(ham, Pauli_Matrix)
        else:
            ham = np.kron(ham, I)
    return ham


def double_ham(i, j, Pauli_Matrix_i, Pauli_Matrix_j, N):
    if(i > N-1 or j > N-1):
        raise Exception("Index is beyond N")
    elif(i == j):
        raise Exception("Two index are the same")
    if(i == 0):
        ham = Pauli_Matrix_i
    elif(j == 0):
        ham = Pauli_Matrix_j
    else:
        ham = I
    for index in range(1, N):
        if index == i:
            ham = np.kron(ham, Pauli_Matrix_i)
        elif index == j:
            ham = np.kron(ham, Pauli_Matrix_j)
        else:
            ham = np.kron(ham, I)
    return ham


def rotate_frame_hamiltonian(t, w, wrf, parameter, phi):
    N = len(w)
    H_Control = 0
    Coupling_ham = 0
    for i in range(N):
        H_Control += w[i]*(np.cos((wrf - parameter[i][i])*np.pi*t+phi)*single_ham(
            i, sigma_x, N)+np.sin((wrf - parameter[i][i])*np.pi*t+phi)*single_ham(i, sigma_y, N))
    for i in range(N):
        for j in range(i+1, N):
            Jij = parameter[i][j]
            Coupling_ham += hbar*Jij*np.pi * \
                double_ham(i, j, sigma_z, sigma_z, N)/2
    return H_Control+Coupling_ham


def rotate_psi(t, parameter):
    N = parameter.shape[0]
    U0 = np.identity(N**2)
    for i in range(N):
        Ham = parameter[i][i]*np.pi*single_ham(i, sigma_z, N)
        U = np.matrix(Chebyshev(t, Ham))
        U0 = np.dot(U, U0)
    return U0.H


def Time_Evolution_Frame(t, dt, rho, w, wrf, parameter, phi):
    rho0 = rho
    for i in range(int(t/dt)):
        Ham = rotate_frame_hamiltonian(i*dt, w, wrf, parameter, phi)
        U = np.matrix(Chebyshev(dt, Ham))
        rhot = np.dot(U, rho0)
        rho0 = np.dot(rhot, U.H)
    Urf = np.matrix(rotate_psi(t, parameter))
    rho1 = np.dot(Urf, rho0)
    rho2 = np.dot(rho1, Urf.H)
    return np.array(rho2)


def GAD_Matrix(t, T1, Temperature, wi):
    p = 0.5+2*10**(-12)*wi/Temperature
    gamma = 1-np.exp(-t/T1)
    E0 = np.sqrt(p)*np.array([[1, 0], [0, np.sqrt(1-gamma)]])
    E1 = np.sqrt(p)*np.array([[0, np.sqrt(gamma)], [0, 0]])
    E2 = np.sqrt(1-p)*np.array([[np.sqrt(1-gamma), 0], [0, 1]])
    E3 = np.sqrt(1-p)*np.array([[0, 0], [np.sqrt(gamma), 0]])
    return E0, E1, E2, E3


def PD_Matrix(t, T2):
    lam = 0.5*(1+np.exp(-t/T2))
    E0 = np.sqrt(lam)*I
    E1 = np.sqrt(1-lam)*sigma_z
    return E0, E1


def noise_kraus(rho, t, GAD, PD, Temperature, parameter):
    N = parameter.shape[0]
    rho0 = rho
    for i in range(N):
        E_GAD_0, E_GAD_1, E_GAD_2, E_GAD_3 = GAD_Matrix(
            t, GAD[i], Temperature, parameter[i][i])
        E_PD_0, E_PD_1 = PD_Matrix(t, PD[i])
        E_PD_0, E_PD_1 = single_ham(i, E_PD_0, N), single_ham(i, E_PD_1, N)
        E_GAD_0, E_GAD_1, E_GAD_2, E_GAD_3 = np.matrix(single_ham(i, E_GAD_0, N)), np.matrix(single_ham(
            i, E_GAD_1, N)), np.matrix(single_ham(i, E_GAD_2, N)), np.matrix(single_ham(i, E_GAD_3, N))
        rho1 = np.dot(np.dot(E_GAD_0, rho0), E_GAD_0.H)+np.dot(np.dot(E_GAD_1, rho0), E_GAD_1.H) + \
            np.dot(np.dot(E_GAD_2, rho0), E_GAD_2.H) + \
            np.dot(np.dot(E_GAD_3, rho0), E_GAD_3.H)
        rho0 = np.dot(np.dot(np.matrix(E_PD_0), rho1), np.matrix(
            E_PD_0).H)+np.dot(np.dot(np.matrix(E_PD_1), rho1), np.matrix(E_PD_1).H)
    return np.array(rho0)


def Time_Evolution_Tot(t, dt, w, wrf, parameter, phi, rho0, GAD, PD, Temperature):
    rf = Time_Evolution_Frame(t, dt, rho0, w, wrf, parameter, phi)
    rho_noise = noise_kraus(rf, t, GAD, PD, Temperature, parameter)
    return rho_noise
