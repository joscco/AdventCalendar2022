import Scene from "./Basics/Scene";
import {RecipeIDs} from "../gameobjects/GameScreen/RecipeBox";
import {Cookie} from "../gameobjects/GameScreen/WinScreen/Cookie";

export class EditorScene extends Scene {
    constructor() {
        super();

        RecipeIDs.forEach((id, index) => {
            let cookie = new Cookie(id)
            cookie.scale.set(0.5)
            cookie.startBlinking()
            let posX = 200 + ((index) % 8) * 215
            let posY = 325 + Math.floor(index / 8) * 240
            cookie.position.set(posX, posY)
            this.addChild(cookie)
        })

    }
}