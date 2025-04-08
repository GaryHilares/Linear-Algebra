class MathOperations {
    /**
     * Computes the greatest common divisor (GCD) of two numbers.
     * Adapted from: https://stackoverflow.com/a/17445322
     * @param a First number to get the GCD of.
     * @param b Second number to get the GCD of.
     * @returns The GCD of the two given numbers.
     */
    static gcd(a: number, b: number) {
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
}

export { MathOperations };
