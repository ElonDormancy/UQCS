import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.cm as cm
def i2b_array(k,n):
    f = bin(k).replace('0b','')
    while(len(f) < n):
        f = "0"+ f
    array = []
    for i in f:
        array.append(int(i))
    return array
def i2b_str(k,n):
    f = bin(k).replace('0b','')
    while(len(f) < n):
        f = "0"+ f
    return "|"+f+">"
def Density_Matrix(rho):
    N = rho.shape[0]
    n=  int(np.log2(N))
    x = np.array(range(0, N), int)
    kets = list(map(lambda k:i2b_str(k,n),x))
    y = x.copy()                     
    xpos, ypos = np.meshgrid(x, y)
    z = rho
    xpos = xpos.flatten()
    ypos = ypos.flatten()
    zpos = np.zeros_like(xpos)
    dx = 0.7*np.ones_like(zpos)
    dy = dx.copy()
    dz = z.flatten()
    fig = plt.figure(figsize=(N,N))
    ax = fig.add_subplot(111,projection = '3d')
    cmap = cm.get_cmap('autumn')
    rgba = [cmap(np.abs(k)) for k in dz]
    ax.bar3d(xpos, ypos, zpos, dx, dy, dz, color=rgba, alpha=0.9, edgecolor='black')
    ax.view_init(elev=20,azim=40)
    plt.xticks(x,kets)
    plt.yticks(y,kets)
    plt.show()
