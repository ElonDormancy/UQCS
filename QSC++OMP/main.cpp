#include <iostream>
#include "datatypes.h"
#include "init.h"
#include "SingleGateOperator.h"
#include "ControlGateOperator.h"
#include "SingleGateSets.h"
#include <Eigen\Dense>
#include <time.h>
#include <stdio.h> 
#include <stdlib.h> 
#include <Eigen/Core>


using namespace std;

int main(int argc, char** argv)
{
    SingleGate Gate;
    u_int n = 16;
    u_int ctrl = 0;
    u_int index = 1;
    VectorXd psi = init_psi(n);
    VectorC vec_state = init_vector(psi);
    clock_t start = clock();
    SGateOperator(vec_state,index, Gate.X);
    clock_t ends = clock();
    cout << "Running Time : " << (double)(ends - start) / CLOCKS_PER_SEC << endl;
};
/*
int main(int argc, char* argv[])
//      int argc; 
//      char *argv[]; 
{
#pragma omp parallel 
    {
        printf("the number of thread = %d\n", omp_get_thread_num());
    }
	system("pause");
	return 0;
};*/