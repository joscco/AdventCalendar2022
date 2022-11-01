import {Grid, Index2D} from "../Grid/Grid";
import {Ingredient} from "../Ingredient";
import {ConveyorBeltTile} from "./ConveyorBeltTile";
import {ConveyorBeltStartTile} from "./ConveyorBeltStartTile";
import {ConveyorBeltEndTile} from "./ConveyorBeltEndTile";
import {GridItem} from "../Grid/GridItem";
import {ConveyorBeltMoveTile} from "./ConveyorBeltMoveTile";
import {Container} from "pixi.js";

export class ConveyorBelt extends Container {

    private grid: Grid
    private tiles: ConveyorBeltTile[]

    constructor(grid: Grid, startIndex: Index2D, endIndex: Index2D, betweenIndices: Index2D[]) {
        super()
        this.grid = grid

        this.tiles = []
        let startTile = new ConveyorBeltStartTile(startIndex)
        new GridItem(startTile, this.grid, startIndex.row, startIndex.column)

        let betweenTiles: ConveyorBeltMoveTile[] = []
        for (let index of betweenIndices) {
            let betweenTile = new ConveyorBeltMoveTile(index)
            new GridItem(betweenTile, this.grid, index.row, index.column)
            betweenTiles.push(betweenTile)
        }

        let endTile = new ConveyorBeltEndTile(endIndex)
        new GridItem(endTile, this.grid, endIndex.row, endIndex.column)

        this.tiles = [startTile, ...betweenTiles, endTile]

        this.sortableChildren = true
        for (let i = 0; i < this.tiles.length; i++) {
            let ingredient = new Ingredient()
            ingredient.zIndex = 1

            let tile = this.tiles[i]
            tile.zIndex = 0
            tile.setIngredientRef(ingredient)
            ingredient.position.set(tile.x, tile.y)
            this.addChild(ingredient)
            this.addChild(tile)
        }

        this.rotateTilesToPath()
    }

    step(): void {
        let ingredientsCopy = this.tiles.map(tile => tile.getIngredientRef()!)
        let beltLength = this.tiles.length
        for (let i = 0; i < beltLength; i++) {
            let currentTile = this.tiles[i]
            let nextTile = this.tiles[(i + 1) % beltLength]
            let currentIngredient = ingredientsCopy[i]
            nextTile.setIngredientRef(currentIngredient)
            currentTile.repositionIngredient(currentIngredient, nextTile.position)
        }
    }

    getEndIngredient(): Ingredient {
        return this.tiles[this.tiles.length - 1].getIngredientRef()!
    }

    private rotateTilesToPath() {
        // Start and End tile do not need to be rotated
        for (let index = 1; index < this.tiles.length - 1; index++) {
            let nextPosition = this.tiles[index + 1].position
            this.tiles[index].rotateTowards(nextPosition)
        }
    }
}