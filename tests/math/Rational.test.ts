import { describe, test, expect } from "@jest/globals";
import { Rational, DivisionByZero } from "../../src/math/Rational";

describe("Tests for rational module", () => {
    const zero = new Rational();
    const one = new Rational(1);
    const two = new Rational(2);
    const twoThirds = new Rational(2, 3);
    const threeHalves = new Rational(3, 2);
    describe("Test Rational constructor", () => {
        test("Rational constructor should initialize to zero by default", () => {
            expect(zero.equalsZero()).toBeTruthy();
        });
        test("Rational constructor should initialize to given integer", () => {
            expect(one.toNumber()).toBe(1);
            expect(two.toNumber()).toBe(2);
        });
        test("Rational constructor should initialize to given rational", () => {
            expect(new Rational(1, 2).toNumber()).toBeCloseTo(0.5);
            expect(new Rational(2, 3).toNumber()).toBeCloseTo(0.6667);
            expect(new Rational(7, 5).toNumber()).toBeCloseTo(1.4);
        });
        test("Rational constructor should simplify", () => {
            expect(new Rational(2, 4).toString()).toEqual("1/2");
            expect(new Rational(0, 2).toString()).toEqual("0");
        });
        test("Rational constructor should reject 0 as denominator", () => {
            expect(() => new Rational(0, 0)).toThrow(DivisionByZero);
            expect(() => new Rational(1, 0)).toThrow(DivisionByZero);
            expect(() => new Rational(53, 0)).toThrow(DivisionByZero);
        });
    });
    describe("Test multiply method", () => {
        test("Test multiplying by 0", () => {
            expect(zero.multiply(one).toNumber()).toBe(0);
            expect(one.multiply(zero).toNumber()).toBe(0);
            expect(zero.multiply(two).toNumber()).toBe(0);
            expect(two.multiply(zero).toNumber()).toBe(0);
            expect(zero.multiply(twoThirds).toNumber()).toBe(0);
            expect(twoThirds.multiply(zero).toNumber()).toBe(0);
            expect(zero.multiply(threeHalves).toNumber()).toBe(0);
            expect(threeHalves.multiply(zero).toNumber()).toBe(0);
        });
        test("Test multiplying by 1", () => {
            expect(one.multiply(two).toNumber()).toBe(2);
            expect(two.multiply(one).toNumber()).toBe(2);
            expect(one.multiply(twoThirds).toNumber()).toBeCloseTo(2 / 3);
            expect(twoThirds.multiply(one).toNumber()).toBeCloseTo(2 / 3);
            expect(one.multiply(threeHalves).toNumber()).toBeCloseTo(3 / 2);
            expect(threeHalves.multiply(one).toNumber()).toBeCloseTo(3 / 2);
        });
        test("Test multiplying by 2", () => {
            expect(two.multiply(twoThirds).toNumber()).toBeCloseTo(4 / 3);
            expect(twoThirds.multiply(two).toNumber()).toBeCloseTo(4 / 3);
            expect(two.multiply(threeHalves).toNumber()).toBe(3);
            expect(threeHalves.multiply(two).toNumber()).toBe(3);
        });
        test("Test multiplying two non-integer numbers", () => {
            expect(twoThirds.multiply(threeHalves).toNumber()).toBe(1);
            expect(threeHalves.multiply(twoThirds).toNumber()).toBe(1);
        });
    });
    describe("Test add method", () => {
        test("Add 0 to rational", () => {
            expect(one.add(zero).toNumber()).toBe(1);
            expect(two.add(zero).toNumber()).toBe(2);
            expect(threeHalves.add(zero).toNumber()).toBeCloseTo(3 / 2);
            expect(twoThirds.add(zero).toNumber()).toBeCloseTo(2 / 3);
        });
        test("Add 1 to rational", () => {
            expect(zero.add(one).toNumber()).toBe(1);
            expect(two.add(one).toNumber()).toBe(3);
            expect(threeHalves.add(one).toNumber()).toBeCloseTo(5 / 2);
            expect(twoThirds.add(one).toNumber()).toBeCloseTo(5 / 3);
        });
        test("Add non-one-integer to rational", () => {
            expect(threeHalves.add(two).toNumber()).toBeCloseTo(7 / 2);
            expect(twoThirds.add(two).toNumber()).toBeCloseTo(8 / 3);
        });
        test("Add two non-integer rationals", () => {
            expect(threeHalves.add(twoThirds).toNumber()).toBeCloseTo(13 / 6);
        });
    });
    // TODO: Add more tests.
});
