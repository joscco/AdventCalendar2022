// Klasse zum Verwalten und Gewährleisten rechteckiger 2-dimensionaler Arrays
// Benötigt für Darstellung des Maschinengitters

export class Grid<T> {

    private items: (T | null)[][] = [];

    constructor(numberRows: number, numberColumns?: number) {
        let fallbackNumberColumns = numberColumns ? numberColumns : numberRows
        this.items = this.setupNullArray(numberRows, fallbackNumberColumns);
    }

    private setupNullArray(numberRows: number, numberColumns: number): null[][] {
        let items: null[][] = []
        for (let rowIndex = 0; rowIndex < numberRows; rowIndex++) {
            items[rowIndex] = []
            for (let columnIndex = 0; columnIndex < numberColumns; columnIndex++) {
                items[rowIndex].push(null)
            }
        }
        return items;
    }

    getRows(): (T | null)[][] {
        return this.items
    }

    getRow(index: number): (T | null)[] {
        return this.items[index];
    }

    static of<T>(items: (T | null)[][]): Grid<T> {
        if (Grid.hasGridDimension(items)) {
            let numberOfRows = items.length;
            let numberOfCols = items[0].length;

            let grid = new Grid<T>(numberOfRows, numberOfCols);
            for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
                for (let colIndex = 0; colIndex < numberOfCols; colIndex++) {
                    grid.set(rowIndex, colIndex, items[rowIndex][colIndex] ?? null)
                }
            }
            return grid;
        }
        throw Error("Cannot set up Grid with given items: " + items)

    }

    static hasGridDimension(items: any[][]): boolean {
        if (items.length === 0 || items[0].length === 0) {
            return false;
        }

        let firstColumnNumber = items[0].length;
        for (let rowIndex = 1; rowIndex < items.length; rowIndex++) {
            if (items[rowIndex].length !== firstColumnNumber) {
                return false;
            }
        }

        return true;
    }

    getNumberOfRows(): number {
        return this.items.length;
    }

    getNumberOfColumns(): number {
        return this.items[0].length;
    }

    get(rowIndex: number, columnIndex: number): T | null {
        return this.items[rowIndex][columnIndex];
    }

    set(rowIndex: number, columnIndex: number, item: T | null): void {
        this.items[rowIndex][columnIndex] = item;
    }

    remove(rowIndex: number, columnIndex: number): T | null {
        let item = this.items[rowIndex][columnIndex];
        this.set(rowIndex, columnIndex, null)
        return item
    }

    move(fromRowIndex: number, fromColumnIndex: number, toRowIndex: number, toColumnIndex: number): void {
        if (!this.hasIndex(fromRowIndex, fromColumnIndex) ||
            !this.hasIndex(toRowIndex, fromColumnIndex) ||
            !this.isFreeAt(toRowIndex, toColumnIndex)) {
            throw Error(
                `Cannot move item from position [${fromRowIndex},${fromColumnIndex}] to position [${toRowIndex},${toColumnIndex}]. Position not existent or destination not free.`)
        }

        let item = this.get(fromRowIndex, fromColumnIndex)
        this.remove(fromRowIndex, fromColumnIndex)
        this.set(toRowIndex, toColumnIndex, item)
    }

    isFreeAt(rowIndex: number, columnIndex: number): boolean {
        return this.get(rowIndex, columnIndex) === null;
    }

    hasIndex(rowIndex: number, columnIndex: number): boolean {
        let validRowIndex = 0 <= rowIndex && rowIndex <= this.getNumberOfRows() - 1;
        let validColumnIndex = 0 <= columnIndex && columnIndex <= this.getNumberOfColumns() - 1;
        return validRowIndex && validColumnIndex;
    }

    toString(): string {
        let result = "";
        for (let row of this.items) {
            result += "[ " + row[0];
            for (let indexOfRow = 1; indexOfRow < row.length; indexOfRow++) {
                result += " | " + row[indexOfRow]
            }
            result += " ]\n"
        }
        return result
    }
}