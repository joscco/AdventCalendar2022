import {ConveyorBeltTile} from "./ConveyorBeltTile";
import {Texture} from "@pixi/core";
import {Ingredient} from "../Ingredient";
import {ASSET_STORE} from "../../index";
import {Vector2D} from "../../general/Helpers";

export class ConveyorBeltEndTile extends ConveyorBeltTile {
    getTextures(): Texture[] {
        return [ASSET_STORE.getTextureAsset("endField")];
    }

    async repositionIngredient(ingredient: Ingredient, newPosition: Vector2D): Promise<void> {
        await ingredient.scaleDown()
        ingredient.position = newPosition
        ingredient.scaleUp()
    }
}