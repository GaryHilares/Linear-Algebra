import { describe, test, expect } from "@jest/globals";
import { Rational } from "../../src/model/Rational";
import { Matrix, OutOfBondsAccess } from "../../src/model/Matrix";

describe("Matrix module", () => {
    describe("Test computeRref", () => {
        test("1x1 matrix should be correctly reduced to RREF", () => {
            expect(
                new Matrix(1, 1, [[new Rational()]])
                    .computeRref()
                    .get(0, 0)
                    .equalsZero()
            ).toBeTruthy();
            expect(
                new Matrix(1, 1, [[new Rational(1)]])
                    .computeRref()
                    .get(0, 0)
                    .equalsOne()
            ).toBeTruthy();
            expect(
                new Matrix(1, 1, [[new Rational(2)]])
                    .computeRref()
                    .get(0, 0)
                    .equalsOne()
            ).toBeTruthy();
            expect(
                new Matrix(2, 2, [
                    [new Rational(2), new Rational(2)],
                    [new Rational(2), new Rational(2)],
                ])
                    .computeRref()
                    .toString()
            ).toBe("1 1\n0 0\n");
        });
        test("should produce right result with one column swap", () => {
            expect(
                new Matrix(2, 2, [
                    [new Rational(0), new Rational(1)],
                    [new Rational(1), new Rational(0)],
                ])
                    .computeRref()
                    .toString()
            ).toBe("1 0\n0 1\n");
        });
    });
    describe("Test get", () => {
        test("should throw OutOfBondAccess", () => {
            expect(() =>
                new Matrix(1, 1, [[new Rational(1)]]).get(2, 2)
            ).toThrow(OutOfBondsAccess);
        });
    });
    describe("Test set", () => {
        test("should throw OutOfBondAccess", () => {
            expect(() =>
                new Matrix(1, 1, [[new Rational(1)]]).set(2, 2, new Rational(3))
            ).toThrow(OutOfBondsAccess);
        });
    });
});
