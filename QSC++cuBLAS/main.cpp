#include <iostream>
#include "datatypes.h"
#include "init.h"
#include "SingleGateOperator.h"
#include "SingleGateSets.h"
#include <Eigen\Dense>
#include <time.h>
using namespace std;

int main(int argc, char** argv)
{
    SingleGate Gate;
    u_int n = 16;
    u_int index = 1;
    VectorXd psi = init_psi(n);
    VectorC vec_state = init_vector(psi);
    clock_t start = clock();
    SGateOperator(vec_state, index, Gate.X);
    clock_t ends = clock();
    cout << "Running Time : " << (double)(ends - start) / CLOCKS_PER_SEC << endl;
};