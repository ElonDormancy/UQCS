#include <iostream>
#include "datatypes.h"
#include "init.h"
#include "SingleGateOperator.h"
#include "ControlGateOperator.h"
#include "SingleGateSets.h"
#include <Eigen\Dense>
#include <time.h>
#include<mpi.h>
using namespace std;

int main(int argc, char** argv)
{
    SingleGate Gate;
    u_int n = 16;
    u_int ctrl = 0;
    u_int index = 1;
    VectorXd psi = init_psi(n);
    VectorC vec_state = init_vector(psi);
    MatrixC mat = MatrixXd::Zero(2,8);
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
	int myid, numprocs, namelen;
	char processor_name[MPI_MAX_PROCESSOR_NAME];

	MPI_Init(&argc, &argv);         starts MPI 
	MPI_Comm_rank(MPI_COMM_WORLD, &myid);   get current process id 
	MPI_Comm_size(MPI_COMM_WORLD, &numprocs);       get number of processes
	MPI_Get_processor_name(processor_name, &namelen);

	if (myid == 0) printf("number of processes: %d\n", numprocs);
	printf("%s: Hello world from process %d \n", processor_name, myid);

	MPI_Finalize();
	system("pause");
	return 0;
};  */