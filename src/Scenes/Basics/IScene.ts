import * as PIXI from 'pixi.js';
import SceneManager from "../../General/SceneManager";

export default interface IScene extends PIXI.Container {
    app: PIXI.Application|null;
    scenes: SceneManager|null;
    hasRun: boolean;
    init(): void;
    destroy(): void;
    start(): void;
    stop(): void;
    update(delta: number): void;
}