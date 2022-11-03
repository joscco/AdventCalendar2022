import {AnimatedSprite} from "pixi.js";
import {Texture} from "@pixi/core";
import {Ingredient} from "../Ingredient";
import {Index2D, Vector2D} from "../Grid/Grid";
import {ASSET_STORE} from "../../index";


export abstract class ConveyorBeltTile extends AnimatedSprite {
    index: Index2D
    ingredientRef?: Ingredient

    constructor(index: Index2D) {
        super([ASSET_STORE.GAME_SCENE!.emptyField]);
        this.index = index
        this.textures = this.getTextures()
        this.autoUpdate = true
        this.animationSpeed = 1/60
        this.play()
        this.anchor.set(0.5)
    }

    setIngredientRef(ingredientRef: Ingredient) {
        this.ingredientRef = ingredientRef
    }

    getIngredientRef(): Ingredient | undefined {
        return this.ingredientRef
    }

    abstract repositionIngredient(ingredient: Ingredient, newPosition: Vector2D): void

    abstract getTextures(): Texture[]

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
}