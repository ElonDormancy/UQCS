#include <iostream>
#include "datatypes.h"
#include "init.h"
#include "SingleGateOperator.h"
#include "ControlGateOperator.h"
#include "SingleGateSets.h"


int main(int argc, char** argv)
{
    u_int n = 3;
    u_int ctrl = 0;
    u_int index = 1;
    VectorXd psi = init_psi(n);
    SingleGate Gate;
    VectorC vec_state = init_vector(psi);
    cout << CGateOperator(vec_state, ctrl,index, Gate.H) << endl;
};