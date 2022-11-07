import {ConveyorBeltTile} from "./ConveyorBeltTile";
import {Texture} from "@pixi/core";
import {Ingredient} from "../Ingredient";
import {Vector2D} from "../Grid/Grid";
import {ASSET_STORE} from "../../index";

export class ConveyorBeltMoveTile extends ConveyorBeltTile {
    getTextures(): Texture[] {
        return [
            ASSET_STORE.getTextureAsset("moveField2"),
            ASSET_STORE.getTextureAsset("moveField1"),
            ASSET_STORE.getTextureAsset("moveField0"),
        ];
    }

    repositionIngredient(ingredient: Ingredient, newPosition: Vector2D): void {
        gsap.to(ingredient.position, {x: newPosition.x, y: newPosition.y, duration: 0.6, ease: Quart.easeInOut})
    }
}