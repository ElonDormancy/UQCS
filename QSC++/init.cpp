#include "datatypes.h"
#include "init.h"
#include <Eigen\Dense>
using namespace std;
VectorC init_vector(VectorXd psi)
{

    u_int sum = 0;
    u_int n = psi.size();
    VectorXd vec_state = VectorXd::Zero(pow(2, n));
    for (u_int i = 0; i < n; i++)
    {
        sum += psi(n - i - 1) * pow(2, i);
    }
    vec_state(sum) = 1;
    return vec_state;
};

VectorXd  init_psi(u_int n)
{
    return VectorXd::Zero(n);
};

/*
d_complex eigenMatrix2matrix(MatrixC mat)
{
    int rows = mat.rows();
    int cols = mat.cols();
    d_complex** n2Arr = new d_complex * [rows];
    for (int i = 0; i < rows; i++)
        n2Arr[i] = new d_complex[cols];

    for (int j = 0; j < rows; j++)
        delete[] n2Arr[j];
    delete[] n2Arr;
};*/