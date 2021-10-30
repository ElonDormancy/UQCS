#include "datatypes.h"
#include "SGO.h"
#include <vector>
#include <iostream>
#include <omp.h> 
using namespace std;

VectorC SGateOperator(VectorC vec_state, u_int index, gate SGate)
{
    u_int n = vec_state.size();
    u_int m = log2(n);
    VectorC vec = VectorC::Zero(n);
    
#pragma omp parallel
    {   vector<int> powv;
#pragma omp for nowait
        for (int i = 0; i < n; i++)
        {
            int k = i + pow(2, (m - index - 1));
            if (!(count(powv.begin(), powv.end(), i)))
            {
                MatrixC temp = MatrixC::Zero(2, 1);
                temp(0, 0) = vec_state(i);
                temp(1, 0) = vec_state(k);
                MatrixC state = SGate * temp;
                vec(i) = state(0, 0);
                vec(k) = state(1, 0);
                powv.push_back(k);
            };
        };
    }
    return vec;
};
