#include "datatypes.h"
#include <string>
#include <Eigen\Dense>
#include <Eigen\Core>
#include "SingleGateOperator.h"
#include <vector> 
#include <iostream>
#include <omp.h> 
using namespace Eigen;
using namespace std;
VectorC mat_trans2vector(MatrixXd mat_order, MatrixC mat)
{
    u_int n = mat.size();
    Map<RowVectorXd> v_order(mat_order.data(), n);
    Map<VectorC> v(mat.data(), n);
    VectorC vec = VectorC::Zero(n);
    int i = 0;
    omp_set_num_threads(4);
#pragma omp parallel for
    for (i=0; i < n; i++)
    {
        int index = v_order(i);
        vec(index) = v(i);
    }
    return vec;
};

VectorC SGateOperator(VectorC vec_state, u_int index, gate SGate)
{
    u_int n = vec_state.size();
    u_int m = log2(n);
    u_int n2 = n / 2;
    MatrixC mat = MatrixXd::Zero(2, n2);
    MatrixC mat_ret = MatrixXd::Zero(2, n2);
    MatrixXd mat_order = MatrixXd::Zero(2, n2);
    vector<int> v;
    vector<int> powv;
    for (int i = 0; i < n; i++)
    {
        v.push_back(i);
    }
    int j = 0;
    for (vector<int>::iterator itr = v.begin(); itr < v.end(); itr++)
    {

        int k = *itr + pow(2, (m - index - 1));
        if (!(count(powv.begin(), powv.end(), *itr)))
        {
            mat(0, j) = vec_state(*itr);
            mat(1, j) = vec_state(k);
            mat_order(0, j) = *itr;
            mat_order(1, j) = k;
            powv.push_back(k);
            j++;
        };
    };
    int num_threads = Eigen::nbThreads();
    mat_ret = SGate * mat;
    std::cout << "num_threads: " << num_threads << std::endl;
    return mat_trans2vector(mat_order, mat_ret);
};
