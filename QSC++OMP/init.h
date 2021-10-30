#ifndef _INIT
#define _INIT
#include "datatypes.h"
#include <Eigen\Dense>
using namespace Eigen;

VectorC init_vector(VectorXd psi);
VectorXd  init_psi(u_int n);
#endif
