#include "datatypes.h"
#include "init.h"
#include <Eigen\Dense>

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
{       return VectorXd::Zero(n);
};