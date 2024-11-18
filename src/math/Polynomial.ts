import { MathOperations } from "./MathOperations";

class Polynomial {
    private coefs: number[];

    /**
     * Creates a new polynomial with the given coefficients.
     * @param coefs Coefficients of the polynomial, starting with the
     *              coefficient for x^0 and ending with the coefficient for
     *              x^n.
     */
    constructor(coefs: number[] = [0]) {
        this.coefs = coefs;
    }

    /**
     * Computes the product of multiplying this polynomial by given one.
     * @param multiplier The polynomial to multiply by.
     * @returns The product of this polynomial and the given polynomial.
     */
    multiply(multiplier: Polynomial): Polynomial {
        let new_coefs = new Array<number>(
            this.coefs.length + multiplier.coefs.length - 1
        ).fill(0);
        for (let idx_this = 0; idx_this < this.coefs.length; idx_this++) {
            for (
                let idx_mult = 0;
                idx_mult < multiplier.coefs.length;
                idx_mult++
            ) {
                new_coefs[idx_this + idx_mult] +=
                    this.coefs[idx_this] * multiplier.coefs[idx_mult];
            }
        }
        return new Polynomial(new_coefs);
    }

    /**
     * Computes the sum of this polynomial and the given one.
     * @param addend The polynomial to add.
     * @returns The sum of this polynomial and the given polynomial.
     */
    add(addend: Polynomial): Polynomial {
        const max_length =
            this.coefs.length > addend.coefs.length
                ? this.coefs.length
                : addend.coefs.length;
        const new_coefs = Array<number>(max_length);
        for (let i = 0; i < max_length; i++) {
            const op1 = this.coefs.length > i ? this.coefs[i] : 0;
            const op2 = addend.coefs.length > i ? addend.coefs[i] : 0;
            new_coefs[i] = op1 + op2;
        }
        for (let i = new_coefs.length - 1; i >= 1; i--) {
            if (new_coefs[i] == 0) {
                new_coefs.pop();
            } else {
                break;
            }
        }
        return new Polynomial(new_coefs);
    }

    /**
     * Checks if this polynomial equals 0.
     * @returns True if this polynomial equals 0, false otherwise.
     */
    equalsZero(): boolean {
        for (let i = 0; i < this.coefs.length; i++) {
            if (this.coefs[i] != 0) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks if this polynomial equals 1.
     * @returns True if this polynomial equals 1, false otherwise.
     */
    equalsOne(): boolean {
        return this.coefs.length == 1 && this.coefs[0] == 1;
    }

    /**
     * Produces the additive inverse of this polynomial.
     * @returns The additive inverse of this polynomial.
     */
    additiveInverse(): Polynomial {
        let new_coefs = Array<number>(this.coefs.length);
        for (let i = 0; i < this.coefs.length; i++) {
            new_coefs[i] = -this.coefs[i];
        }
        return new Polynomial(new_coefs);
    }

    /**
     * Produces a string representation of this polynomial.
     * @returns A string representation of this polynomial.
     */
    toString(): string {
        let out = "";
        if (this.coefs.length == 1) {
            return this.coefs[0].toString();
        }
        for (let i = this.coefs.length - 1; i >= 0; i--) {
            if (this.coefs[i] != 0) {
                if (i != this.coefs.length - 1) {
                    out += " + ";
                }
                out += this.coefs[i].toString() + "x^" + i.toString();
            }
        }
        return out;
    }

    /**
     * Checks if this polynomial is equal to the given one.
     * @param other The other polynomial to compare.
     * @returns True if the polynomials are equal, false otherwise.
     */
    equals(other: Polynomial): boolean {
        if (this.coefs.length != other.coefs.length) {
            return false;
        }
        for (let i = 0; i < this.coefs.length; i++) {
            if (this.coefs[i] != other.coefs[i]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Computes the common factor of the terms of this polynomial.
     * @returns An array of length two. The first element is the GCD of the
     *          coefficients of this polynomial. The second element is the
     *          biggest power that is a common factor of all monomials. If the
     *          polynomial is 0, this function will produce that the biggest
     *          power that is a common factor is 0.
     */
    commonFactor(): [number, number] {
        let smallest_power = 0;
        for (let i = 0; i < this.coefs.length; i++) {
            if (this.coefs[i] != 0) {
                smallest_power = i;
                break;
            }
        }
        let gcd = this.coefs.reduce((acc, curr) => {
            return MathOperations.gcd(acc, curr);
        }, 0);
        return [gcd, smallest_power];
    }

    /**
     * Produces the result of dividing this polynomial by the given scalar.
     * @param divisor The number to divide all coefficients by. Must evenly
     *                divide all coefficients.
     * @returns The polynomial resulting of dividing this polynomial by the
     *          divisor.
     */
    divideByScalar(divisor: number): Polynomial {
        let new_coefs = Array<number>(this.coefs.length);
        for (let i = 0; i < this.coefs.length; i++) {
            new_coefs[i] = this.coefs[i] / divisor;
        }
        return new Polynomial(new_coefs);
    }

    /**
     * Produces the result of dividing this polynomial by the given power.
     * @param divisorPower The power to divide all monomials by. Must be at
     *                     most equal to the degree of the common factor.
     * @returns The polynomial resulting of dividing this polynomial x^n,
     *          where n is the given power.
     */
    divideByPower(divisorPower: number): Polynomial {
        let new_coefs = Array<number>(this.coefs.length - divisorPower);
        for (let i = 0; i < new_coefs.length; i++) {
            new_coefs[i] = this.coefs[i + divisorPower];
        }
        return new Polynomial(new_coefs);
    }
}

export { Polynomial };
