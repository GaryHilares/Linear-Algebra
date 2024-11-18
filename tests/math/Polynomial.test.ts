import { describe, test, expect } from "@jest/globals";
import { Polynomial } from "../../src/math/Polynomial";

describe("Polynomial module", () => {
    const zero = new Polynomial();
    const one = new Polynomial([1]);
    const poly1 = new Polynomial([3, 2, 5]);
    const poly2 = new Polynomial([3, 4, 5, 3]);
    const poly3 = new Polynomial([0, 0, 6, 3, 6]);
    const poly4 = new Polynomial([0, 0, 0, 2, 0, 4]);
    describe("Polynomial constructor", () => {
        test("should create a 0 polynomial by default", () => {
            expect(new Polynomial().equalsZero()).toBeTruthy();
        });
        test("should create a polynomial with the given coefficients", () => {
            expect(new Polynomial([0]).equalsZero()).toBeTruthy();
            expect(new Polynomial([1]).equalsOne()).toBeTruthy();
            expect(new Polynomial([1, 1]).equalsOne()).toBeFalsy();
            expect(new Polynomial([1, 1]).toString()).toBe("1x^1 + 1x^0");
        });
    });
    describe("Polynomial multiply", () => {
        test("should be zero when multiplied with 0", () => {
            expect(zero.multiply(one).equalsZero()).toBeTruthy();
            expect(one.multiply(zero).equalsZero()).toBeTruthy();
            expect(poly1.multiply(zero).equalsZero()).toBeTruthy();
            expect(zero.multiply(poly1).equalsZero()).toBeTruthy();
            expect(zero.multiply(poly2).equalsOne()).toBeFalsy();
            expect(poly2.multiply(zero).equalsOne()).toBeFalsy();
        });
        test("should remain equal when multiplied with 1", () => {
            expect(poly1.multiply(one).equals(poly1)).toBeTruthy();
            expect(one.multiply(poly1).equals(poly1)).toBeTruthy();
            expect(poly2.multiply(one).equals(poly2)).toBeTruthy();
            expect(one.multiply(poly2).equals(poly2)).toBeTruthy();
            expect(poly1.multiply(poly2).equals(poly2)).toBeFalsy();
            expect(poly2.multiply(poly1).equals(poly2)).toBeFalsy();
        });
        test("should produce correct product of polynomials", () => {
            const result = new Polynomial([9, 18, 38, 39, 31, 15]);
            expect(poly1.multiply(poly2).equals(result)).toBeTruthy();
            expect(poly2.multiply(poly1).equals(result)).toBeTruthy();
            expect(poly1.multiply(poly2).equalsZero()).toBeFalsy();
            expect(poly2.multiply(poly1).equalsZero()).toBeFalsy();
        });
    });
    describe("Polynomial adding", () => {
        test("should produce the same result when adding zero", () => {
            expect(zero.add(one).equalsOne()).toBeTruthy();
            expect(one.add(zero).equalsOne()).toBeTruthy();
            expect(poly1.add(zero).equals(poly1)).toBeTruthy();
            expect(zero.add(poly1).equals(poly1)).toBeTruthy();
            expect(zero.add(poly2).equalsOne()).toBeFalsy();
            expect(poly2.add(zero).equals(poly1)).toBeFalsy();
        });
        test("should produce correct result when adding polynomials", () => {
            expect(
                one.add(poly1).equals(new Polynomial([4, 2, 5]))
            ).toBeTruthy();
            expect(
                poly2.add(one).equals(new Polynomial([4, 4, 5, 3]))
            ).toBeTruthy();
            expect(
                poly1.add(poly2).equals(new Polynomial([6, 6, 10, 3]))
            ).toBeTruthy();
            expect(
                poly2.add(poly1).equals(new Polynomial([6, 6, 10, 4]))
            ).toBeFalsy();
            expect(
                poly2.add(poly1).equals(new Polynomial([6, 6, 10]))
            ).toBeFalsy();
        });
    });
    describe("Polynomial additive inverse", () => {
        test("should add to 0 when added to the original number", () => {
            expect(zero.add(zero.additiveInverse()).equalsZero()).toBeTruthy();
            expect(one.add(one.additiveInverse()).equalsZero()).toBeTruthy();
            expect(
                poly1.add(poly1.additiveInverse()).equalsZero()
            ).toBeTruthy();
            expect(
                poly2.add(poly2.additiveInverse()).equalsZero()
            ).toBeTruthy();
            expect(one.add(one.additiveInverse()).equalsOne()).toBeFalsy();
            expect(poly1.add(poly1.additiveInverse()).equalsOne()).toBeFalsy();
        });
    });
    describe("Polynomial common factor", () => {
        test("should produce correct result for 0", () => {
            expect(zero.commonFactor()).toEqual([0, 0]);
        });
        test("should produce common factor", () => {
            expect(one.commonFactor()).toEqual([1, 0]);
            expect(poly1.commonFactor()).toEqual([1, 0]);
            expect(poly2.commonFactor()).toEqual([1, 0]);
            expect(poly3.commonFactor()).toEqual([3, 2]);
            expect(poly4.commonFactor()).toEqual([2, 3]);
        });
    });
    describe("Polynomial division by a scalar", () => {
        test("should not change when they dividing by one", () => {
            expect(zero.divideByScalar(1).equalsZero()).toBeTruthy();
            expect(one.divideByScalar(1).equalsOne()).toBeTruthy();
            expect(poly1.divideByScalar(1).equals(poly1)).toBeTruthy();
            expect(poly2.divideByScalar(1).equals(poly2)).toBeTruthy();
            expect(poly3.divideByScalar(1).equals(poly3)).toBeTruthy();
            expect(poly4.divideByScalar(1).equals(poly4)).toBeTruthy();
        });
        test("should produce right quotient", () => {
            expect(
                poly3.divideByScalar(3).equals(new Polynomial([0, 0, 2, 1, 2]))
            ).toBeTruthy();
            expect(
                poly4
                    .divideByScalar(2)
                    .equals(new Polynomial([0, 0, 0, 1, 0, 2]))
            ).toBeTruthy();
        });
    });
    describe("Polynomial divided by a power", () => {
        test("should not change when dividing by power 0", () => {
            expect(zero.divideByPower(0).equalsZero()).toBeTruthy();
            expect(one.divideByPower(0).equalsOne()).toBeTruthy();
            expect(poly1.divideByPower(0).equals(poly1)).toBeTruthy();
            expect(poly2.divideByPower(0).equals(poly2)).toBeTruthy();
            expect(poly3.divideByPower(0).equals(poly3)).toBeTruthy();
            expect(poly4.divideByPower(0).equals(poly4)).toBeTruthy();
        });
        test("should produce correct result when dividing by power 1", () => {
            expect(
                poly3.divideByPower(1).equals(new Polynomial([0, 6, 3, 6]))
            ).toBeTruthy();
            expect(
                poly4.divideByPower(1).equals(new Polynomial([0, 0, 2, 0, 4]))
            ).toBeTruthy();
        });
        test("should produce correct result when power >=2", () => {
            expect(
                poly3.divideByPower(2).equals(new Polynomial([6, 3, 6]))
            ).toBeTruthy();
            expect(
                poly4.divideByPower(3).equals(new Polynomial([2, 0, 4]))
            ).toBeTruthy();
        });
    });
});
