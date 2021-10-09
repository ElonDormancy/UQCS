#include "H.h"
#include<string>
#include"datatypes.h"
#include <vector> 
using namespace Eigen;
using namespace std;
H::H(VectorC psi,gate Gate, u_int index, string GateName)
{
	this->m_psi = psi;
	this->m_Gate = Gate;
	this->m_index = index;
};

VectorC H::GateOperator(VectorC vec_state, u_int index, gate Gate)
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
        return H::mat_trans2vector(mat_order, Gate * mat);
};