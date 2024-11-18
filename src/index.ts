import { Matrix } from "./math/Matrix";
// import { Rational } from "./rational";
import { Polynomial, PolynomialFraction } from "./math/PolynomialFraction";

function main(): void {
    let matrix = new Matrix(2, 2, [
        new PolynomialFraction(new Polynomial([2])),
        new PolynomialFraction(new Polynomial([0, 1])),
        new PolynomialFraction(new Polynomial([0])),
        new PolynomialFraction(new Polynomial([0, 1])),
    ]);
    console.log(matrix.toString());
    for (let step of matrix.rref_steps()) {
        console.log(step.toString());
    }
}

main();

export {};
