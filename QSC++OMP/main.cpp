#include "datatypes.h"
#include "init.h"
#include "SGO.h"
#include "CGO.h"
#include "SingleGateSets.h"
#include <time.h>
#include <iostream>
#include <vector>
using namespace std;


void main()
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