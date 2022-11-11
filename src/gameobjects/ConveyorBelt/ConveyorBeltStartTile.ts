import {ConveyorBeltTile} from "./ConveyorBeltTile";
import {Texture} from "@pixi/core";
import {Ingredient} from "../Ingredient";
import {ASSET_STORE} from "../../index";
import {Vector2D} from "../../General/Helpers";

export class ConveyorBeltStartTile extends ConveyorBeltTile {
    getTextures(): Texture[] {
        return [ASSET_STORE.getTextureAsset("startField")];
    }

    repositionIngredient(ingredient: Ingredient, newPosition: Vector2D): void {
        gsap.to(ingredient.position, {x: newPosition.x, y: newPosition.y, duration: 0.6, ease: Quart.easeInOut})
    }
}