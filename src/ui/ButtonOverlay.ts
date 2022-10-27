import {Container} from "pixi.js";
import {Button} from "./Buttons/Button";

export class UIButtonOverlay extends Container {
    private backToLevelScreenButton?: Button;
    private recipeButton?: Button;
    private soundButton?: Button;

    constructor() {
        super();
    }

    async init(): Promise<void> {
    }
}