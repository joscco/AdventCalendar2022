import * as PIXI from 'pixi.js';
import SceneManagerImpl from "../general/SceneManagerImpl";

export default interface IScene extends PIXI.Container {
    app: PIXI.Application|null;
    scenes: SceneManagerImpl|null;
    hasRun: boolean;
    init(): void;
    destroy(): void;
    start(): void;
    stop(): void;
    update(delta: number): void;
}