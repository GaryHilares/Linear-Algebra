interface NumberInterface<NumberType> {
    add: (addend: NumberType) => NumberType;
    multiply: (multiplier: NumberType) => NumberType;
    equalsZero: () => boolean;
    equalsOne: () => boolean;
    additiveInverse: () => NumberType;
    multiplicativeInverse: () => NumberType;
    toString: () => string;
}

class SwapStepInfo {
    public constructor(private row1: number, private row2: number) {}

    public toString(): string {
        return `Swapped row ${this.row1} with ${this.row2}`;
    }
}

class ReplaceStepInfo<NumberType extends NumberInterface<NumberType>> {
    public constructor(
        private srcRow: number,
        private dstRow: number,
        private factor: NumberType
    ) {}

    public toString(): string {
        return `Replaced row ${this.srcRow} times ${this.factor} into row ${this.dstRow}`;
    }
}

class ScaleStepInfo<NumberType extends NumberInterface<NumberType>> {
    public constructor(private row: number, private factor: NumberType) {}

    public toString(): string {
        return `Scaled row ${this.row} by ${this.factor.toString()}`;
    }
}

type StepInfo<NumberType extends NumberInterface<NumberType>> =
    | SwapStepInfo
    | ReplaceStepInfo<NumberType>
    | ScaleStepInfo<NumberType>;

interface Step<NumberType extends NumberInterface<NumberType>> {
    info: StepInfo<NumberType>;
    result: Matrix<NumberType>;
}

class OutOfBondsAccess {}

/**
 * Represents a matrix of the given number type.
 */
class Matrix<NumberType extends NumberInterface<NumberType>> {
    private m: number;
    private n: number;
    private entries: Array<Array<NumberType>>;

    /**
     * Constructs a new mxn matrix.
     * @param m Integer representing amount of rows in matrix.
     * @param n Integer representing amount of columns in matrix.
     * @param entries Numbers representing the entries of the matrix.
     */
    public constructor(
        m: number,
        n: number,
        entries: Array<Array<NumberType>>
    ) {
        this.m = m;
        this.n = n;
        this.entries = entries;
    }

    /**
     * Converts this matrix into its own reduced row echelon form.
     * @returns this is returned for method chaining.
     */
    public computeRref(): Matrix<NumberType> {
        let ret = this as Matrix<NumberType>;
        for (let step of this.generateRrefSteps()) {
            ret = step.result;
        }
        return ret;
    }

    public copy(): Matrix<NumberType> {
        return new Matrix<NumberType>(
            this.m,
            this.n,
            this.entries.map((row) => row.slice())
        );
    }

    /**
     * Produces a generator to iterate over the matrix's RREF steps.
     * @returns Generator to matrix's RREF steps. Note that each call to next()
     *          in the iterator modifies the current matrix to its next RREF form.
     */
    public *generateRrefSteps(): Generator<Step<NumberType>, void, unknown> {
        let pivot_col = 0;
        let pivot_row = 0;
        const copy = this.copy();
        while (pivot_row < this.m && pivot_col < this.n) {
            let non_zero_row = -1; // -1 is sentinel for inexistence
            for (let row = pivot_row; row < this.m; row++) {
                if (!copy.get(row, pivot_col).equalsZero()) {
                    non_zero_row = row;
                    break;
                }
            }
            if (non_zero_row == -1) {
                pivot_col++;
                continue;
            } else {
                if (non_zero_row != pivot_row) {
                    yield {
                        result: copy.swapRows(pivot_row, non_zero_row).copy(),
                        info: new SwapStepInfo(pivot_row, non_zero_row),
                    };
                }
            }
            const pivot = copy.get(pivot_row, pivot_col);
            let scale = pivot.multiplicativeInverse();
            if (!scale.equalsOne()) {
                yield {
                    result: copy.scaleRow(pivot_row, scale).copy(),
                    info: new ScaleStepInfo(pivot_row, scale),
                };
            }
            for (let row = 0; row < copy.m; row++) {
                if (row == pivot_row) {
                    continue;
                }
                let multiplier = copy.get(row, pivot_col).additiveInverse();
                yield {
                    result: copy.replaceRow(row, pivot_row, multiplier).copy(),
                    info: new ReplaceStepInfo(row, pivot_row, multiplier),
                };
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
    private swapRows(row1: number, row2: number): Matrix<NumberType> {
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
    private scaleRow(row: number, multilpier: NumberType): Matrix<NumberType> {
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
    private replaceRow(
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
    public get(row: number, column: number): NumberType {
        if (row >= this.m || column > this.n) {
            throw new OutOfBondsAccess();
        }
        return this.entries[row][column];
    }

    public getEntries(): Array<Array<NumberType>> {
        return this.entries;
    }

    /**
     * Sets the cell in the given row and col to the given value.
     * @param row Row number of the cell to modify.
     * @param column Column number of the cell to modify.
     * @param value Value to set the cell to.
     * @returns The value that the cell was assigned to (for chaining).
     * @throws OutOfBondsAccess if row or column are outside of the matrix bounds.
     */
    public set(row: number, column: number, value: NumberType) {
        if (row >= this.m || column > this.n) {
            throw new OutOfBondsAccess();
        }
        return (this.entries[row][column] = value);
    }

    /**
     * Produces a string representation of this matrix.
     * @returns String representation of this matrix.
     */
    public toString(): string {
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

export { Matrix, OutOfBondsAccess };
export type { Step, StepInfo };
