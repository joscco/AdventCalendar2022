// String stuff
export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Math stuff

export type Vector2D = {
    x: number,
    y: number
}

export type Index2D = {
    row: number,
    column: number
}

export function quadDistance(a: Index2D, b: Index2D): number {
    return (a.row - b.row) * (a.row - b.row) + (a.column - b.column) * (a.column - b.column)
}

export function clampAndRound(value: number, min: number, max: number): number {
    return Math.round(clamp(value, min, max));
}

export function clamp(value: number, min: number, max: number): number {
    let minNum = Math.min(min, max)
    let maxNum = Math.max(min, max)
    return Math.max(minNum, Math.min(maxNum, value));
}

export function isRectangularArray(items: any[][]): boolean {
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

export function sum(a: Vector2D, b: Vector2D): Vector2D {
    return {x: a.x + b.x, y: a.y + b.y}
}