import Scene from "./Basics/Scene";
import {LeftAngel} from "../gameobjects/GameScreen/WinScreen/LeftAngel";
import {RightAngel} from "../gameobjects/GameScreen/WinScreen/RightAngel";
import {GAME_HEIGHT, GAME_WIDTH} from "../index";
import {Sparkle} from "../gameobjects/GameScreen/WinScreen/Sparkle";

export class EditorScene extends Scene {
    constructor() {
        super();

        let leftAngel = new LeftAngel()
        leftAngel.position.set(400, GAME_HEIGHT/2)
        this.addChild(leftAngel)
        leftAngel.startAnimating()

        let rightAngel = new RightAngel()
        rightAngel.position.set(GAME_WIDTH - 500, GAME_HEIGHT/2)
        this.addChild(rightAngel)
        rightAngel.startAnimating()

        let sparke = new Sparkle()
        sparke.position.set(GAME_WIDTH/2, GAME_HEIGHT/2)
        this.addChild(sparke)
        sparke.startMoving()

    }
}