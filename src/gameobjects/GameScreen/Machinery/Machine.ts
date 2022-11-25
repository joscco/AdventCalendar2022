import {IngredientColor, IngredientConsistence, IngredientTaste} from "../ConveyorBelt/Ingredient";
import {Sprite} from "pixi.js";
import {ASSET_STORE} from "../../../index";
import {Grid} from "../Grid/Grid";
import {MachineIconSlot} from "./MachineIconSlot";
import {GridItem} from "../Grid/GridItem";
import {Index2D, Vector2D} from "../../../General/Helpers";
import {Texture} from "@pixi/core";

export type MachineType = IngredientTaste | IngredientColor | IngredientConsistence
export type MachineShape = "1x1" | "2x1" | "3x1" | "1x2" | "2x2" | "3x2" | "1x3" | "2x3" | "3x3"
export type MachineDefinition = {shape: MachineShape, index: Index2D, type?: MachineType, typeFixed?: boolean, positionFixed?: boolean, id?: string}
export type BlockDefinition = {shape: MachineShape, index: Index2D}

export type MachineLayout = MachineDefinition[]
export type BlockLayout = BlockDefinition[]

export class Block extends Sprite {
    protected machineShape: MachineShape;
    protected currentGrid: Grid;
    protected gridItem?: GridItem;

    constructor(machineShape: MachineShape, startGrid: Grid) {
        super();
        this.machineShape = machineShape
        this.currentGrid = startGrid
        this.zIndex = 1
        this.pivot.set(75, 75)
    }

    setGridItem(gridItem: GridItem) {
        this.gridItem = gridItem
    }

    getShape(): MachineShape {
        return this.machineShape
    }

    setGrid(grid: Grid) {
        this.currentGrid = grid
        this.updateAppearance()
    }

    updateAppearance() {
        this.texture = ASSET_STORE.getTextureAsset(("block_" + this.machineShape))
    }
}

export class Machine extends Block {

    private type: MachineType;
    private iconSlot: MachineIconSlot;
    private typeLocked: boolean;
    private positionLocked: boolean;
    private chainOverlay: Sprite;

    constructor(type: MachineType, machineShape: MachineShape, startGrid: Grid) {
        super(machineShape, startGrid)
        this.type = type;
        this.typeLocked = false;
        this.positionLocked = false;

        this.chainOverlay = new Sprite()
        this.chainOverlay.pivot.set(20, 20)
        this.addChild(this.chainOverlay)

        this.iconSlot = new MachineIconSlot(type, this)
        this.iconSlot.position.set(75, 75)
        this.addChild(this.iconSlot)

        this.updateAppearance()
    }

    setGridItem(gridItem: GridItem) {
        super.setGridItem(gridItem)
        this.iconSlot.setGridItem(gridItem)
    }

    blendOutTypeChooser() {
        this.iconSlot.blendOut()
    }

    toggleBlendTypeChooser() {
        this.iconSlot.toggleBlend()
    }

    setType(type: MachineType) {
        this.type = type
        this.updateAppearance()
    }

    getType(): MachineType {
        return this.type
    }

    isShowingTypeChoosingMenu() {
        return this.iconSlot.isShowingTypeChoosingMenu();
    }

    public updateAppearance() {
        if (this.type) {
            this.iconSlot.updateType(this.type)
            this.iconSlot.scaleUp()
            this.texture = ASSET_STORE.getTextureAsset(("machine_" + this.machineShape))
        }

        if (this.positionLocked) {
            this.chainOverlay.texture = ASSET_STORE.getTextureAsset("chain_" + this.machineShape)
        } else {
            this.chainOverlay.texture = Texture.EMPTY
        }

        if (this.typeLocked) {
            this.iconSlot.showAsTypeLocked()
        } else {
            this.iconSlot.showAsTypeVariable()
        }
    }

    renderAsTypeLocked() {
        this.typeLocked = true
        this.updateAppearance()
    }

    renderAsPositionLocked() {
        this.positionLocked = true
        this.tint = 0xaaaaaa
        this.updateAppearance()
    }
}

export class Cage extends Block {

    rotateTowards(position: Vector2D) {
        let towardsVector = {x: position.x - this.position.x, y: position.y - this.position.y}
        let towardsAngle = Math.atan2(towardsVector.y, towardsVector.x)
        if (Math.PI / 4 < towardsAngle && towardsAngle < 3 * Math.PI / 4) {
            this.angle = 90
        } else if (3 * Math.PI / 4 < towardsAngle || towardsAngle < - 3 * Math.PI / 4) {
            this.angle = 180
        } else if (- 3 * Math.PI / 4 < towardsAngle && towardsAngle < - Math.PI / 4) {
            this.angle = 270
        }
    }

    public updateAppearance() {
        this.texture = ASSET_STORE.getTextureAsset("cage")
    }
}

export function getMachineNameForType(type: MachineType): string {
    switch (type) {
        case "neutral":
            return "Taste-Neutralizer";
        case "sweet":
            return "Sweetifier";
        case "sour":
            return "Sourinator";
        case "savoury":
            return "Savouriser";
        case "white":
            return "White-o-mat";
        case "red":
            return "Redinator";
        case "yellow":
            return "Yellowifier";
        case "brown":
            return "Brown-o-mat";
        case "sticky":
            return "Sticky-fier";
        case "liquid":
            return "Liquid-o-mat";
        case "powdery":
            return "Powderinator";
        case "solid":
            return "Solidifier";
    }
}

export function parseShape(machineShape: MachineShape): number[][] {
    switch (machineShape) {
        case "1x1":
            return [[1]]
        case "1x2":
            return [[1, 1]]
        case "1x3":
            return [[1, 1, 1]]
        case "2x1":
            return [[1], [1]]
        case "2x2":
            return [[1, 1], [1, 1]]
        case "2x3":
            return [[1, 1, 1], [1, 1, 1]]
        case "3x1":
            return [[1], [1], [1]]
        case "3x2":
            return [[1, 1], [1, 1], [1, 1]]
        case "3x3":
            return [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
    }
}