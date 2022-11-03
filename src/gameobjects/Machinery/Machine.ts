import {IngredientColor, IngredientConsistence, IngredientTaste} from "../Ingredient";
import {Sprite} from "pixi.js";
import {ASSET_STORE} from "../../index";
import {Grid} from "../Grid/Grid";
import {MachineIconSlot} from "./MachineIconSlot";

export type MachineType = IngredientTaste | IngredientColor | IngredientConsistence
export type MachineShape = "1x1" | "2x1" | "3x1" | "1x2" | "2x2" | "3x2" | "1x3" | "2x3" | "3x3"

export class Machine extends Sprite {

    private type: MachineType;
    private machineShape: MachineShape;
    private iconSlot: MachineIconSlot;
    private currentGrid: Grid;

    constructor(type: MachineType, machineShape: MachineShape, startGrid: Grid) {
        super()
        this.type = type;
        this.machineShape = machineShape
        this.currentGrid = startGrid
        this.zIndex = 1

        this.iconSlot = new MachineIconSlot(type, this)
        this.iconSlot.position.set(75, 75)
        this.addChild(this.iconSlot)
        this.updateAppearance()
    }

    blendOutTypeChooser() {
        this.iconSlot.blendOut()
    }

    setType(type: MachineType) {
        this.type = type
        this.updateAppearance()
    }

    getType(): MachineType {
        return this.type
    }

    getShape(): MachineShape {
        return this.machineShape
    }

    setGrid(grid: Grid) {
        this.currentGrid = grid
        this.updateAppearance()
    }

    private updateAppearance() {
        this.iconSlot.updateType(this.type)
        if (this.currentGrid.id === "machineGrid") {
            this.iconSlot.scaleUp()
            this.texture = ASSET_STORE.MACHINES!.big![this.machineShape]
            this.pivot.set(75, 75)
        } else {
            this.iconSlot.scaleDown()
            this.texture = ASSET_STORE.MACHINES!.small![this.machineShape]
            this.pivot.set(this.texture.width/2, this.texture.height/2)
        }
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