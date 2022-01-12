import numpy as np
def tex_initial_states(init_qubit):
    """Initial states are texed."""
    initial_state = []
    initial_state = [''.join(["& \lstick{\ket{", str(init_qubit[row]),"}}"]) for row in range(len(init_qubit))]
    return initial_state
def Qcircuit_plot(qubits,gates):
    cir = np.zeros(len(qubits))
    cir = list(map(lambda i: "",cir))
    init_state = tex_initial_states(qubits)
    n = len(init_state)
    for i in range(n):
        cir[i] += init_state[i]
    for i in range(len(gates)):
        if(gates[i]["whether_control"]):
            ctrl = gates[i]['gate_infor']['ctrl']
            ctrlgate = gates[i]['gate_infor']['ctrlgate']
            ctrl_rows = int(ctrl["rows"])
            ctrlgate_rows = int(ctrlgate["rows"])
            for j in range(n):
                if(j==ctrl_rows):
                    cir[ctrl_rows]+=" & \ctrl{"+str(ctrlgate_rows-ctrl_rows)+ "} "
                    if(ctrlgate["gateclass"]=="X"):
                        cir[ctrlgate_rows]+=" & \\targ "
                    else:
                        cir[ctrlgate_rows]+=" & \gate{"+ctrlgate["gateclass"]+"} "
                elif(j==ctrlgate_rows):
                    continue
                else:
                    cir[j]+="& \qw "
        else:
            rows = int(gates[i]["rows"])
            gateclass = gates[i]["gate_infor"]
            for j in range(n):
                if(j==rows):
                    cir[rows]+="& \gate{"+gateclass+"}"
                else:
                    cir[j]+="& \qw"
    for j in range(n-1):
        cir[j]+="\\\\ \n"  
    return cir
def write_output(data,file):
    """Outputs only quantikz environment."""
    Qcircuit_file = open(file, "w")
    Qcircuit_file.write("\\Qcircuit @C=1em @R=.7em {\n")
    for line in data:
        Qcircuit_file.write(line)
    Qcircuit_file.write(" \n}")
    Qcircuit_file.close()
