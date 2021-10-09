#include "SingleGateSets.h"
SingleGate::SingleGate()
{
	I = gate::Zero(2, 2);
	I << 1, 0,
		 0, 1;

	X = gate::Zero(2, 2);
	X << 0, 1,
		 1, 0;

	Y = gate::Zero(2, 2);
	Y << 0, d_complex{ 0, -1 },
		d_complex{ 0, 1 }, 0;

	Z = gate::Zero(2, 2);
	Z << 1, 0,
		0, -1;

	H = gate::Zero(2, 2);
	H << 1 / sqrt(2), 1 / sqrt(2),
		1 / sqrt(2), -1 / sqrt(2);

	S = gate::Zero(2, 2);
	S << 1, 0,
		0, d_complex{ 0, 1 };
	Sd = gate::Zero(2, 2);
	S << 1, 0,
		 0, d_complex{ 0, 1 };
	T = gate::Zero(2, 2);
	T << 1, 0,
		0, exp(d_complex{ 0, PI / 4 });
	Td = gate::Zero(2, 2);
	Td << 1, 0,
		0, exp(d_complex{ 0, -PI / 4 });
}