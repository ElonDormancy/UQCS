#include "datatypes.h"
#include <string>
#include <Eigen\Dense>
#include <Eigen\Core>
#include "SingleGateOperator.h"
#include <vector> 
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
VectorC SGateOperator(VectorC vec_state, u_int index, gate SGate)
{
    u_int n = vec_state.size();
    u_int m = log2(n);
    u_int n2 = n / 2;
    d_complex** mat = new d_complex * [2];
    for (int i = 0; i < 2; i++)
        mat[i] = new d_complex[n2];
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
            mat[0][j]= vec_state(*itr);
            mat[1][j] = vec_state(k);
            powv.push_back(k);
            j++;
        };
    };
    return ;
};
