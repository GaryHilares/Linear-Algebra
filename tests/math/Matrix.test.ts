import { describe, test, expect } from "@jest/globals";
import { Rational } from "../../src/math/Rational";
import { Matrix } from "../../src/math/Matrix";

describe("Matrix module", () => {
    test("1x1 matrix should be correctly reduced to RREF", () => {
        expect(
            new Matrix(1, 1, [new Rational()]).rref().get(0, 0).equalsZero()
        ).toBeTruthy();
        expect(
            new Matrix(1, 1, [new Rational(1)]).rref().get(0, 0).equalsOne()
        ).toBeTruthy();
        expect(
            new Matrix(1, 1, [new Rational(2)]).rref().get(0, 0).equalsOne()
        ).toBeTruthy();
        expect(
            new Matrix(2, 2, [
                new Rational(2),
                new Rational(2),
                new Rational(2),
                new Rational(2),
            ])
                .rref()
                .toString()
        ).toBe("1 1\n0 0\n");
    });
    // TODO: Add more tests.
});
