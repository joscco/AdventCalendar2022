// Klasse zur Levelverwaltung, d.h.
// -> Einbinden des UI-Overlays
// -> Einbinden des Win-Screens
// -> Aufruf der Step()-Function
// -> Stoppen und Darstellung des Win-Screens, wenn geschafft

import {Recipe, RecipeBox} from "../gameobjects/RecipeBox";
import {Machine, MachineShape, parseShape} from "../gameobjects/Machinery/Machine";
import {Grid, Index2D, isRectangularArray} from "../gameobjects/Grid/Grid";
import {GridConnector} from "../gameobjects/Grid/GridConnector";
import Scene from "./Scene";
import {ConveyorBelt} from "../gameobjects/ConveyorBelt/ConveyorBelt";
import {Application, Graphics, Sprite} from "pixi.js";
import {ASSET_STORE, GAME_HEIGHT, GAME_WIDTH} from "../index";
import {GridActionHandler} from "../gameobjects/Grid/GridActionHandlers/GridActionHandler";
import {StickyDragActionHandler} from "../gameobjects/Grid/GridActionHandlers/StickyDragActionHandler";
import {AutomaticDragActionHandler} from "../gameobjects/Grid/GridActionHandlers/AutomaticDragActionHandler";
import {GridItem} from "../gameobjects/Grid/GridItem";

export class FactoryScene extends Scene {

    private readonly machineInventoryGrid: Grid;
    private readonly machineUsageGrid: Grid;
    private readonly machineGridItems: GridItem[];
    private machineGridConnector: GridConnector;
    private readonly beltGrid: Grid;
    private readonly belts: ConveyorBelt[];
    private recipeBox;

    constructor(app: Application, conveyorBeltPattern: string, recipe: Recipe, machines: MachineShape[]) {
        super();
        this.app = app;
        this.sortableChildren = true

        this.initBackground();

        let patternArr = conveyorBeltPattern.split("\n").map(row => row.split("|"))

        if (!isRectangularArray(patternArr)) {
            throw Error("Conveyor Belt Pattern is not rectangular!")
        }

        this.recipeBox = this.setupRecipeBox(recipe);
        this.beltGrid = this.setupBeltGridAndBelts(patternArr);
        this.belts = this.setupBelts(patternArr, this.beltGrid)
        this.machineInventoryGrid = this.setupInventoryGrid(machines.length)
        this.machineUsageGrid = this.setupMachineUsageGrid(this.beltGrid!.getNumberOfRows(), this.beltGrid!.getNumberOfColumns())
        this.machineGridItems = this.setupMachineGridItems(machines, this.machineInventoryGrid, this.machineUsageGrid)
        this.machineGridConnector = this.setupGridConnector(this.machineInventoryGrid, this.machineUsageGrid, this.machineGridItems)
    }

    private setupRecipeBox(recipe: Recipe) {
        let recipeBox = new RecipeBox(recipe);
        recipeBox.position.set(225, 250)
        this.addChild(recipeBox)
        return recipeBox;
    }

    start() {
        setInterval(() => this.checkRecipe(), 1500)
    }

    private setupBeltGridAndBelts(patternArr: string[][]): Grid {
        let numberOfRows = patternArr.length;
        let numberOfColumns = patternArr[0].length;

        let beltGrid = new Grid(numberOfRows, numberOfColumns, "conveyorBelts")
        beltGrid.tileWidth = 150
        beltGrid.tileHeight = 150
        beltGrid.columnOffsetX = 15
        beltGrid.rowOffsetY = 15
        beltGrid.centerIn({x: 100, y: 150, width: 1820, height: 1080 - 150})
        this.addChild(beltGrid)

        return beltGrid;
    }

    private parsePatternAsMap(conveyorBeltPattern: (string)[][]): Map<string, { number: number, index: Index2D }[]> | null {
        let letterMap: Map<string, { number: number, index: Index2D }[]> = new Map()

        for (let row = 0; row < conveyorBeltPattern.length; row++) {
            for (let column = 0; column < conveyorBeltPattern[0].length; column++) {
                if (conveyorBeltPattern[row][column].trim() !== "") {
                    let entry = conveyorBeltPattern[row][column]!.trim();
                    if (entry.length !== 2 || !this.isUpperLetter(entry.charAt(0)) || !this.isNumber(entry.charAt(1))) {
                        console.log(`${entry} is not a correct belt pattern entry!`)
                        return null;
                    }
                    let letter = entry.charAt(0)
                    let number = Number.parseInt(entry.charAt(1))
                    let index = {row: row, column: column}

                    if (!letterMap.has(letter)) {
                        letterMap.set(letter, [{number: number, index: index}])
                    } else {
                        letterMap.get(letter)!.push({number: number, index: index})
                    }
                }
            }
        }

        // Check map for completeness
        for (let letter of letterMap.keys()) {
            let numbers = letterMap.get(letter)!.map(e => e.number)
            for (let i = 0; i < numbers.length; i++) {
                if (numbers.indexOf(i) === -1) {
                    return null
                }
            }

            // Sort after that
            letterMap.set(letter, letterMap.get(letter)!.sort((a, b) => a.number - b.number))
        }

        return letterMap;
    }

    private isUpperLetter(str: String) {
        return str.length === 1 && str.match(/[A-Z]/);
    }

    private isNumber(str: String) {
        return str.length === 1 && str.match(/[0-9]+/);
    }

    private initBackground() {
        let background = new Graphics()
        background.beginFill(0xf18272)
        background.drawRect(0, 0, GAME_WIDTH, GAME_HEIGHT)
        background.endFill()
        background.zIndex = -1
        this.addChild(background)
    }

    private setupInventoryGrid(length: number): Grid {
        let outsideGrid = new Grid(1, length, "outside")
        outsideGrid.tileWidth = 100
        outsideGrid.tileHeight = 100
        outsideGrid.columnOffsetX = 25
        outsideGrid.centerIn({x: 100, y: 50, width: 1820, height: 200})
        outsideGrid.drawGrid()
        outsideGrid.zIndex = 0
        this.addChild(outsideGrid)

        let outsideGridSprite = new Sprite(ASSET_STORE.GAME_SCENE!.machineOuterGrid)
        outsideGridSprite.anchor.set(0.5)
        outsideGridSprite.position.set(outsideGrid.getCenterX(), outsideGrid.getCenterY())
        outsideGridSprite.zIndex = -1
        this.addChild(outsideGridSprite)
        return outsideGrid
    }

    private setupMachineUsageGrid(numberOfRows: number, numberOfColumns: number): Grid {
        let machineUsageGrid = new Grid(numberOfRows, numberOfColumns, "machineGrid")
        machineUsageGrid.tileWidth = 150
        machineUsageGrid.tileHeight = 150
        machineUsageGrid.columnOffsetX = 15
        machineUsageGrid.rowOffsetY = 15
        machineUsageGrid.centerIn({x: 100, y: 150, width: 1820, height: 1080 - 150})
        machineUsageGrid.drawGrid()
        this.addChild(machineUsageGrid)
        return machineUsageGrid
    }

    private setupGridConnector(machineInventoryGrid: Grid, machineUsageGrid: Grid, machineGridItems: GridItem[]): GridConnector {
        let gridActionMap = new Map<Grid, GridActionHandler>()
        gridActionMap.set(machineUsageGrid, new StickyDragActionHandler(machineInventoryGrid))

        let gridConnector = new GridConnector(
            machineInventoryGrid,
            new AutomaticDragActionHandler(machineInventoryGrid),
            gridActionMap,
            machineGridItems)
        gridConnector.defineDragAndDrop()
        return gridConnector
    }

    private setupMachineGridItems(machineShapes: MachineShape[], inventoryGrid: Grid, machineGrid: Grid): GridItem[] {
        let gridItems = []
        let horizontalIndex = 0
        for (let machineShape of machineShapes) {
            let machine = new Machine("neutral", machineShape, machineGrid)
            this.addChild(machine)

            let gridItem = new GridItem(machine, inventoryGrid, 0, horizontalIndex)
            gridItem.addShape(machineGrid, parseShape(machine.getShape()))

            gridItems.push(gridItem)
            horizontalIndex++
        }

        return gridItems;
    }

    private checkRecipe() {
        let correctness = this.recipeBox.checkIngredients(this.belts.map(belt => belt.getEndIngredient().getID()!))
        for (let i = 0; i < this.belts.length; i++) {
            let belt = this.belts[i]
            belt.updateIngredients(this.machineUsageGrid)
            belt.step();
            belt.showLastTileOverlay(correctness[i])
        }
    }

    private setupBelts(patternArr: string[][], beltGrid: Grid): ConveyorBelt[] {
        let beltMap = this.parsePatternAsMap(patternArr)
        if (!beltMap) {
            throw Error("Conveyor Belt Pattern could not be parsed!")
        }

        let belts = []
        for (let beltData of beltMap.values()) {
            let beltLength = beltData.length
            let belt = new ConveyorBelt(
                beltGrid,
                beltData[0].index,
                beltData[beltLength - 1].index,
                beltData.slice(1, beltLength - 1).map(data => data.index))
            this.addChild(belt)
            belts.push(belt)
        }

        return belts
    }
}