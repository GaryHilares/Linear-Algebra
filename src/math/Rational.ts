class DivisionByZero {}

/**
 * Represents a rational number.
 */
class Rational {
    numerator: number;
    denominator: number;

    /**
     * Creates a new rational number with the given numerator and denominator.
     * @param numerator Integer representing numerator of the given integer.
     * @param denominator Integer representing denominator of the given integer.
     * @param simplify True if rational should be simplified, false otherwise.
     * @throw DivisionByZero if denominator is zero.
     */
    constructor(
        numerator: number = 0,
        denominator: number = 1,
        simplify: boolean = true
    ) {
        if (denominator == 0) {
            throw new DivisionByZero();
        }
        if (denominator < 0) {
            numerator *= -1;
            denominator *= -1;
        }
        this.numerator = numerator;
        this.denominator = denominator;
        if (simplify) {
            this.simplify();
        }
    }

    /**
     * Multiplies two rational numbers and returns the result.
     * @param other Multiplier to multiply by.
     * @returns The simplified product of this number and the given one.
     */
    multiply(other: Rational): Rational {
        return new Rational(
            this.numerator * other.numerator,
            this.denominator * other.denominator
        );
    }

    /**
     * Divides this rational number by another one and produces the result.
     * @param other Divisor for this operation.
     * @returns The simplified division of this number by the given one.
     * @throws DivisionByZero if divisor is zero.
     */
    divide(other: Rational): Rational {
        if (other.numerator == 0) {
            throw new DivisionByZero();
        }
        return this.multiply(other.multiplicativeInverse());
    }

    /**
     * Produces the multipllicative inverse of this number.
     * @returns The multiplicative inverse of this number.
     * @throws DivisionByZero if denominator of inverse would be zero.
     */
    multiplicativeInverse(): Rational {
        if (this.numerator == 0) {
            throw new DivisionByZero();
        }
        return new Rational(this.denominator, this.numerator);
    }

    /**
     * Produces the additive inverse of this rational.
     * @returns The additive inverse of this rational.
     */
    additiveInverse(): Rational {
        return new Rational(-this.numerator, this.denominator);
    }

    /**
     * Produces the sum of this rational and the given one.
     * @param other The other summand to add.
     * @returns The simplified sum of this rational and the given one.
     */
    add(other: Rational): Rational {
        return new Rational(
            this.numerator * other.denominator +
                other.numerator * this.denominator,
            this.denominator * other.denominator
        );
    }

    /**
     * Produces the difference of this rational and the given rational.
     * @param other The rational to subtract this rational by.
     * @returns The simplified difference of this rational and the given rational.
     */
    subtract(other: Rational): Rational {
        return this.add(other.additiveInverse());
    }

    /**
     * Produces a number equivalent to the fraction represented by this rational.
     * @returns A number equivalent to the fraction represented by this rational.
     */
    toNumber(): number {
        return this.numerator / this.denominator;
    }

    /**
     * Produces a string representation of this rational.
     * @returns A string representation of this rational.
     */
    toString(): string {
        if (this.denominator == 1) {
            return this.numerator.toString();
        }
        return this.numerator.toString() + "/" + this.denominator.toString();
    }

    /**
     * Simplifies this rational.
     */
    simplify(): void {
        let gcd = this.gcd(this.numerator, this.denominator);
        this.numerator /= gcd;
        this.denominator /= gcd;
    }

    /**
     * Computes the greatest common divisor (GCD) of two numbers.
     * Adapted from: https://stackoverflow.com/a/17445322
     * @param a First number to get the GCD of.
     * @param b Second number to get the GCD of.
     * @returns The GCD of the two given numbers.
     */
    private gcd(a: number, b: number) {
        a = Math.abs(a);
        b = Math.abs(b);
        if (b > a) {
            let temp = a;
            a = b;
            b = temp;
        }
        while (true) {
            if (b == 0) {
                return a;
            }
            a %= b;
            if (a == 0) {
                return b;
            }
            b %= a;
        }
    }

    /**
     * Checks if this rational is equal to zero.
     * @returns True if this rational is equal to zero, false otherwise.
     */
    equalsZero(): boolean {
        return this.numerator == 0;
    }

    /**
     * Checks if this rational is equal to one.
     * @returns True if this rational is equal to one, false otherwise.
     */
    equalsOne(): boolean {
        return this.numerator == this.denominator;
    }
}

export { Rational, DivisionByZero };
