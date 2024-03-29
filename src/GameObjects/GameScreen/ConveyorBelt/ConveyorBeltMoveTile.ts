import {ConveyorBeltTile} from "./ConveyorBeltTile";
import {Texture} from "@pixi/core";
import {Ingredient} from "../Ingredient";
import {ASSET_MANAGER} from "../../../index";
import {Vector2D} from "../../../General/Helpers";

export class ConveyorBeltMoveTile extends ConveyorBeltTile {

    getTextures(): Texture[] {
        return [
            ASSET_MANAGER.getTextureAsset("moveField2"),
            ASSET_MANAGER.getTextureAsset("moveField1"),
            ASSET_MANAGER.getTextureAsset("moveField0"),
        ];
    }

    repositionIngredient(ingredient: Ingredient, newPosition: Vector2D): void {
        gsap.to(ingredient.position, {x: newPosition.x, y: newPosition.y, duration: 0.6, ease: Expo.easeInOut})
    }
}