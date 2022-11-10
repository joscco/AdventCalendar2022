import {Recipe, RecipeBox} from "../gameobjects/RecipeBox";
import {getMachineNameForType, Machine, MachineShape, parseShape} from "../gameobjects/Machinery/Machine";
import {GridConnector} from "../gameobjects/Grid/GridConnector";
import Scene from "./Scene";
import {ConveyorBelt} from "../gameobjects/ConveyorBelt/ConveyorBelt";
import {Application, Sprite} from "pixi.js";
import {ASSET_STORE, GAME_DATA, GAME_HEIGHT, GAME_WIDTH, INGREDIENT_COOKBOOK, TOOLTIP_MANAGER} from "../index";
import {GridActionHandler} from "../gameobjects/Grid/GridActionHandlers/GridActionHandler";
import {StickyDragActionHandler} from "../gameobjects/Grid/GridActionHandlers/StickyDragActionHandler";
import {AutomaticDragActionHandler} from "../gameobjects/Grid/GridActionHandlers/AutomaticDragActionHandler";
import {GridItem} from "../gameobjects/Grid/GridItem";
import {WinScreen} from "../general/WinScreen";
import {UIButtonOverlay} from "../ui/ButtonOverlay";
import {IngredientID} from "../gameobjects/Ingredient"
import {StepButton} from "../ui/Buttons/StepButton";
import {RecipeOverviewButton} from "../ui/Buttons/RecipeOverviewButton";
import {UnlockedIngredientAlarm} from "../gameobjects/UnlockedIngredientAlarm";
import {Grid} from "../gameobjects/Grid/Grid";
import {Index2D, isRectangularArray} from "../general/Helpers";

export type FactorySceneOptions = {
    app: Application,
    level: number,
    conveyorBeltPattern: string,
    recipe: Recipe,
    machines: MachineShape[],
    startIngredients?: Map<string, IngredientID>,
    hasStepButton?: boolean
}

export class FactoryScene extends Scene {

    private readonly machineInventoryGrid: Grid;
    private readonly machineUsageGrid: Grid;
    private readonly machineGridItems: GridItem[];
    private machineGridConnector: GridConnector;
    private startIngredients: IngredientID[]
    private readonly beltGrid: Grid;
    private readonly belts: ConveyorBelt[];
    private stepButton?: StepButton
    private level: number

    // UI
    private recipeBox: RecipeBox;
    private unlockedIngredientAlarm?: UnlockedIngredientAlarm;

    private winScreen: WinScreen;
    private recipeButton: RecipeOverviewButton;
    private uiOverlay: UIButtonOverlay

    private timeInterval?: NodeJS.Timer

    constructor(opts: FactorySceneOptions) {
        super();
        this.app = opts.app;
        this.level = opts.level
        this.sortableChildren = true

        this.initBackground();

        let patternArr = opts.conveyorBeltPattern.split("\n").map(row => row.split("|"))

        if (!isRectangularArray(patternArr)) {
            throw Error("Conveyor Belt Pattern is not rectangular!")
        }

        this.recipeButton = new RecipeOverviewButton(INGREDIENT_COOKBOOK)
        this.recipeButton.position.set(300, 125)
        this.addChild(this.recipeButton)

        this.recipeBox = this.setupRecipeBox(opts.recipe);
        this.beltGrid = this.setupBeltGridAndBelts(patternArr);
        this.startIngredients = opts.startIngredients ? [...opts.startIngredients.values()] : []
        this.belts = this.setupBelts(patternArr, this.beltGrid, opts.startIngredients)

        this.winScreen = new WinScreen(opts.recipe, this.level)
        this.winScreen.zIndex = 10
        this.addChild(this.winScreen)

        this.uiOverlay = new UIButtonOverlay()
        this.uiOverlay.zIndex = 5
        this.addChild(this.uiOverlay)

        this.machineInventoryGrid = this.setupInventoryGrid(opts.machines.length)
        this.machineUsageGrid = this.setupMachineUsageGrid(this.beltGrid!.getNumberOfRows(), this.beltGrid!.getNumberOfColumns())
        this.machineGridItems = this.setupMachineGridItems(opts.machines, this.machineInventoryGrid, this.machineUsageGrid)
        this.machineGridConnector = this.setupGridConnector(this.machineInventoryGrid, this.machineUsageGrid, this.machineGridItems)

        if (opts.hasStepButton) {
            this.stepButton = new StepButton(this)
            this.stepButton.position.set(GAME_WIDTH - 180, GAME_HEIGHT / 2)
            this.addChild(this.stepButton)
        }
    }

    private setupRecipeBox(recipe: Recipe) {
        let recipeBox = new RecipeBox(recipe);
        recipeBox.position.set(225, 250)
        this.addChild(recipeBox)
        return recipeBox;
    }

    start() {
        this.winScreen.blendOut()
        this.machineGridItems.forEach(item => {
            // TODO: Ganz schlimm, überarbeiten
            let nearestFreeIndex = this.machineInventoryGrid.getNearestFreeIndexForPositionAndItem(this.machineInventoryGrid.position, item)!
            item.trySetToIndexInstantly(this.machineInventoryGrid, nearestFreeIndex)
            item.unlock()
        })

        this.belts.forEach(belt => belt.resetIngredients())

        this.recipeBox.ingredients.forEach(ingredient => ingredient.reset())

        // Urgh, a little nasty
        if (!this.stepButton) {
            clearInterval(this.timeInterval)
            this.timeInterval = setInterval(() => this.checkRecipe(), 3500)
        }

        this.startIngredients.forEach(ingredient => GAME_DATA.saveNewUnlockedIngredient(ingredient))
    }

    async stop() {
        await this.recipeButton.close()
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
        let background = new Sprite(ASSET_STORE.getTextureAsset("background"))
        background.zIndex = -1
        this.addChild(background)
    }

    private setupInventoryGrid(length: number): Grid {
        let outsideGrid = new Grid(1, length, "outside")
        outsideGrid.tileWidth = 100
        outsideGrid.columnOffsetX = 25
        outsideGrid.centerIn({x: 100, y: 125, width: 1820, height: 0})
        outsideGrid.zIndex = 0
        this.addChild(outsideGrid)

        let outsideGridSprite = new Sprite(ASSET_STORE.getTextureAsset("machineInventory"))
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
        machineUsageGrid.setDefaultSlotTexture(ASSET_STORE.getTextureAsset("emptyField"))
        machineUsageGrid.drawGrid()
        machineUsageGrid.zIndex = -1
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
            let machine = new Machine("sweet", machineShape, machineGrid)
            this.addChild(machine)
            let gridItem = new GridItem(machine, inventoryGrid, 0, horizontalIndex)

            gridItem.addShape(machineGrid, parseShape(machine.getShape()))
            gridItems.push(gridItem)
            TOOLTIP_MANAGER.registerTooltipFor(machine,
                () => getMachineNameForType(machine.getType()),
                () => (!gridItem.dragging
                    && gridItem.currentGrid?.id === "machineGrid"
                    && !(gridItem.content as Machine).isShowingTypeChoosingMenu()))
            horizontalIndex++
        }

        return gridItems;
    }

    checkRecipe() {
        let beltIngredients = this.belts.map(belt => belt.getEndIngredient().getID()!)
        let correctnessPerBelt = this.recipeBox.checkIngredientsAreProvided(beltIngredients, this.recipeBox.recipe.ingredients)
        for (let i = 0; i < this.belts.length; i++) {
            let belt = this.belts[i]
            belt.updateIngredients(this.machineUsageGrid)
            belt.step();
            belt.showLastTileOverlay(correctnessPerBelt[i], i * 0.05)
        }

        let correctnessPerIngredient = this.recipeBox.checkIngredientsAreProvided(this.recipeBox.recipe.ingredients, beltIngredients)
        for (let i = 0; i < this.recipeBox.ingredients.length; i++) {
            let recipeSlot = this.recipeBox.ingredients[i];
            recipeSlot.setFulfilled(correctnessPerIngredient[i])
        }

        let levelSolved = correctnessPerIngredient.reduce((a, b) => a && b)

        if (levelSolved) {
            this.winScreen.blendIn()
            this.machineGridItems.forEach(item => item.lock())

            GAME_DATA.saveUnlockedLevel(Math.max(this.level + 1, GAME_DATA.getUnlockedLevels()))
            clearInterval(this.timeInterval)
        }
    }

    private setupBelts(patternArr: string[][], beltGrid: Grid, startIngredients?: Map<string, IngredientID>): ConveyorBelt[] {
        let beltMap = this.parsePatternAsMap(patternArr)
        if (!beltMap) {
            throw Error("Conveyor Belt Pattern could not be parsed!")
        }

        let belts = []
        for (let beltKey of beltMap.keys()) {
            let beltData = beltMap.get(beltKey)!
            let beltLength = beltData.length
            let belt = new ConveyorBelt(
                beltGrid,
                beltData[0].index,
                beltData[beltLength - 1].index,
                beltData.slice(1, beltLength - 1).map(data => data.index),
                startIngredients?.get(beltKey) ?? "cream")
            this.addChild(belt)
            belts.push(belt)
        }

        return belts
    }
}