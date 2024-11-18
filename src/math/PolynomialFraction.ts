/*
interface NumberInterface<NumberType> {
    add: (addend: NumberType) => NumberType;
    multiply: (multiplier: NumberType) => NumberType;
    equalsZero: () => boolean;
    equalsOne: () => boolean;
    additiveInverse: () => NumberType;
    multiplicativeInverse: () => NumberType;
    toString: () => string;
}
*/

class Polynomial {
    private coefs: number[];

    constructor(coefs: number[]) {
        this.coefs = coefs;
    }

    multiply(multiplier: Polynomial): Polynomial {
        let new_coefs = new Array<number>(
            this.coefs.length + multiplier.coefs.length
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

    add(addend: Polynomial): Polynomial {
        const max_length =
            (this.coefs.length > addend.coefs.length
                ? this.coefs.length
                : addend.coefs.length) - 1;
        const new_coefs = Array<number>(max_length);
        for (let i = 0; i < max_length; i++) {
            const op1 = this.coefs.length > i ? this.coefs[i] : 0;
            const op2 = this.coefs.length > i ? this.coefs[i] : 0;
            new_coefs[i] = op1 + op2;
        }
        return new Polynomial(new_coefs);
    }

    equalsZero(): boolean {
        for (let i = 0; i < this.coefs.length; i++) {
            if (this.coefs[i] != 0) {
                return false;
            }
        }
        return true;
    }

    additiveInverse(): Polynomial {
        let new_coefs = Array<number>(this.coefs.length);
        for (let i = 0; i < this.coefs.length; i++) {
            new_coefs[i] = -this.coefs[i];
        }
        return new Polynomial(new_coefs);
    }

    toString(): string {
        let out = "";
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
}

class PolynomialFraction {
    private numerator: Polynomial;
    private denominator: Polynomial;

    constructor(
        numerator: Polynomial,
        denominator: Polynomial = new Polynomial([1])
    ) {
        this.numerator = numerator;
        this.denominator = denominator;
    }

    add(addend: PolynomialFraction): PolynomialFraction {
        return new PolynomialFraction(
            this.numerator
                .multiply(addend.denominator)
                .add(addend.numerator.multiply(this.denominator)),
            this.denominator.multiply(addend.denominator)
        );
    }

    multiply(multilpier: PolynomialFraction): PolynomialFraction {
        return new PolynomialFraction(
            this.numerator.multiply(multilpier.numerator),
            this.denominator.multiply(multilpier.denominator)
        );
    }

    equalsZero(): boolean {
        return this.numerator.equalsZero();
    }

    equalsOne(): boolean {
        return this.numerator.equals(this.denominator);
    }

    additiveInverse(): PolynomialFraction {
        return new PolynomialFraction(
            this.numerator.additiveInverse(),
            this.denominator
        );
    }

    multiplicativeInverse(): PolynomialFraction {
        return new PolynomialFraction(this.denominator, this.numerator);
    }

    toString(): string {
        return `(${this.numerator.toString()}) / (${this.denominator.toString()})`;
    }
}

export { Polynomial, PolynomialFraction };
