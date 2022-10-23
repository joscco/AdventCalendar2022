import {GridPositionCalculator} from "../GridPositionCalculator";

describe('Grid Position Calculator Tests', () => {
    test("Constructor with rows and columns work.", () => {
        expect(new GridPositionCalculator(2, 2)).not.toBeNull()
    })

    test("getPositionForIndex returns positions for valid indices.", () => {
        let gridCalculator = new GridPositionCalculator(2,3);
        expect(() => gridCalculator.getPositionForIndex({row: 0, column: 3}))
            .toThrowError()
        expect(() => gridCalculator.getPositionForIndex({row: 1, column: 2}))
            .not.toThrowError()
    })

    test("Position x and y defines anchor of index field (0, 0).", () => {
        let gridCalculator = new GridPositionCalculator(2,3);
        expect(gridCalculator.getPositionForIndex({row: 0, column: 0}))
            .toStrictEqual({x: 0, y: 0})

        gridCalculator.x = 100
        gridCalculator.y = 200
        expect(gridCalculator.getPositionForIndex({row: 0, column: 0}))
            .toStrictEqual({x: 100, y: 200})
    })

    test("Setting tile width, height adapts position of tiles.", () => {

    })

    test("Setting columnOffsetX, columnOffsetY, rowOffsetX, rowOffsetY", () => {

    })

    test("Setting alternating offset option gives a griddish structure", () => {

    })

    test("CenterIn method centers the position of the grid", () => {

    })

    test("findNearestIndex turns positions into index.", () => {

    })
})