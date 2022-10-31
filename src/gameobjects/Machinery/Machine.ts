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

        this.iconSlot = new MachineIconSlot(type)
        this.iconSlot.position.set(30, 30)
        this.updateAppearance()
    }

    setType(type: MachineType) {
        this.type = type
        this.updateAppearance()
    }

    setGrid(grid: Grid) {
        this.currentGrid = grid
        this.updateAppearance()
    }

    private updateAppearance() {
        if (this.currentGrid.id === "machineGrid") {
            this.texture = ASSET_STORE.MACHINES!.big![this.machineShape]
            this.iconSlot.scaleDown()
            this.pivot.set(75, 75)
        } else {
            this.texture = ASSET_STORE.MACHINES!.small![this.machineShape]
            this.iconSlot.scaleUp()
            this.pivot.set(this.texture.width/2, this.texture.height/2)
        }
    }
}