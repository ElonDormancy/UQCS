#ifndef _MatrixMul
#define _MatrixMul

#include "datatypes.h"
#include <string>
#include <vector>
using namespace std;

extern "C" MatrixC MatrixMul(gate Gate, MatrixC mat, u_int N);

#endif
