from plot_quantum_circuit import plot_quantum_circuit
from Init_State import init_vector
import matplotlib.pyplot as plt
from JSON_Port import read_json,Apply_Gate_Sets

cir = []
q = init_vector([0,0,0])
q,cir = Apply_Gate_Sets(q ,read_json("./gate_sets.json"))
fig,ax = plot_quantum_circuit(cir)
print(q)
plt.show()
