import {ConveyorBeltTile} from "./ConveyorBeltTile";
import {Texture} from "@pixi/core";
import {Ingredient} from "../Ingredient";
import {Vector2D} from "../Grid/Grid";
import {ASSET_STORE} from "../../index";

export class ConveyorBeltMoveTile extends ConveyorBeltTile {
    getTextures(): Texture[] {
        return ASSET_STORE.BELT_TILES!.moveFields;
    }

    repositionIngredient(ingredient: Ingredient, newPosition: Vector2D): void {
        gsap.to(ingredient.position, {x: newPosition.x, y: newPosition.y, duration: 0.6, ease: Quart.easeInOut})
    }
}