import {Grid} from "../Grid";

describe('Grid Tests', () => {
    test('Setting up a grid with two dimensions work', () => {
        let grid = new Grid(2, 3)
        expect(grid)
            .not.toBeNull()
        expect(grid.getRows().length)
            .toBe(2)
        expect(grid.getRow(0).length)
            .toBe(3)
    });

    test('Setting up a grid with one dimension doubles it', () => {
        let grid = new Grid(2)
        expect(grid)
            .not.toBeNull()
        expect(grid.getRows().length)
            .toBe(2)
        expect(grid.getRow(0).length)
            .toBe(2)
    });

    test('Setting up grid via of method for array', () => {
        let grid = Grid.of([["a", "b"], ["c", "d"], ["e", "f"]]);
        expect(grid)
            .not.toBeNull()
        expect(grid.getNumberOfRows())
            .toBe(3)
        expect(grid.getNumberOfColumns())
            .toBe(2)

        expect(() => Grid.of([[]]))
            .toThrowError("Cannot set up Grid with given items: ")
        expect(() => Grid.of([["a"], ["b", "c"]]))
            .toThrowError("Cannot set up Grid with given items: a,b,c")
    })

    test("Check hasGridDimension method", () => {
        expect(Grid.hasGridDimension([["a"]]))
            .toBe(true)
        expect(Grid.hasGridDimension([[]]))
            .toBe(false)
        expect(Grid.hasGridDimension([["a"], ["b", "c"]]))
            .toBe(false)
    })

    test('NumberOfRows Method gives correct value', () => {
        expect(new Grid(2, 3).getNumberOfRows())
            .toBe(2)
        expect(new Grid(4).getNumberOfRows())
            .toBe(4)
    })

    test('NumberOfColumns Method gives correct value', () => {
        expect(new Grid(2, 3).getNumberOfColumns())
            .toBe(3)
        expect(new Grid(4).getNumberOfColumns())
            .toBe(4)
    })

    test('Get method works', () => {
        expect(Grid.of([["a", "b"], ["c", "d"]]).get(0, 1))
            .toBe("b");
    })

    test('Set method works', () => {
        let grid = new Grid<string>(2, 2);
        grid.set(0, 1, "a")
        expect(grid.get(0, 1))
            .toBe("a");
    })

    test('Remove method removes value from grid', () => {
        let grid = Grid.of([["a", "b"], ["c", "d"]])
        grid.remove(0, 0)
        expect(grid.get(0, 0))
            .toBeNull()
    })

    test('Move method moves an item from one place to another if possible', () => {
        let grid = Grid.of([["a", "b"], ["c", "d"]])
        expect(() => grid.move(0, 0, 1, 1))
            .toThrowError()

        grid.remove(1, 1)
        grid.move(0, 0, 1, 1)
        expect(grid.get(1, 1)).toBe("a")
    })

    test('IsFreeAt Method works correctly', () => {
        let grid = Grid.of([["a", "b"], ["c", "d"]])
        expect(grid.isFreeAt(0, 0))
            .toBe(false)

        grid.remove(0, 0)
        expect(grid.isFreeAt(0, 0))
            .toBe(true)
    })

    test('HasIndex Method works correctly', () => {
        let grid = new Grid(2, 3)
        expect(grid.hasIndex(0, 0))
            .toBe(true)
        expect(grid.hasIndex(1, 2))
            .toBe(true)
        expect(grid.hasIndex(2, 3))
            .toBe(false)
        expect(grid.hasIndex(1, 8))
            .toBe(false)
        expect(grid.hasIndex(-1, 2))
            .toBe(false)
    })

    test('ToString() gives correct representation', () => {
        expect(Grid.of([["a", "b"], ["c", "d"]]).toString())
            .toBe("[ a | b ]\n[ c | d ]\n")
    })
})