# Quantum Simulator

[![](https://img.shields.io/badge/Platform-Python-lightgrey)](https://www.python.org/)  [![](https://img.shields.io/badge/Platform-C%2FC%2B%2B-lightgrey)](https://www.cplusplus.com/)  ![](https://img.shields.io/badge/Platform-Javascript-lightgrey)

The Quantum Simulator Project with for-loop method to apply the single qubit gate or two-qubit gate on the qubit and the process is able to accelerate with parallel computation,And you are easily constructing the single qubit gate or control gate via inputting the matrix form of the gate.

Because of the Quantum Plot engine:https://github.com/rpmuller/PlotQCircuit The Python version of the quantum simulator is able to plot the quantum circuit as while as the psi evolution.

And C++ version is able to realize the more effective and the main idea to accelerate the speed of QuantumSimulator is to accelerate the for loop,further,MPI lib or CUDA(Or Other Libs) will in usage.

## 易

"易(Yi)" is a visualized universial quantum circuits[The limit on the number of qubits is 12] makes it extremely easy to build quantum circuits,intended to help people in about construct quantum circuits.

When the number of qubits more than 12,"易" will act as a kit to plot quantum circuit,which then are able to be exported to, for example, [Qiskit][https://www.qiskit.org/] or our own compiler to compile.
