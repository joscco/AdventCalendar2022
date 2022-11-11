import {StartScene} from './Scenes/StartScene';
import SceneManager from './General/SceneManager';
import {gsap} from "gsap";
import {Application} from "pixi.js";
import {AssetStore} from "./General/AssetStore";
import {LevelChooserScene} from "./Scenes/LevelChooserScene";
import {TooltipManager} from "./gameobjects/Tooltip/TooltipManager";
import {GameData} from "./General/GameData";
import {SoundManager} from "./General/SoundManager";
import {MusicButton} from "./UI/Buttons/MusicButton";
import {SoundButton} from "./UI/Buttons/SoundButton";
import {LevelInitiator} from "./Scenes/Basics/LevelInitiator";
import {UnlockedIngredientAlarm} from "./gameobjects/UnlockedIngredientAlarm";
import {CookbookOverlay} from "./gameobjects/IngredientBook/CookbookOverlay";
import {EventEmitter} from "./General/EventEmitter";
import {DialogManager} from "./General/Dialog/DialogManager";

export const GAME_WIDTH: number = 1920;
export const GAME_HEIGHT: number = 1080;
export const CANVAS_WIDTH: number = 960;
export const CANVAS_HEIGHT: number = 540;
export const NUMBER_OF_LEVELS: number = 24;

export var App: Application;
export var EVENT_EMITTER: EventEmitter;
export var SCENE_MANAGER: SceneManager;
export var ASSET_STORE: AssetStore;
export var GAME_DATA: GameData;
export var SOUND_MANAGER: SoundManager;
export var LEVEL_SCREEN: LevelChooserScene;

export var TOOLTIP_MANAGER: TooltipManager;
export var DIALOG_MANAGER: DialogManager;
export var INGREDIENT_COOKBOOK: CookbookOverlay
export var INGREDIENT_ALARM: UnlockedIngredientAlarm

const main = async () => {
    // Init Main App
    App = new Application(
        {
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            resolution: window.devicePixelRatio || 1,
            backgroundColor: 0x38191B
        }
    );

    App.stage.sortableChildren = true

    // Display application properly
    document.body.appendChild(App.view);
    document.body.style.margin = '0';
    App.renderer.view.style!.width = CANVAS_WIDTH + "px"
    App.renderer.view.style!.height = CANVAS_HEIGHT + "px"

    // Synchronize tickers by using the gsap one
    App.ticker.stop()
    gsap.ticker.add(() => App.ticker.update())

    // Make gsap available globally
    gsap.install(window)

    // Add all loading bundles
    ASSET_STORE = new AssetStore()
    SCENE_MANAGER = new SceneManager(App);
    App.stage.addChild(SCENE_MANAGER)

    // Load assets
    await ASSET_STORE.startLoadingScreen()
    await SCENE_MANAGER.start("loadingScene")
    await ASSET_STORE.startLoadingOtherAssets()

    SOUND_MANAGER = new SoundManager()
    SOUND_MANAGER.playMusic()

    GAME_DATA = new GameData()
    EVENT_EMITTER = new EventEmitter()

    DIALOG_MANAGER = new DialogManager()
    DIALOG_MANAGER.zIndex = 110
    App.stage.addChild(DIALOG_MANAGER)

    TOOLTIP_MANAGER = new TooltipManager()
    App.stage.addChild(TOOLTIP_MANAGER)

    let musicButton = new MusicButton()
    musicButton.zIndex = 110
    App.stage.addChild(musicButton);

    let soundButton = new SoundButton()
    soundButton.zIndex = 110
    App.stage.addChild(soundButton);

    INGREDIENT_COOKBOOK = new CookbookOverlay()
    INGREDIENT_COOKBOOK.zIndex = 6
    App.stage.addChild(INGREDIENT_COOKBOOK)

    INGREDIENT_ALARM = new UnlockedIngredientAlarm()
    INGREDIENT_ALARM.zIndex = 6
    App.stage.addChild(INGREDIENT_ALARM)

    // Finally adding Scenes:
    SCENE_MANAGER.add("startScene", new StartScene(App))
    LEVEL_SCREEN = new LevelChooserScene(App)
    SCENE_MANAGER.add("levelChooserScene", LEVEL_SCREEN)
    LevelInitiator.addLevels(SCENE_MANAGER)

    SCENE_MANAGER.startWithTransition("startScene")
};

main();
