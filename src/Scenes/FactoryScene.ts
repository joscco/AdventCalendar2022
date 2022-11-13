import {Recipe, RecipeBox, RecipeID, RECIPES} from "../gameobjects/RecipeBox";
import {
    Block,
    BlockLayout,
    getMachineNameForType,
    Machine,
    MachineLayout,
    parseShape
} from "../gameobjects/Machinery/Machine";
import {GridConnector} from "../gameobjects/Grid/GridConnector";
import Scene from "./Basics/Scene";
import {ConveyorBelt} from "../gameobjects/ConveyorBelt/ConveyorBelt";
import {Application, Sprite} from "pixi.js";
import {ASSET_STORE, GAME_DATA, GAME_HEIGHT, GAME_WIDTH, INGREDIENT_COOKBOOK, TOOLTIP_MANAGER} from "../index";
import {StickyDragActionHandler} from "../gameobjects/Grid/GridActionHandlers/StickyDragActionHandler";
import {GridItem} from "../gameobjects/Grid/GridItem";
import {WinScreen} from "../General/WinScreen";
import {UIButtonOverlay} from "../UI/ButtonOverlay";
import {IngredientID} from "../gameobjects/Ingredient"
import {StepButton} from "../UI/Buttons/StepButton";
import {Grid} from "../gameobjects/Grid/Grid";
import {Index2D, isRectangularArray} from "../General/Helpers";

export type FactorySceneOptions = {
    app: Application,
    level: number,
    conveyorBeltPattern: string,
    recipe: RecipeID,
    machineLayout: MachineLayout,
    blockLayout?: BlockLayout,
    startIngredients?: Map<string, IngredientID>,
    hasStepButton?: boolean
}

export class FactoryScene extends Scene {

    private readonly machineLayout: MachineLayout;
    private readonly blockLayout: BlockLayout;
    private readonly machineGrid: Grid;
    private readonly machineGridItems: GridItem[];
    private readonly blockGridItems: GridItem[];
    private machineGridConnector: GridConnector;

    private startIngredients: IngredientID[]
    private readonly beltGrid: Grid;
    private readonly belts: ConveyorBelt[];
    private stepButton?: StepButton
    private level: number

    // UI
    private recipeBox: RecipeBox;
    private winScreen: WinScreen;
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

        this.recipeBox = this.setupRecipeBox(RECIPES[opts.recipe]);
        this.beltGrid = this.setupBeltGridAndBelts(patternArr);
        this.machineGrid = this.setupMachineUsageGrid(this.beltGrid.getNumberOfRows(), this.beltGrid.getNumberOfColumns())

        this.startIngredients = opts.startIngredients ? [...opts.startIngredients.values()] : []
        this.belts = this.setupBelts(patternArr, this.beltGrid, this.machineGrid, opts.startIngredients)

        this.winScreen = new WinScreen(opts.recipe, this.level)
        this.winScreen.zIndex = 10
        this.addChild(this.winScreen)

        this.uiOverlay = new UIButtonOverlay()
        this.uiOverlay.zIndex = 5
        this.addChild(this.uiOverlay)

        this.machineLayout = opts.machineLayout
        this.machineGridItems = this.setupMachineGridItems(this.machineLayout, this.machineGrid)

        this.blockLayout = opts.blockLayout ?? []
        this.blockGridItems = this.setupBlocks(this.blockLayout, this.machineGrid)
        this.machineGridConnector = this.setupGridConnector(this.machineGrid, this.machineGridItems)

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
        INGREDIENT_COOKBOOK.showButton()

        // Reset all types and positions
        this.machineGridItems.forEach(item => item.freeFromGrid())
        this.machineGridItems.forEach((item, index) => {
            let layoutEntry = this.machineLayout[index];
            (item.content as Machine).setType(layoutEntry.type ?? "sweet")
            item.trySetToIndexInstantly(this.machineGrid, layoutEntry.index)
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
        INGREDIENT_COOKBOOK.hideButton()
        INGREDIENT_COOKBOOK.hideCookbook()

    }

    private setupBeltGridAndBelts(patternArr: string[][]): Grid {
        let numberOfRows = patternArr.length;
        let numberOfColumns = patternArr[0].length;

        let beltGrid = new Grid(numberOfRows, numberOfColumns, "conveyorBelts")
        beltGrid.tileWidth = 150
        beltGrid.tileHeight = 150
        beltGrid.columnOffsetX = 15
        beltGrid.rowOffsetY = 15
        beltGrid.centerIn({x: 400, y: 0, width: GAME_WIDTH - 400, height: GAME_HEIGHT})
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

    private setupMachineUsageGrid(numberOfRows: number, numberOfColumns: number): Grid {
        let machineUsageGrid = new Grid(numberOfRows, numberOfColumns, "machineGrid")
        machineUsageGrid.tileWidth = 150
        machineUsageGrid.tileHeight = 150
        machineUsageGrid.columnOffsetX = 15
        machineUsageGrid.rowOffsetY = 15
        machineUsageGrid.centerIn({x: 400, y: 0, width: GAME_WIDTH - 400, height: GAME_HEIGHT})
        machineUsageGrid.setDefaultSlotTexture(ASSET_STORE.getTextureAsset("emptyField"))
        machineUsageGrid.drawGrid()
        machineUsageGrid.zIndex = -1
        this.addChild(machineUsageGrid)
        return machineUsageGrid
    }

    private setupGridConnector(machineGrid: Grid, machineGridItems: GridItem[]): GridConnector {
        let gridConnector = new GridConnector(
            machineGrid,
            new StickyDragActionHandler(machineGrid),
            new Map(),
            machineGridItems)
        gridConnector.defineDragAndDrop()
        return gridConnector
    }

    private setupMachineGridItems(machineLayout: MachineLayout, machineGrid: Grid): GridItem[] {
        let gridItems = []
        for (let machineLayoutEntry of machineLayout) {
            let shape = machineLayoutEntry.shape
            let type = machineLayoutEntry.type ?? "sweet"
            let machine = new Machine(type, shape, machineGrid)
            this.addChild(machine)

            let index = machineLayoutEntry.index
            let gridItem = new GridItem(machine, machineGrid, index)

            gridItem.addShape(machineGrid, parseShape(shape))
            gridItems.push(gridItem)

            TOOLTIP_MANAGER.registerTooltipFor(machine,
                () => getMachineNameForType(machine.getType()),
                () => (!gridItem.dragging
                    && !(gridItem.content as Machine).isShowingTypeChoosingMenu()))
        }

        return gridItems;
    }

    checkRecipe() {
        let beltIngredients = this.belts.map(belt => belt.getEndIngredient().getID()!)
        let correctnessPerBelt = this.recipeBox.checkIngredientsAreProvided(beltIngredients, this.recipeBox.recipe.ingredients)
        for (let i = 0; i < this.belts.length; i++) {
            let belt = this.belts[i]
            belt.updateIngredients(this.machineGrid)
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

    private setupBelts(patternArr: string[][], beltGrid: Grid, machineGrid: Grid, startIngredients?: Map<string, IngredientID>): ConveyorBelt[] {
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
                machineGrid,
                beltData[0].index,
                beltData[beltLength - 1].index,
                beltData.slice(1, beltLength - 1).map(data => data.index),
                startIngredients?.get(beltKey) ?? "cream")
            this.addChild(belt)
            belts.push(belt)
        }

        return belts
    }

    private setupBlocks(blockLayout: BlockLayout, machineGrid: Grid): GridItem[] {
        let gridItems = []
        for (let blockLayoutEntry of blockLayout) {
            let shape = blockLayoutEntry.shape
            let block = new Block(shape, machineGrid)
            this.addChild(block)

            let index = blockLayoutEntry.index
            let gridItem = new GridItem(block, machineGrid, index)

            gridItem.addShape(machineGrid, parseShape(shape))
            gridItems.push(gridItem)
        }

        return gridItems;
    }
}