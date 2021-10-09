#include "cuda_runtime.h" 
#include "cublas_v2.h" 
#include <iostream>
#include "datatypes.h"
#include "MulcuBLAS.cuh"
#include <complex>
using namespace std;

extern "C" MatrixC MatrixMul(gate Gate, MatrixC mat, u_int N)
{
    // 定义状态变量 
    cublasStatus_t status;
    // 在内存中为将要计算的矩阵开辟空间 
    cuDoubleComplex* h_A = (cuDoubleComplex*)malloc(2 * 2 * sizeof(cuDoubleComplex));
    cuDoubleComplex* h_B = (cuDoubleComplex*)malloc(2 * N * sizeof(cuDoubleComplex));
    // 在内存中为将要存放运算结果的矩阵开辟空间 
    cuDoubleComplex* h_C = (cuDoubleComplex*)malloc(2 * N * sizeof(cuDoubleComplex));
    // 打印待测试的矩阵 
    int k_gate = 0;
    for (int i = 0; i < 2; i++)
    {
        for (int j = 0; j < 2; j++)
        {
            h_A[k_gate] = make_cuDoubleComplex(real(Gate(i,j)), imag(Gate(i,j)));
            k_gate++;
        }
    }
    int k_mat = 0;
    for (int i = 0; i < 2; i++)
    {
        for (int j = 0; j < N; j++)
        {
            h_B[k_mat] = make_cuDoubleComplex(real(mat(i, j)), imag(mat(i, j)));
            k_mat++;
        }
    }
    /*
        ** GPU 计算矩阵相乘
        */
        // 创建并初始化 CUBLAS 库对象
    cublasHandle_t handle;
    status = cublasCreate(&handle);
    if (status != CUBLAS_STATUS_SUCCESS)
    {
        if (status == CUBLAS_STATUS_NOT_INITIALIZED) {
            cout << "CUBLAS 对象实例化出错" << endl;
        }
        getchar();
    }
    cuDoubleComplex* d_A, * d_B, * d_C;
    // 在 显存 中为将要计算的矩阵开辟空间 
    cudaMalloc(
        (void**)&d_A, // 指向开辟的空间的指针 
        2 * 2 * sizeof(cuDoubleComplex) //　需要开辟空间的字节数 
    );
    cudaMalloc(
        (void**)&d_B,
        2 * N * sizeof(cuDoubleComplex)
    );
    // 在 显存 中为将要存放运算结果的矩阵开辟空间 
    cudaMalloc(
        (void**)&d_C,
        2 * N * sizeof(cuDoubleComplex)
    );
    // 将矩阵数据传递进 显存 中已经开辟好了的空间 
    cublasSetVector(
        2 * 2, // 要存入显存的元素个数 
        sizeof(cuDoubleComplex), // 每个元素大小 
        h_A, // 主机端起始地址 
        1, // 连续元素之间的存储间隔 
        d_A, // GPU 端起始地址 
        1 // 连续元素之间的存储间隔 
    );
    cublasSetVector(
        2 * N,
        sizeof(cuDoubleComplex),
        h_B,
        1,
        d_B,
        1
    );
    // 同步函数
    cudaThreadSynchronize();
    // 传递进矩阵相乘函数中的参数，具体含义请参考函数手册。 
    cuDoubleComplex a = make_cuDoubleComplex(1.0, 0); cuDoubleComplex b = make_cuDoubleComplex(0, 0);
    // 矩阵相乘。该函数必然将数组解析成列优先数组 
    cublasZgemm(
        handle, // blas 库对象 
        CUBLAS_OP_N, // 矩阵 A 属性参数 
        CUBLAS_OP_N, // 矩阵 B 属性参数
        N, // A, C 的行数 
        2, // B, C 的列数
        2, // A 的列数和 B 的行数
        &a, // 运算式的 α 值 
        d_B, // A 在显存中的地址 
        N, // lda 
        d_A, // B 在显存中的地址 
        2, // ldb 
        &b, // 运算式的 β 值 
        d_C, // C 在显存中的地址(结果矩阵) 
        N // 
    );
    // 同步函数 
    cudaThreadSynchronize();
    // 从 显存 中取出运算结果至 内存中去
    cublasGetVector(2 * N, // 要取出元素的个数 
        sizeof(cuDoubleComplex), // 每个元素大小 
        d_C, // GPU 端起始地址 
        1, // 连续元素之间的存储间隔 
        h_C, // 主机端起始地址
        1 // 连续元素之间的存储间隔 
    );
    MatrixC mat_o = MatrixC::Zero(2, N);
    int k_o = 0;
    for (int i = 0; i < 2; i++)
    {
        for (int j = 0; j < N; j++)
        {
            mat_o(i,j) = { cuCreal(h_C[k_o]) ,cuCimag(h_C[k_o]) };
        }
    };
    // 清理掉使用过的内存 
    free(h_A);
    free(h_B);
    free(h_C);
    cudaFree(d_A);
    cudaFree(d_B);
    cudaFree(d_C);
    // 释放 CUBLAS 库对象
    cublasDestroy(handle);
    return mat_o;
}