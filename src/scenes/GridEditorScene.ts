import {Application} from "pixi.js";
import Scene from "./Scene";

export class GridEditorScene extends Scene{
    constructor(App: Application) {
        super();
        this.app = App
    }

}