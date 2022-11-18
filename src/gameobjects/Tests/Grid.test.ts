import {Grid} from "../GameScreen/Grid/Grid";
import {GridItem} from "../GameScreen/Grid/GridItem";
import {Container} from "pixi.js";
import {isRectangularArray} from "../../General/Helpers";

describe('Grid Tests', () => {
    test('Setting up a grid with two dimensions work', () => {
        let grid = new Grid(2, 3)
        expect(grid).not.toBeNull()
    });

    test('Setting up a grid with one dimension doubles it', () => {
        let grid = new Grid(2)
        expect(grid)
            .not.toBeNull()
        expect(grid.getNumberOfRows())
            .toBe(2)
        expect(grid.getNumberOfColumns())
            .toBe(2)
    });

    test("Check hasGridDimension method", () => {
        expect(isRectangularArray([["a"]]))
            .toBe(true)
        expect(isRectangularArray([[]]))
            .toBe(false)
        expect(isRectangularArray([["a"], ["b", "c"]]))
            .toBe(false)
    })

    // test('Get method works', () => {
    //     expect(Grid.of([["a", "b"], ["c", "d"]]).get(0, 1))
    //         .toBe("b");
    // })
    //
    // test('Set method works', () => {
    //     let grid = new Grid(2, 2);
    //     grid.set(0, 1, "a")
    //     expect(grid.get(0, 1))
    //         .toBe("a");
    // })
    //
    // test('Remove method removes value from grid', () => {
    //     let grid = Grid.of([["a", "b"], ["c", "d"]])
    //     grid.remove(0, 0)
    //     expect(grid.get(0, 0))
    //         .toBeNull()
    // })
    //
    // test('Move method moves an item from one place to another if possible', () => {
    //     let grid = Grid.of([["a", "b"], ["c", "d"]])
    //     expect(() => grid.move(0, 0, 1, 1))
    //         .toThrowError()
    //
    //     grid.remove(1, 1)
    //     grid.move(0, 0, 1, 1)
    //     expect(grid.get(1, 1)).toBe("a")
    // })
    //
    // test('IsFreeAt Method works correctly', () => {
    //     let grid = Grid.of([["a", "b"], ["c", "d"]])
    //     expect(grid.isFreeAt(0, 0))
    //         .toBe(false)
    //
    //     grid.remove(0, 0)
    //     expect(grid.isFreeAt(0, 0))
    //         .toBe(true)
    // })

    test('HasIndex Method works correctly', () => {
        let grid = new Grid(2, 3)
        expect(grid.hasIndex({row: 0, column: 0}))
            .toBe(true)
        expect(grid.hasIndex({row: 1, column: 2}))
            .toBe(true)
        expect(grid.hasIndex({row: 2, column: 3}))
            .toBe(false)
        expect(grid.hasIndex({row: 1, column: 8}))
            .toBe(false)
        expect(grid.hasIndex({row: -1, column: 2}))
            .toBe(false)
    })

    test('ToString() gives correct representation', () => {
        let grid = new Grid(3, 4)
        expect(grid.toString()).toEqual(
            "[ | | | ]\n" +
            "[ | | | ]\n" +
            "[ | | | ]")

        let gridItem = new GridItem(new Container(), grid, {row: 0, column: 0})
        expect(grid.toString()).toEqual(
            "[x| | | ]\n" +
            "[ | | | ]\n" +
            "[ | | | ]")

        gridItem.trySetToIndex(grid, {row: 1, column: 2})
        expect(grid.toString()).toEqual(
            "[ | | | ]\n" +
            "[ | |x| ]\n" +
            "[ | | | ]")
    })
})