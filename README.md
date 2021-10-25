# QuantumSimulator
QuantumSimulator with plot
The Quantum Simulator coded with python but it can be improved by using fortran/C++ and Parallel Computing

## V1.0 Python

Plot engine:https://github.com/rpmuller/PlotQCircuit

Example:https://github.com/ElonDormancy/QuantumSimulator/blob/main/QS/Example.ipynb

## V2.0 C++
[C++ Single Gate Matrix Version](https://github.com/ElonDormancy/QuantumSimulator/tree/main/QSC%2B%2B)

In order to speed up the for loop, the <omp.h> library is used:

### C++ with OMP

[C++ Version with OMP](https://github.com/ElonDormancy/QuantumSimulator/tree/main/QSC%2B%2BOMP)


### C++ with cuBLAS

[C++ Version with cuBLAS](https://github.com/ElonDormancy/QuantumSimulator/tree/main/QSC%2B%2BcuBLAS)

The Main idea to accelerate the Speed of QuantumSimulator is to accelerate the for loop,further I will use the MPI lib or CUDA(Or Other Libs) to do it.

The Code'algorithm above is a **mistake**,but it still provide a idea to accelerate the calculation speed of QS.

## Drag-Drop Plot

Drag to plot the quantum circuit and render by [qviz](https://github.com/microsoft/quantum-viz.js)

Try it by yourself
https://elondormancy.github.io/QuantumSimulator/
