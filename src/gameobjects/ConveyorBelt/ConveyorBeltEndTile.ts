import {ConveyorBeltTile} from "./ConveyorBeltTile";
import {Texture} from "@pixi/core";
import {Ingredient} from "../Ingredient";
import {Vector2D} from "../Grid/Grid";
import {ASSET_STORE} from "../../index";

export class ConveyorBeltEndTile extends ConveyorBeltTile {
    getTextures(): Texture[] {
        return [ASSET_STORE.BELT_TILES!.endField];
    }

    async repositionIngredient(ingredient: Ingredient, newPosition: Vector2D): Promise<void> {
        await gsap.to(ingredient.scale, {x: 0, y: 0, duration: 0.3, ease: Quart.easeInOut})
        ingredient.position = newPosition
        ingredient.setTaste("neutral")
        ingredient.setColor("white")
        ingredient.setConsistence("sticky")
        gsap.to(ingredient.scale, {x: 1, y: 1, duration: 0.3, ease: Quart.easeInOut})
    }
}