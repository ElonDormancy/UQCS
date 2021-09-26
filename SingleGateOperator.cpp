#include <iostream>
#include <algorithm>
#include<string>
#include<complex>
#include <Eigen\Dense>
#include <vector> 
#include <math.h>
#include "data_type.h"
#include <time.h>
using namespace Eigen;
using namespace std;

VectorC mat_trans2vector(MatrixXd mat_order, MatrixC mat)
{
    u_int n = mat.size();
    Map<RowVectorXd> v_order(mat_order.data(), n);
    Map<VectorC> v(mat.data(), n);
    VectorC vec = VectorC::Zero(n);
    for (u_int i = 0; i < n; i++)
    {
        int index = v_order(i);
        vec(index) = v(i);
    }
    return vec;

};
VectorC oper(VectorC vec_state, u_int index, gate Gate)
{
    u_int n = vec_state.size();
    u_int m = log2(n);
    u_int n2 = n / 2;
    MatrixC mat = MatrixXd::Zero(2, n2);
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
    return mat_trans2vector(mat_order,Gate * mat);

};

/*
VectorC op(VectorC vec_state, u_int index)
{
    MatrixC X = MatrixC::Zero(2, 2);
    X << 0, 1,
        1, 0;
    u_int n = vec_state.size();
    u_int m = log2(n);
    u_int i = 0;
    u_int n2 = n / 2;
    MatrixC mat = MatrixC::Zero(2, n2);
    MatrixC mat_order(2, n2);
    vector<u_int> v;
    for (u_int i = 0; i < n; i++)
    {
        v.push_back(i);
    }
    for (vector<u_int>::iterator it = v.begin(); it != v.end(); it++)
    {
        u_int k= *it + pow(2, (m - index - 1));
        mat(0, i) = vec_state(*it);
        mat(1, i) = vec_state(k);
        mat_order(0, i) = *it;
        mat_order(1, i) = k;
        v.erase(v.begin() + k);
    };
    return mat;
    };
*/


VectorXd init_vector(VectorXd psi)
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

void main()
{/*
    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &myid);
    MPI_Comm_size(MPI_COMM_WORLD, &numprocs);

    pru_intf("%d Hello world from process %d \n", numprocs, myid);

    MPI_Finalize();

    return 0;*/
    u_int qubit_number = 16;
    VectorXd psi = VectorXd::Zero(qubit_number);
    VectorC vec_state = init_vector(psi);
    u_int index = 1;
    gate X = MatrixC::Zero(2, 2);
    X << 0, 1,
        1, 0;
    
    clock_t start = clock();
    oper(vec_state, index, X);
    clock_t ends = clock();
    cout << "Running Time : " << (double)(ends - start) / CLOCKS_PER_SEC << endl;
    /*
    for (vector<u_int>::iterator it = v.begin(); it < v.end(); it++)
    {
        u_int k = *it + pow(2, (m - index - 1));
        cout << "it: "<< * it << endl;
        cout << "k: " << k << endl;
        it = v.erase(v.begin() + k);
        for (u_int i = 0; i < v.size(); ++i) {
            std::cout << v[i] << " ";
        }
    };
    for (u_int array : v) {
        u_int k = array + pow(2, (m - index - 1));
        v = v.erase(v.begin() + k);
        for (u_int i = 0; i < v.size(); ++i) {
            std::cout << v[i] << " ";
        }
    }*/

};
