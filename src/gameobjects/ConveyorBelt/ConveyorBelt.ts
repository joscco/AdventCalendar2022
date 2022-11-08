import {Grid, Index2D} from "../Grid/Grid";
import {Ingredient, IngredientID} from "../Ingredient";
import {ConveyorBeltTile} from "./ConveyorBeltTile";
import {ConveyorBeltStartTile} from "./ConveyorBeltStartTile";
import {ConveyorBeltEndTile} from "./ConveyorBeltEndTile";
import {GridItem} from "../Grid/GridItem";
import {ConveyorBeltMoveTile} from "./ConveyorBeltMoveTile";
import {Container, Sprite, Texture} from "pixi.js";
import {ASSET_STORE, TOOLTIP_MANAGER} from "../../index";
import {Machine} from "../Machinery/Machine";

export class ConveyorBelt extends Container {

    private startIngredient: IngredientID
    private grid: Grid
    private tiles: ConveyorBeltTile[]
    private lastTileOverlay: Sprite
    private lastTileGoodTexture: Texture
    private lastTileBadTexture: Texture

    constructor(grid: Grid, startIndex: Index2D, endIndex: Index2D, betweenIndices: Index2D[], startIngredient: IngredientID) {
        super()

        this.startIngredient = startIngredient
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

        this.lastTileOverlay = new Sprite()
        this.lastTileOverlay.anchor.set(0.5)
        this.lastTileOverlay.scale.set(0)
        this.lastTileOverlay.zIndex = 2
        this.addChild(this.lastTileOverlay)
        this.lastTileGoodTexture = ASSET_STORE.getTextureAsset("goodFieldOverlay")
        this.lastTileBadTexture = ASSET_STORE.getTextureAsset("badFieldOverlay")
        this.lastTileOverlay.position.set(endTile.x, endTile.y)

        this.tiles = [startTile, ...betweenTiles, endTile]

        this.sortableChildren = true
        for (let i = 0; i < this.tiles.length; i++) {
            let tile = this.tiles[i]
            tile.zIndex = 0

            let ingredient = new Ingredient(this.startIngredient)
            ingredient.zIndex = 1
            TOOLTIP_MANAGER.registerTooltipFor(ingredient, () => ingredient.getTooltipText())
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

            if (i === beltLength - 1) {
                currentIngredient.set(this.startIngredient)
            }
            currentTile.repositionIngredient(currentIngredient, nextTile.position)

        }
    }

    getEndIngredient(): Ingredient {
        return this.tiles[this.tiles.length - 1].getIngredientRef()!
    }

    async showLastTileOverlay(correct: boolean, delay: number) {
        this.lastTileOverlay.texture = correct ? this.lastTileGoodTexture : this.lastTileBadTexture
        await gsap.to(this.lastTileOverlay.scale, {x: 1, y: 1, duration: 0.3, ease: Back.easeOut, delay: delay})
        gsap.to(this.lastTileOverlay.scale, {x: 0, y: 0, duration: 0.3, ease: Back.easeIn})
    }

    private rotateTilesToPath() {
        // Start and End tile do not need to be rotated
        for (let index = 1; index < this.tiles.length - 1; index++) {
            let nextPosition = this.tiles[index + 1].position
            this.tiles[index].rotateTowards(nextPosition)
        }
    }

    updateIngredients(machineGrid: Grid) {
        for (let tile of this.tiles) {
            let ingredient = tile.getIngredientRef()!
            if (machineGrid.get(tile.index)) {
                let machine = machineGrid.get(tile.index)!.gridItem.content! as Machine
                let machineType = machine.getType()
                switch (machineType) {
                    case "sweet":
                    case "neutral":
                    case "sour":
                    case "savoury":
                        ingredient.setTaste(machineType)
                        break
                    case "sticky":
                    case "solid":
                    case "powdery":
                    case "liquid":
                        ingredient.setConsistence(machineType)
                        break
                    case "white":
                    case "red":
                    case "yellow":
                    case "brown":
                        ingredient.setColor(machineType)
                        break
                }
            }
        }
    }

    resetIngredients() {
        this.tiles.forEach(tile => tile.ingredientRef?.set(this.startIngredient))
    }
}