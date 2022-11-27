import {Recipe, RecipeBox, RecipeID, RECIPES} from "../GameObjects/GameScreen/RecipeBox";
import {
    Block,
    BlockLayout,
    Machine,
    MachineLayout,
    MachineType,
    parseShape
} from "../GameObjects/GameScreen/Machinery/Machine";
import {GridConnector} from "../GameObjects/GameScreen/Grid/GridConnector";
import Scene from "./Basics/Scene";
import {ConveyorBelt} from "../GameObjects/GameScreen/ConveyorBelt/ConveyorBelt";
import {Application, Sprite} from "pixi.js";
import {
    ASSET_MANAGER,
    BERND_BUTTON,
    DIALOG_MANAGER,
    GAME_DATA,
    GAME_HEIGHT,
    GAME_WIDTH,
    INGREDIENT_COOKBOOK,
    TOOLTIP_MANAGER
} from "../index";
import {StickyDragActionHandler} from "../GameObjects/GameScreen/Grid/GridActionHandlers/StickyDragActionHandler";
import {GridItem} from "../GameObjects/GameScreen/Grid/GridItem";
import {WinScreen} from "../GameObjects/GameScreen/WinScreen/WinScreen";
import {IngredientID} from "../GameObjects/GameScreen/Ingredient"
import {Grid} from "../GameObjects/GameScreen/Grid/Grid";
import {Index2D, isRectangularArray, Vector2D, VerticalDirection} from "../General/Helpers";
import {Dialog} from "../GameObjects/Dialog/DialogConfig";
import {BackToLevelScreenButton} from "../UI/Buttons/BackToLevelScreenButton";
import {OutlineFilter} from "@pixi/filter-outline";

export type FactorySceneOptions = {
    app: Application,
    level: number,
    conveyorBeltPattern: string,
    recipe: RecipeID,
    machineLayout: MachineLayout,
    blockLayout?: BlockLayout,
    startIngredients?: Map<string, IngredientID>,
    hasStepButton?: boolean,
    dialog?: Dialog,
    hints?: Dialog[],
    lastWords?: Dialog
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
    level: number

    private dialog?: Dialog
    private hints: Dialog[]
    private lastWords?: Dialog

    // UI
    private recipeBox: RecipeBox;
    private winScreen: WinScreen;
    private backToLevelScreenButton: BackToLevelScreenButton;
    private timeInterval?: NodeJS.Timer
    private lastHintIndex;

    // Tutorial
    private slidingHand: Sprite;
    private slidingHandTween?: gsap.core.Tween;

    constructor(opts: FactorySceneOptions) {
        super();
        this.app = opts.app;
        this.level = opts.level
        this.sortableChildren = true

        this.dialog = opts.dialog
        this.hints = opts.hints ?? []
        this.lastWords = opts.lastWords

        this.lastHintIndex = 0
        this.slidingHand = new Sprite(ASSET_MANAGER.getTextureAsset("dialog_pointer_hand"))
        this.slidingHand.zIndex = 15
        this.slidingHand.anchor.set(0.25, 0.1)
        this.slidingHand.angle = 20
        this.slidingHand.scale.set(0)
        this.addChild(this.slidingHand)

        this.initBackground();

        let patternArr = opts.conveyorBeltPattern.split("\n").map(row => row.split("|").map(el => el.trim()))

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

        this.backToLevelScreenButton = new BackToLevelScreenButton()
        this.backToLevelScreenButton.position.set(100, 125)
        this.backToLevelScreenButton.zIndex = 5
        this.addChild(this.backToLevelScreenButton)

        this.machineLayout = opts.machineLayout
        this.machineGridItems = this.setupMachineGridItems(this.machineLayout, this.machineGrid)

        this.blockLayout = opts.blockLayout ?? []
        this.blockGridItems = this.setupBlocks(this.blockLayout, this.machineGrid)
        this.machineGridConnector = this.setupGridConnector(this.machineGrid, this.machineGridItems)
    }

    private setupRecipeBox(recipe: Recipe) {
        let recipeBox = new RecipeBox(recipe);
        recipeBox.position.set(215, 210)
        this.addChild(recipeBox)
        return recipeBox;
    }

    start() {
        this.winScreen.hide()
        INGREDIENT_COOKBOOK.showButton()

        DIALOG_MANAGER.setLevel(this)

        if (!this.dialog && this.hints.length > 0) {
            BERND_BUTTON.blendIn()
        }

        // Reset all types and positions
        this.machineGridItems.forEach(item => item.freeFromGrid())
        this.machineGridItems.forEach((item, index) => {
            let layoutEntry = this.machineLayout[index];
            (item.content as Machine).setType(layoutEntry.type ?? "sweet")
            item.trySetToIndexInstantly(this.machineGrid, layoutEntry.index)

        })
        this.unblockMachines()

        this.belts.forEach(belt => belt.resetIngredients())

        this.recipeBox.ingredients.forEach(ingredient => ingredient.reset())

        // Urgh, a little nasty
        clearInterval(this.timeInterval)
        this.timeInterval = setInterval(() => this.checkRecipe(), 2500)

        this.startIngredients.forEach(ingredient => GAME_DATA.saveNewUnlockedIngredient(ingredient))

        if (this.dialog) {
            DIALOG_MANAGER.startDialog(this.dialog);
        }
    }

    async beforeFadeOut() {
        DIALOG_MANAGER.removeLevel()
        if (DIALOG_MANAGER.hasNode()) {
            await DIALOG_MANAGER.endDialog()
        }
        await TOOLTIP_MANAGER.disableTooltips()
    }

    async afterFadeOut() {
        INGREDIENT_COOKBOOK.hideButton()
        INGREDIENT_COOKBOOK.hideCookbook()
        BERND_BUTTON.hide()
        this.belts.forEach(belt => belt.pauseIngredientAnimations())
    }

    beforeFadeIn() {
        this.belts.forEach(belt => belt.resumeIngredientAnimations())
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
                    if (entry.length >= 4 || !this.isUpperLetter(entry.charAt(0)) || !this.isNumber(entry.charAt(1))) {
                        console.log(`${entry} is not a correct belt pattern entry!`)
                        return null;
                    }
                    let letter = entry.charAt(0)
                    let number = Number.parseInt(entry.substring(1))
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
        let background = new Sprite(ASSET_MANAGER.getTextureAsset("background"))
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
        machineUsageGrid.setDefaultSlotTexture(ASSET_MANAGER.getTextureAsset("emptyField"))
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
            machine.setGridItem(gridItem)

            if (machineLayoutEntry.id) {
                gridItem.setId(machineLayoutEntry.id)
            }

            if (machineLayoutEntry.positionFixed) {
                gridItem.positionLock()
            }

            if (machineLayoutEntry.typeFixed) {
                gridItem.typeLock()
            }

            gridItem.addShape(machineGrid, parseShape(shape))
            gridItems.push(gridItem)

            TOOLTIP_MANAGER.registerTooltipFor(machine)
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
            if (this.lastWords) {
                DIALOG_MANAGER.startDialog(this.lastWords)
            }
            this.blockMachines()
            BERND_BUTTON.blendOut()
            INGREDIENT_COOKBOOK.blendOutButton()

            GAME_DATA.saveUnlockedLevel(this.level + 1)
            clearInterval(this.timeInterval)
        }
    }

    blockMachines() {
        this.machineGridItems.forEach(item => item.tempLock())
    }

    unblockMachines(ids?: string[]) {
        if (ids) {
            this.machineGridItems.forEach(item => {
                if (item.id && ids.indexOf(item.id) > -1) {
                    item.tempUnlock()
                }
            })
        } else {
            this.machineGridItems.forEach(item => item.tempUnlock())
        }
    }

    unallowMoveDirection(direction: VerticalDirection) {
        this.machineGridItems.forEach(item => item.unallowDirection(direction))
    }

    unlimitMoveDirections() {
        this.machineGridItems.forEach(item => item.unlimitMovement())
    }

    async showSliding(fromIndex: Index2D, toIndex: Index2D) {
        let fromPosition: Vector2D = this.machineGrid.getGlobalPositionForIndex(fromIndex)
        this.slidingHand.position.set(fromPosition.x, fromPosition.y)

        await gsap.to(this.slidingHand.scale, {x: 1, y: 1, duration: 0.3, ease: Back.easeOut})
        let toPosition: Vector2D = this.machineGrid.getGlobalPositionForIndex(toIndex)
        this.slidingHandTween = gsap.to(
            this.slidingHand,
            {x: toPosition.x, y: toPosition.y, duration: 2, ease: Quad.easeInOut, repeat: -1, repeatDelay: 0.5})
    }

    hideSliding() {
        this.slidingHandTween?.kill()
        gsap.to(this.slidingHand.scale, {x: 0, y: 0, duration: 0.3, ease: Back.easeIn})
    }

    highlightConveyorBelts() {
        this.belts.forEach(belt => belt.filters = [new OutlineFilter(10, 0xfd4343, 0.2)])
    }

    unhighlightConveyorBelts() {
        this.belts.forEach(belt => belt.filters = [])
    }

    highlightRecipeBox() {
        this.recipeBox.filters = [new OutlineFilter(10, 0xfd4343)]
    }

    unhighlightRecipeBox() {
        this.recipeBox.filters = []
    }

    highlightBeltIngredients(id: string) {
        this.belts.forEach(belt => {
            if (belt.id && belt.id === id) {
                belt.highlightTiles()
            }
        })
    }

    unhighlightBeltIngredients() {
        this.belts.forEach(belt => {
            belt.unhighlightTiles()
        })
    }

    highlightMachines(ids?: string) {
        if (ids) {
            this.machineGridItems.forEach(item => {
                if (item.id && ids.indexOf(item.id) > -1) {
                    item.content.filters = [new OutlineFilter(10, 0xfd4343)]
                }
            })
        } else {
            this.machineGridItems.forEach(item => item.content.filters = [new OutlineFilter(10, 0xfd4343)])
        }
    }

    unhighlightMachines() {
        this.machineGridItems.forEach(item => item.content.filters = [])
    }

    highlightMachineIcon(id: string, iconType: MachineType) {
        this.machineGridItems.forEach(item => {
            if (item.id && id === item.id) {
                (item.content as Machine).highlightTypeIcon(iconType)
            }
        })
    }

    unhighlightMachineIcons() {
        this.machineGridItems.forEach(item => {
            (item.content as Machine).unhighlightTypeIcon()
        })
    }

    highlightBlocks() {
        this.blockGridItems.forEach(block => block.content.filters = [new OutlineFilter(10, 0xfd4343)])
    }

    unhighlightBlocks() {
        this.blockGridItems.forEach(block => block.content.filters = [])
    }

    showWinScreen() {
        this.winScreen.blendIn()
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
            belt.setId(beltKey)
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
            block.updateAppearance()
            this.addChild(block)

            let index = blockLayoutEntry.index
            let gridItem = new GridItem(block, machineGrid, index)

            gridItem.addShape(machineGrid, parseShape(shape))
            gridItems.push(gridItem)
        }

        return gridItems;
    }

    getHint(): Dialog | null {
        if (this.hints.length > 0) {
            this.lastHintIndex = (this.lastHintIndex + 1) % this.hints.length
            return this.hints[this.lastHintIndex]
        }
        return null
    }
}