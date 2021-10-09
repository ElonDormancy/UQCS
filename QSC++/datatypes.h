#ifndef _DATA_TYPES
#define _DATA_TYPES

#include<string>
#include<complex>
#include <Eigen\Dense>

#define PI 3.14159265358979

typedef unsigned int u_int;
typedef std::complex<double> d_complex;
typedef Eigen::Matrix<d_complex, Eigen::Dynamic, 1> VectorC;
typedef Eigen::Matrix<d_complex, Eigen::Dynamic, Eigen::Dynamic> gate;
typedef Eigen::Matrix<d_complex, Eigen::Dynamic, Eigen::Dynamic> MatrixC;

#endif
