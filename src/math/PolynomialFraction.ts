import { MathOperations } from "./MathOperations";
import { Polynomial } from "./Polynomial";
import { DivisionByZero } from "./MathErrors";

/**
 * Represents a fraction of two polynomials.
 */
class PolynomialFraction {
    private numerator: Polynomial;
    private denominator: Polynomial;

    /**
     * Creates a new polynomial fraction with the given numerator and
     * denominator.
     * @param numerator The numerator of this polynomial fraction.
     * @param denominator The denominator of this polynomial fraction.
     * @param simplify True if this polynomial fraction should be simplified,
     *                 false otherwise.
     */
    constructor(
        numerator: Polynomial,
        denominator: Polynomial = new Polynomial([1]),
        simplify = true
    ) {
        this.numerator = numerator;
        this.denominator = denominator;
        if (simplify) {
            this.simplify();
        }
    }

    /**
     * Computes the result of adding two polynomial fractions.
     * @param multilpier Polynomial fraction to add.
     * @returns The sum of the two polynomial fractions.
     */
    add(addend: PolynomialFraction): PolynomialFraction {
        return new PolynomialFraction(
            this.numerator
                .multiply(addend.denominator)
                .add(addend.numerator.multiply(this.denominator)),
            this.denominator.multiply(addend.denominator)
        );
    }

    /**
     * Computes the result of multiplifying two polynomial fractions.
     * @param multilpier Polynomial fraction to multiply by.
     * @returns The product of the two polynomial fractions.
     */
    multiply(multilpier: PolynomialFraction): PolynomialFraction {
        return new PolynomialFraction(
            this.numerator.multiply(multilpier.numerator),
            this.denominator.multiply(multilpier.denominator)
        );
    }

    /**
     * Checks if this polynomial fraction is equal to 0.
     * @returns True if this polynomial fraction is equal to 0, false otherwise.
     */
    equalsZero(): boolean {
        return this.numerator.equalsZero();
    }

    /**
     * Checks if this polynomial fraction is equal to 1.
     * @returns True if this polynomial fraction is equal to 1, false otherwise.
     */
    equalsOne(): boolean {
        return this.numerator.equals(this.denominator);
    }

    /**
     * Produces the additive inverse of this polynomial fraction.
     * @returns The additive inverse of this polynomial fraction.
     */
    additiveInverse(): PolynomialFraction {
        return new PolynomialFraction(
            this.numerator.additiveInverse(),
            this.denominator
        );
    }

    /**
     * Produces the multiplicative inverse of this polynomial fraction.
     * @returns The multiplicative inverse of this polynomial fraction.
     */
    multiplicativeInverse(): PolynomialFraction {
        return new PolynomialFraction(this.denominator, this.numerator);
    }

    /**
     * Produces a string representation of this polynomial fraction.
     * @returns A string representation of this polynomial fraction.
     */
    toString(): string {
        if (this.denominator.equalsOne()) {
            return this.numerator.toString();
        }
        return `(${this.numerator.toString()}) / (${this.denominator.toString()})`;
    }

    /**
     * Simplifies this polynomial fraction by dividing the numerator and the
     * denominagor by the greatest common divisor of the form ax^b (where a
     * and b are integers).
     */
    simplify(): void {
        const [numScalarGcd, numPowerGcd] = this.numerator.commonFactor();
        const [denScalarGcd, denPowerGcd] = this.denominator.commonFactor();
        const scalarGcd = MathOperations.gcd(numScalarGcd, denScalarGcd);
        const powerGcd = numPowerGcd < denPowerGcd ? numPowerGcd : denPowerGcd;
        this.numerator = this.numerator.divideByPower(powerGcd);
        this.numerator = this.numerator.divideByScalar(scalarGcd);
        this.denominator = this.denominator.divideByPower(powerGcd);
        this.denominator = this.denominator.divideByScalar(scalarGcd);
    }
}

export { PolynomialFraction, Polynomial, DivisionByZero };
