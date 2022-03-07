<p align="center">
    <img src="https://github.com/ElonDormancy/QuantumSimulator/blob/main/doc/title.png" alt="title" width="80%"/>
</p>

# Quantum Simulator

[![](https://img.shields.io/badge/Platform-Python-lightgrey)](https://www.python.org/)  [![](https://img.shields.io/badge/Platform-C%2FC%2B%2B-lightgrey)](https://www.cplusplus.com/)  ![](https://img.shields.io/badge/Platform-Javascript-lightgrey)

The Quantum Simulator Project with for-loop method to apply the single qubit gate or two-qubit gate on the qubit and the process is able to accelerate with parallel computation,And you are easily constructing the single qubit gate or control gate via inputting the matrix form of the gate.

C++ version is able to realize the more effective and the main idea to accelerate the speed of QuantumSimulator is to accelerate the for loop,further,MPI lib or CUDA(Or Other Libs) will in usage.

## User's Manual
[YI](https://github.com/ElonDormancy/QuantumSimulator/wiki/YI)

[Quantum Simulator Compiler](https://github.com/ElonDormancy/QuantumSimulator/wiki/Quantum-Simulator-Compiler-Yi)

## 易

### Open Source Package Usage:

+ [math.js](https://mathjs.org/) 
+ [d3.js](https://d3js.org/)
+ [quantum-viz.js](https://github.com/microsoft/quantum-viz.js)

### Introduction

"易(Yi)" is a visualized universial quantum circuits[The limit on the number of qubits is 12] makes it extremely easy to build quantum circuits,intended to help people in about construct quantum circuits.

When the number of qubits more than 12,"易" will act as a kit to plot quantum circuit,which then are able to be exported to, for example, [Qiskit](https://www.qiskit.org/) or our own compiler to compile.

Try it out:
[易](https://elondormancy.github.io/QuantumSimulator/)

### Examples

Drag to plot

<p align="center">
    <img src="https://github.com/ElonDormancy/QuantumSimulator/blob/main/doc/drag_demo_1.gif" alt="screenshot of save circuit" width="100%"/>
</p>

Result:

<p align="center">
    <img src="https://github.com/ElonDormancy/QuantumSimulator/blob/main/doc/drag_demo_2.gif" alt="screenshot of save circuit" width="100%"/>
</p>

--

## Quantum Simulator Compiler

The json file exported from "易" can load in our own [Quantum Simulator Compiler](https://github.com/ElonDormancy/QuantumSimulator/tree/develop/Quantum%20Simulator%20Compiler),which provides a universial without limit of the number of qubits.

Because of the Quantum Plot engine:https://github.com/rpmuller/PlotQCircuit The Python version of the quantum simulator is able to plot the quantum circuit as while as the psi evolution.

### Example

QFT with three qubits

Save JSON:

<p align="center">
    <img src="https://github.com/ElonDormancy/QuantumSimulator/blob/main/doc/QFT3_Save.png" alt="screenshot of save circuit" width="100%"/>
</p>

Load JSON:

[Quantum Simulator Compiler compile](https://github.com/ElonDormancy/QuantumSimulator/blob/develop/Quantum%20Simulator%20Compiler/QuantumSimulatorCompilerExample.ipynb)

```python
%matplotlib inline
from plot_quantum_circuit import plot_quantum_circuit
from Init_State import init_vector
from JSON_Port import read_json,Apply_Gate_Sets

cir = []
qubits,gate_sets = read_json("./content.json")
q = init_vector(qubits)
write_output(Qcircuit_plot(qubits,gate_sets),"main.tex")
q,cir = Apply_Gate_Sets(q ,gate_sets)
print(q)
plot_quantum_circuit(cir)
```

```python
[0.35355339+0.j 0.35355339+0.j 0.35355339+0.j 0.35355339+0.j
 0.35355339+0.j 0.35355339+0.j 0.35355339+0.j 0.35355339+0.j]
```

plot_quantum_circuit

<p align="center">
    <img src="https://github.com/ElonDormancy/QuantumSimulator/blob/main/doc/QFT3_Load.png" alt="screenshot of load circuit" width="60%"/>
</p>

Qcircuit

<p align="center">
    <img src="https://github.com/ElonDormancy/QuantumSimulator/blob/main/doc/QFT3_Load_Qcircuit.png" alt="screenshot of load circuit" width="60%"/>
</p>
