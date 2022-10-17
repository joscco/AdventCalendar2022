import {Stage} from "@pixi/layers";

export class Scene extends Stage {
    private paused: boolean = false;
    private updateCB = function () {
    };

    public onUpdate(updateCB: () => void) {
        this.updateCB = updateCB;
    }

    public update() {
        this.updateCB();
    }

    public pause() {
        this.paused = true;
    }

    public resume() {
        this.paused = false;
    }

    public isPaused() {
        return this.paused;
    }
}