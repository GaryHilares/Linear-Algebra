"use client";

import { useId, useState } from "react";
import { Rational } from "../model/Rational";
import { Matrix } from "../model/Matrix";
import type { Step } from "../model/Matrix";

interface IValueMatrix {
    copyAndSet: (rows: number, columns: number, value: number) => IValueMatrix;
    getValues: () => Array<Array<number>>;
    copyAndResize: (row: number, column: number) => IValueMatrix;
    toRationalMatrix: () => Matrix<Rational>;
}

class ValueMatrix implements IValueMatrix {
    private values: Array<Array<number>>;

    public constructor(initialValues: Array<Array<number>> = []) {
        this.values = initialValues;
    }

    public copyAndSet(
        row: number,
        column: number,
        value: number
    ): IValueMatrix {
        const copy = [];
        for (let i = 0; i < this.values.length; i++) {
            const subcopy = [];
            for (let j = 0; j < this.values[i].length; j++) {
                if (row == i && column == j) {
                    subcopy.push(value);
                } else {
                    subcopy.push(this.values[i][j]);
                }
            }
            copy.push(subcopy);
        }
        return new ValueMatrix(copy);
    }

    public getValues(): Array<Array<number>> {
        return this.values;
    }

    public copyAndResize(rows: number, columns: number): IValueMatrix {
        const copy = [];
        for (let i = 0; i < rows; i++) {
            const subcopy = [];
            for (let j = 0; j < columns; j++) {
                if (
                    rows < this.values.length &&
                    columns < this.values[i].length
                ) {
                    subcopy.push(this.values[rows][columns]);
                } else {
                    subcopy.push(0);
                }
            }
            copy.push(subcopy);
        }
        return new ValueMatrix(copy);
    }

    public toRationalMatrix(): Matrix<Rational> {
        return new Matrix(
            this.values.length,
            this.values.length > 0 ? this.values[0].length : 0,
            this.values.map((row) => row.map((num) => new Rational(num)))
        );
    }
}

function MatrixInputDisplay({
    matrix,
    onEntryChange,
}: {
    matrix: IValueMatrix;
    onEntryChange: (row: number, col: number, value: number) => void;
}) {
    return (
        <table>
            <tbody>
                {matrix
                    .getValues()
                    .map((row: Array<number>, rowIdx: number) => (
                        <tr key={rowIdx}>
                            {row.map((value: number, colIdx) => (
                                <td key={colIdx}>
                                    <input
                                        value={value}
                                        onChange={(e) =>
                                            onEntryChange(
                                                rowIdx,
                                                colIdx,
                                                parseInt(e.target.value)
                                            )
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}

class MatrixDisplay {}

function Page() {
    const rowsId = useId();
    const columnsId = useId();
    const [rows, setRows] = useState<number>(0);
    const [columns, setColumns] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [inputMatrix, setInputMatrix] = useState<IValueMatrix>(
        new ValueMatrix()
    );
    const matrix = inputMatrix.toRationalMatrix();
    return (
        <main>
            <h1>Reduced row echelon form step-by-step calculator</h1>
            <h2>Input</h2>
            <label htmlFor={rowsId}>Rows</label>
            <input
                value={rows}
                id={rowsId}
                onChange={(e) => {
                    const num = parseInt(e.target.value);
                    if (!Number.isNaN(num)) {
                        setRows(num);
                        setInputMatrix((oldMatrix) =>
                            oldMatrix.copyAndResize(num, columns)
                        );
                        setErrorMessage(null);
                    } else {
                        setErrorMessage("Error: Input must be a valid number");
                    }
                }}
                type="number"
            />
            <label htmlFor={columnsId}>Columns</label>
            <input
                value={columns}
                onChange={(e) => {
                    const num = parseInt(e.target.value);
                    if (!Number.isNaN(num)) {
                        setColumns(num);
                        setInputMatrix((oldMatrix) =>
                            oldMatrix.copyAndResize(rows, num)
                        );
                        setErrorMessage(null);
                    } else {
                        setErrorMessage("Error: Input must be a valid number");
                    }
                }}
                id={columnsId}
                type="number"
            />
            {errorMessage && <span>{errorMessage}</span>}
            <MatrixInputDisplay
                matrix={inputMatrix}
                onEntryChange={(row: number, col: number, value: number) =>
                    setInputMatrix((oldMatrix) =>
                        oldMatrix.copyAndSet(row, col, value)
                    )
                }
            />
            <h2>Step-by-step process</h2>
            <h3>Step 1: Scale row 1 by 1/4.</h3>
            {[...matrix.generateRrefSteps()].map(
                (step: Step<Rational>, stepIdx: number) => (
                    <>
                        <p>{step.info.toString()}</p>
                        <table>
                            <tbody>
                                {step.result
                                    .getEntries()
                                    .map(
                                        (
                                            row: Array<Rational>,
                                            rowIdx: number
                                        ) => (
                                            <tr key={rowIdx}>
                                                {row.map(
                                                    (
                                                        num: Rational,
                                                        colIdx: number
                                                    ) => (
                                                        <td key={colIdx}>
                                                            <pre>
                                                                {num.numerator}
                                                            </pre>
                                                        </td>
                                                    )
                                                )}
                                            </tr>
                                        )
                                    )}
                            </tbody>
                        </table>
                    </>
                )
            )}
        </main>
    );
}

export default Page;
