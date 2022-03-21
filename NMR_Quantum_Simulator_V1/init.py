import numpy as np
import matplotlib.pyplot as plt
import matplotlib.cm as cm

# Init function


def i2b_array(k, n):
    f = bin(k).replace('0b', '')
    while(len(f) < n):
        f = "0" + f
    array = []
    for i in f:
        array.append(int(i))
    return array


def i2b_str(k, n):
    f = bin(k).replace('0b', '')
    while(len(f) < n):
        f = "0" + f
    return "|"+f+">"


def Density_Matrix(rho):
    N = rho.shape[0]
    n = int(np.log2(N))
    x = np.array(range(0, N), int)
    kets = list(map(lambda k: i2b_str(k, n), x))
    y = x.copy()
    xpos, ypos = np.meshgrid(x, y)
    z = rho
    xpos = xpos.flatten()
    ypos = ypos.flatten()
    zpos = np.zeros_like(xpos)
    dx = 0.7*np.ones_like(zpos)
    dy = dx.copy()
    dz = z.flatten()
    fig = plt.figure(figsize=(N, N))
    ax = fig.add_subplot(111, projection='3d')
    cmap = cm.get_cmap('autumn')  # Get desired colormap - you can change this!
    # scale each z to [0,1], and get their rgb values
    rgba = [cmap(np.abs(k)) for k in dz]
    ax.bar3d(xpos, ypos, zpos, dx, dy, dz,
             color=rgba, alpha=0.9, edgecolor='black')
    ax.set_zlim(-1, 1)
    # ax.set_zlim(-np.max(np.abs(z)),np.max(np.abs(z)))
    ax.view_init(elev=25, azim=45)
    plt.xticks(x, kets)
    plt.yticks(y, kets)
    plt.show()

# Initial State Preparation


def init_state(qubit):
    index = 0
    length = len(qubit)
    n = 2**length
    state = np.zeros(n)
    for i in range(length):
        index += qubit[length - i - 1] * 2**i
    state[index] = 1
    return state


def Initial_Rho(eta, qubit):
    init_states = init_state(qubit)
    N = len(init_states)
    rho_pps = (1-eta)*np.identity(N)+eta*np.outer(init_states, init_states)
    return rho_pps


def hermConj(mat):
    matDagger = mat.conjugate().transpose()
    return matDagger


def fidelity(experimentalState, theoreticalState):
    # simple equation for fidelity
    f = hermConj(theoreticalState).dot(experimentalState).dot(theoreticalState)
    return np.trace(f.real)
