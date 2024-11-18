interface NumberInterface<NumberType> {
    add: (addend: NumberType) => NumberType;
    multiply: (multiplier: NumberType) => NumberType;
    equalsZero: () => boolean;
    equalsOne: () => boolean;
    additiveInverse: () => NumberType;
    multiplicativeInverse: () => NumberType;
    toString: () => string;
}

class OutOfBondsAccess {}

/**
 * Represents a matrix of the given number type.
 */
class Matrix<NumberType extends NumberInterface<NumberType>> {
    private m: number;
    private n: number;
    private entries: NumberType[];

    /**
     * Constructs a new mxn matrix.
     * @param m Integer representing amount of rows in matrix.
     * @param n Integer representing amount of columns in matrix.
     * @param entries Number representing the entries of the matrix.
     */
    constructor(m: number, n: number, entries: NumberType[]) {
        this.m = m;
        this.n = n;
        this.entries = entries;
    }

    /**
     * Converts this matrix into its own reduced row echelon form.
     * @returns this is returned for method chaining.
     */
    rref(): Matrix<NumberType> {
        for (let step of this.rref_steps());
        return this;
    }

    /**
     * Produces a generator to iterate over the matrix's RREF steps.
     * @returns Generator to matrix's RREF steps. Note that each call to next()
     *          in the iterator modifies the current matrix to its next RREF form.
     */
    *rref_steps(): Generator<Matrix<NumberType>, void, unknown> {
        let pivot_col = 0;
        let pivot_row = 0;
        while (pivot_row < this.m && pivot_col < this.n) {
            let non_zero_row = -1; // -1 is sentinel for inexistence
            for (let row = pivot_row; row < this.m; row++) {
                if (!this.get(row, pivot_col).equalsZero()) {
                    non_zero_row = row;
                    break;
                }
            }
            if (non_zero_row == -1) {
                pivot_col++;
                continue;
            } else {
                if (non_zero_row != pivot_row) {
                    yield this.swapRows(pivot_row, non_zero_row);
                }
            }
            const pivot = this.get(pivot_row, pivot_col);
            let scale = pivot.multiplicativeInverse();
            if (!scale.equalsOne()) {
                yield this.scaleRow(pivot_row, scale);
            }
            for (let row = 0; row < this.m; row++) {
                if (row == pivot_row) {
                    continue;
                }
                let multiplier = this.get(row, pivot_col).additiveInverse();
                yield this.replaceRow(row, pivot_row, multiplier);
            }
            pivot_col++;
            pivot_row++;
        }
    }

    /**
     * Performs a swap operation on two rows of the matrix.
     * @param row1 First row to swap.
     * @param row2 Second row to swap.
     * @returns this is returned for method chaining.
     */
    swapRows(row1: number, row2: number): Matrix<NumberType> {
        for (let col = 0; col < this.n; col++) {
            let tmp = this.get(row1, col);
            this.set(row1, col, this.get(row2, col));
            this.set(row2, col, tmp);
        }
        return this;
    }

    /**
     * Performs a scaling operation on the matrix.
     * @param row Row to scale.
     * @param multilpier Factor to scale by.
     * @returns this is returned for method chaining.
     */
    scaleRow(row: number, multilpier: NumberType): Matrix<NumberType> {
        for (let col = 0; col < this.n; col++) {
            this.set(row, col, this.get(row, col).multiply(multilpier));
        }
        return this;
    }

    /**
     * Performs a row replacement operation on the operation. Only the destiny
     * row is modified.
     * @param destiny_row Row to replace.
     * @param source_row Row that will be added during the replacement.
     * @param multiplier Factor to multiply the source row by before adding.
     * @returns this is returned for method chaining.
     */
    replaceRow(
        destiny_row: number,
        source_row: number,
        multiplier: NumberType
    ): Matrix<NumberType> {
        for (let col = 0; col < this.n; col++) {
            const augend = this.get(destiny_row, col);
            const addend = this.get(source_row, col).multiply(multiplier);
            this.set(destiny_row, col, augend.add(addend));
        }
        return this;
    }

    /**
     * Produces the number at the given 0-indexed coordinates of the matrix.
     * @param row Row to get value from.
     * @param column Column to get value from.
     * @returns The value of the number at row x column.
     * @throws OutOfBondsAccess if row or column are outside of the matrix bounds.
     */
    get(row: number, column: number): NumberType {
        if (row >= this.m || column > this.n) {
            throw new OutOfBondsAccess();
        }
        return this.entries[this.getCollectionIndex(row, column)];
    }

    /**
     * Sets the cell in the given row and col to the given value.
     * @param row Row number of the cell to modify.
     * @param column Column number of the cell to modify.
     * @param value Value to set the cell to.
     * @returns The value that the cell was assigned to (for chaining).
     * @throws OutOfBondsAccess if row or column are outside of the matrix bounds.
     */
    set(row: number, column: number, value: NumberType) {
        if (row >= this.m || column > this.n) {
            throw new OutOfBondsAccess();
        }
        return (this.entries[this.getCollectionIndex(row, column)] = value);
    }

    private getCollectionIndex(row: number, column: number) {
        return row * this.n + column;
    }

    /**
     * Produces a string representation of this matrix.
     * @returns String representation of this matrix.
     */
    toString(): string {
        let result = "";
        for (let row = 0; row < this.m; row++) {
            for (let col = 0; col < this.n; col++) {
                if (col != 0) {
                    result += " ";
                }
                result += this.get(row, col).toString();
            }
            result += "\n";
        }
        return result;
    }
}

export { Matrix };
