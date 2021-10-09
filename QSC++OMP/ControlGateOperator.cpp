#include "datatypes.h"
#include <string>
#include <Eigen\Dense>
#include "ControlGateOperator.h"
#include <vector>
#include <iostream>
using namespace Eigen;
using namespace std;

string i2b(int n, int qubit_number)
{
    string r;
    for (int i=0; i < qubit_number; i++)
    {
        r += (n % 2 == 0 ? "1" : "0");
        n /= 2;
    }
    return r;
}


VectorC mat_trans2vec(MatrixXd mat_order, MatrixC mat)
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


VectorC CGateOperator(VectorC vec_state, u_int ctrl, u_int targ, gate Gate)
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

        int k = *itr + pow(2, (m - targ - 1));
        if (!(count(powv.begin(), powv.end(), *itr)))
        {   
            if (i2b(*itr, m)[ctrl] == 49)
            {
                MatrixC temp = MatrixXd::Zero(2, 1);
                temp(0, 0) = vec_state(*itr);
                temp(1, 0) = vec_state(k);
                MatrixC state = Gate * temp;
                mat(0, j) = state(0, 0);
                mat(1, j) = state(1, 0);
                
            }
            else
            {
                mat(0, j) = vec_state(*itr);
                mat(1, j) = vec_state(k);
            }
            mat_order(0, j) = *itr;
            mat_order(1, j) = k;
            powv.push_back(k);
            j++;
        };
    };
    return mat_trans2vec(mat_order, mat);
};

