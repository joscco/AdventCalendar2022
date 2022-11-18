import {Grid} from "../Grid/Grid";
import {Ingredient, IngredientID} from "./Ingredient";
import {ConveyorBeltTile} from "./ConveyorBeltTile";
import {ConveyorBeltStartTile} from "./ConveyorBeltStartTile";
import {ConveyorBeltEndTile} from "./ConveyorBeltEndTile";
import {GridItem} from "../Grid/GridItem";
import {ConveyorBeltMoveTile} from "./ConveyorBeltMoveTile";
import {Container, Sprite, Texture} from "pixi.js";
import {ASSET_STORE, GAME_DATA, TOOLTIP_MANAGER} from "../../../index";
import {Cage, Machine} from "../Machinery/Machine";
import {Index2D} from "../../../General/Helpers";

export class ConveyorBelt extends Container {

    private startIngredient: IngredientID
    private beltGrid: Grid
    private machineGrid: Grid
    private tiles: ConveyorBeltTile[]
    private firstTileCage?: Cage
    private lastTileCage?: Cage
    private lastTileOverlay: Sprite
    private lastTileGoodTexture: Texture
    private lastTileBadTexture: Texture

    constructor(beltGrid: Grid, machineGrid: Grid, startIndex: Index2D, endIndex: Index2D, betweenIndices: Index2D[], startIngredient: IngredientID) {
        super()

        this.startIngredient = startIngredient
        this.beltGrid = beltGrid
        this.machineGrid = machineGrid

        this.tiles = []
        let startTile = new ConveyorBeltStartTile(startIndex)
        new GridItem(startTile, this.beltGrid, startIndex)

        let betweenTiles: ConveyorBeltMoveTile[] = []
        for (let index of betweenIndices) {
            let betweenTile = new ConveyorBeltMoveTile(index)
            new GridItem(betweenTile, this.beltGrid, index)
            betweenTiles.push(betweenTile)
        }

        let endTile = new ConveyorBeltEndTile(endIndex)
        new GridItem(endTile, this.beltGrid, endIndex)

        this.lastTileOverlay = new Sprite()
        this.lastTileOverlay.anchor.set(0.5)
        this.lastTileOverlay.scale.set(0)
        this.lastTileOverlay.zIndex = 3
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
            ingredient.zIndex = 2
            TOOLTIP_MANAGER.registerTooltipFor(ingredient, () => ingredient.getTooltipText())
            tile.setIngredientRef(ingredient)
            ingredient.position.set(tile.x, tile.y)

            this.addChild(ingredient)
            this.addChild(tile)
        }

        this.setupCages()

        this.rotateTilesToPath()
    }

    async step(): Promise<void> {
        let ingredientsCopy = this.tiles.map(tile => tile.getIngredientRef()!)
        let beltLength = this.tiles.length
        for (let i = 0; i < beltLength; i++) {
            let currentTile = this.tiles[i]
            let nextTile = this.tiles[(i + 1) % beltLength]
            let currentIngredient = ingredientsCopy[i]
            nextTile.setIngredientRef(currentIngredient)


            await currentTile.repositionIngredient(currentIngredient, nextTile.position)
            if (i === beltLength - 1) {
                currentIngredient.set(this.startIngredient)
            }

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
        let lastIndex = this.tiles.length - 1
        // Start and End tile do not need to be rotated
        for (let index = 0; index < lastIndex; index++) {
            let nextPosition = this.tiles[index + 1].position
            this.tiles[index].rotateTowards(nextPosition)
        }

        this.tiles[lastIndex].rotateTowards(this.tiles[lastIndex - 1].position)

        this.firstTileCage!.rotateTowards(this.tiles[1].position)
        this.lastTileCage!.rotateTowards(this.tiles[lastIndex - 1].position)
    }

    updateIngredients(machineGrid: Grid) {
        for (let tile of this.tiles) {
            let ingredient = tile.getIngredientRef()!
            if (machineGrid.get(tile.index) && machineGrid.get(tile.index)!.gridItem.content instanceof Machine) {
                let machine = machineGrid.get(tile.index)!.gridItem.content! as Machine
                let machineType = machine.getType()
                let ingredientBefore = ingredient.getID()
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

                let ingredientAfter = ingredient.getID()
                if (ingredientBefore !== ingredientAfter) {
                    GAME_DATA.saveNewUnlockedIngredient(ingredientAfter)
                    ingredient.emitParticles()
                }
            }
        }
    }

    pauseIngredientAnimations() {
        this.tiles.forEach(tile => tile.ingredientRef?.pauseAnimating())
    }

    resumeIngredientAnimations() {
        this.tiles.forEach(tile => tile.ingredientRef?.resumeAnimating())
    }

    resetIngredients() {
        this.tiles.forEach(tile => tile.ingredientRef?.set(this.startIngredient))
    }

    private setupCages() {
        this.firstTileCage = new Cage("1x1", this.machineGrid)
        this.firstTileCage.updateAppearance()
        this.firstTileCage.zIndex = 1
        this.lastTileCage = new Cage("1x1", this.machineGrid)
        this.lastTileCage.updateAppearance()
        this.lastTileCage.zIndex = 1

        let firstTile = this.tiles[0]
        let lastTile = this.tiles[this.tiles.length - 1]

        this.addChild(this.firstTileCage)
        this.addChild(this.lastTileCage)

        new GridItem(this.firstTileCage, this.machineGrid, firstTile.index)
        new GridItem(this.lastTileCage, this.machineGrid, lastTile.index)
    }
}