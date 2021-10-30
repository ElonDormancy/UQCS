#include "datatypes.h"
#include "CGO.h"
#include <vector>
using namespace std;

string i2b(int n)
{
    string r;
    while (n != 0) {
        r += (n % 2 == 0 ? "0" : "1");
        n /= 2;
    }
    return r;
}



VectorC CGateOperator(VectorC vec_state, u_int ctrl, u_int targ, gate Gate)
{
    u_int n = vec_state.size();
    u_int m = log2(n);
    VectorC vec = VectorC::Zero(n);
    vector<int> powv;
    int j = 0;
    for (int i = 0; i < n; i++)
    {

        int k = i + pow(2, (m - targ - 1));
        if (!(count(powv.begin(), powv.end(), i)))
        {
            if (i2b(i).at(ctrl) == 1)
            {
                MatrixC temp = MatrixC::Zero(0, 2);
                temp(0, 0) = vec_state(i);
                temp(0, 1) = vec_state(k);
                MatrixC state = Gate * temp;
                vec(j) = state(0, 0);
                vec(k) = state(0, 1);
                powv.push_back(k);
                j++;
            }
            else
            {
                vec(j) = vec_state(i);
                vec(k) = vec_state(k);
                powv.push_back(k);
                j++;
            }
        };
    };
    return vec;
};
