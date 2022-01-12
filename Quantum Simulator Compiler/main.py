from plot_quantum_circuit import plot_quantum_circuit
from Init_State import init_vector
import matplotlib.pyplot as plt
from JSON_Port import read_json,Apply_Gate_Sets
from Qcircuit_Port import Qcircuit_plot,write_output
cir = []
qubits,gate_sets = read_json("./gate_sets.json")
q = init_vector(qubits)
write_output(Qcircuit_plot(qubits,gate_sets),"main.tex")
q,cir = Apply_Gate_Sets(q ,gate_sets)
fig,ax = plot_quantum_circuit(qubits,cir)
print(q)
plt.show()
