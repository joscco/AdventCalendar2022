import {Container} from "pixi.js";
import {Button} from "./Buttons/Button";
import {BackToLevelScreenButton} from "./Buttons/BackToLevelScreenButton";

export class UIButtonOverlay extends Container {
    private backToLevelScreenButton: Button;

    constructor() {
        super();
        this.backToLevelScreenButton = new BackToLevelScreenButton()
        this.backToLevelScreenButton.position.set(125, 125)
        this.addChild(this.backToLevelScreenButton)
    }
}