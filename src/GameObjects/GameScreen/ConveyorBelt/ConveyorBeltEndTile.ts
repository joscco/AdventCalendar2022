import {ConveyorBeltTile} from "./ConveyorBeltTile";
import {Texture} from "@pixi/core";
import {Ingredient} from "../Ingredient";
import {ASSET_MANAGER} from "../../../index";
import {Vector2D} from "../../../General/Helpers";

export class ConveyorBeltEndTile extends ConveyorBeltTile {
    getTextures(): Texture[] {
        return [ASSET_MANAGER.getTextureAsset("endField")];
    }

    async repositionIngredient(ingredient: Ingredient, newPosition: Vector2D): Promise<void> {
        await ingredient.scaleDown()
        ingredient.position = newPosition
        ingredient.scaleUp()
    }
}