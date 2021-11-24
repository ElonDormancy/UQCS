[![](https://img.shields.io/badge/Platform-Python-lightgrey)](https://www.python.org/)  [![](https://img.shields.io/badge/Platform-C%2FC%2B%2B-lightgrey)](https://www.cplusplus.com/)  ![](https://img.shields.io/badge/Platform-Javascript-lightgrey)



# Quantum Simulator

The Quantum Simulator Project with for-loop method to apply the single qubit gate or two-qubit gate on the qubit and the process is able to accelerate with parallel computation,And you are easily constructing the single qubit gate or control gate via input the matrix form of the gate.

Because of the Plot engine:https://github.com/rpmuller/PlotQCircuit The Python version of the quantum simulator is able to plot the quantum circuit as while as the psi evolution.

The example in [Quantum Simulator Plot Example.ipynb][https://github.com/ElonDormancy/QuantumSimulator/blob/develop/QS/Example.ipynb]

For example four quantum fourier transform[without SWAP]

```
psi = [0.25+0.j 0.25+0.j 0.25+0.j 0.25+0.j 0.25+0.j 0.25+0.j 0.25+0.j 0.25+0.j
       0.25+0.j 0.25+0.j 0.25+0.j 0.25+0.j 0.25+0.j 0.25+0.j 0.25+0.j 0.25+0.j]
```

![QFT 4 qubits py](https://github.com/ElonDormancy/QuantumSimulator/blob/main/doc/QFT%204%20qubits%20py.png)

And C++ version is able to realize the goal more effective and the Main idea to accelerate the speed of QuantumSimulator is to accelerate the for loop,further I will use the MPI lib or CUDA(Or Other Libs) to do it.



| Single Gate      | Control Gate      |
| ---------------- | ----------------- |
| H[Hadamard Gate] | CNOT              |
| X[Pauil-X Gate]  | Control R(n) Gate |
| Y[Pauil-Y Gate]  | /                 |
| Z[Pauil-Y Gate]  | /                 |
| S[Pi/4 Gate]     | /                 |
| T[Pi/8 Gate]     | /                 |
| R(n)[Phase Gate] | /                 |



----

## Drag-Drop Quantum Simulator

Because of the most fabulous interactive effect with Javasciprt and Drag and drop to draw quantum circuits instead of coding is a more intuitive way.Fortunately with render of [qviz](https://github.com/microsoft/quantum-viz.js),we are able to drag and drop to plot such beautiful quantum circuit that just move your fingers.[The Drag and drop can also use in your mobile devices]

### Example

<img src="https://github.com/ElonDormancy/QuantumSimulator/blob/main/doc/QFT%205.gif" alt="QFT Five Qubit" style="zoom:200%;" />

### Result

Provide density matrix and histogram form to have a better visualization of the final state.

<img src="https://github.com/ElonDormancy/QuantumSimulator/blob/main/doc/drag%20and%20drop.gif" style="zoom:150%;" />

Try it by yourself https://elondormancy.github.io/QuantumSimulator/!

