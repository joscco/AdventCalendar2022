import {StartScene} from './Scenes/StartScene';
import SceneManager from './General/SceneManager';
import {gsap} from "gsap";
import {Application} from "pixi.js"
import {AssetStore} from "./General/AssetStore";
import {LevelChooserScene} from "./Scenes/LevelChooserScene";
import {TooltipManager} from "./gameobjects/Tooltip/TooltipManager";
import {GameData} from "./General/GameData";
import {SoundManager} from "./General/SoundManager";
import {MusicButton} from "./UI/Buttons/MusicButton";
import {SoundButton} from "./UI/Buttons/SoundButton";
import {LevelInitiator} from "./Scenes/Basics/LevelInitiator";
import {UnlockedIngredientAlarm} from "./gameobjects/GameScreen/IngredientBook/UnlockedIngredientAlarm";
import {CookbookOverlay} from "./gameobjects/GameScreen/IngredientBook/CookbookOverlay";
import {EventEmitter} from "./General/EventEmitter";
import {DialogManager} from "./gameobjects/Dialog/DialogManager";
import {Bernd} from "./gameobjects/Characters/Bernd";
import {BerndButton} from "./UI/Buttons/BerndButton";
import {LanguageManager} from "./General/LanguageManager";

export const GAME_WIDTH: number = 1920;
export const GAME_HEIGHT: number = 1080;
export const NUMBER_OF_LEVELS: number = 24;

export var App: Application;
export var EVENT_EMITTER: EventEmitter;
export var SCENE_MANAGER: SceneManager;
export var ASSET_STORE: AssetStore;
export var GAME_DATA: GameData;
export var SOUND_MANAGER: SoundManager;
export var LANGUAGE_MANAGER: LanguageManager
export var LEVEL_SCREEN: LevelChooserScene;

export var TOOLTIP_MANAGER: TooltipManager;
export var DIALOG_MANAGER: DialogManager;
export var INGREDIENT_COOKBOOK: CookbookOverlay
export var INGREDIENT_ALARM: UnlockedIngredientAlarm
export var BERND: Bernd
export var BERND_BUTTON: BerndButton
export var SOUND_BUTTON: SoundButton
export var MUSIC_BUTTON: MusicButton

const main = async () => {
    // Init Main App
    App = new Application(
        {
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            resolution: window.devicePixelRatio || 1,
            antialias: false,
            sharedTicker: false,
            powerPreference: "high-performance",
            autoStart: false,
            backgroundColor: 0x381A1C,
        }
    );
    App.stage.sortableChildren = true

    // Display application properly
    document.body.appendChild(App.view);
    document.body.style.margin = '0';
    App.renderer.view.style!.width = "100%"//CANVAS_WIDTH + "px"
    App.renderer.view.style!.height = "100%"//CANVAS_HEIGHT + "px"

    // Synchronize tickers by using the gsap one
    App.ticker.stop()
    gsap.ticker.add(() => App.ticker.update())

    // Nobody needs 60 fps for a browser game
    gsap.ticker.fps(30)

    // Make gsap available globally
    gsap.install(window)

    // Add all loading bundles
    ASSET_STORE = new AssetStore()
    SCENE_MANAGER = new SceneManager(App);
    LANGUAGE_MANAGER = new LanguageManager()
    App.stage.addChild(SCENE_MANAGER)

    // Load assets
    await ASSET_STORE.startLoadingScreen()
    await SCENE_MANAGER.startWithTransition("loadingScene")
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

    MUSIC_BUTTON = new MusicButton()
    MUSIC_BUTTON.position.set(210, 125)
    MUSIC_BUTTON.zIndex = 110
    App.stage.addChild(MUSIC_BUTTON);

    SOUND_BUTTON = new SoundButton()
    SOUND_BUTTON.position.set(325, 125)
    SOUND_BUTTON.zIndex = 110
    App.stage.addChild(SOUND_BUTTON);

    INGREDIENT_COOKBOOK = new CookbookOverlay()
    INGREDIENT_COOKBOOK.zIndex = 6
    App.stage.addChild(INGREDIENT_COOKBOOK)

    INGREDIENT_ALARM = new UnlockedIngredientAlarm()
    INGREDIENT_ALARM.zIndex = 6
    App.stage.addChild(INGREDIENT_ALARM)

    BERND = new Bernd()
    BERND.zIndex = 5
    App.stage.addChild(BERND)

    BERND_BUTTON = new BerndButton()
    BERND_BUTTON.zIndex = 5
    BERND_BUTTON.position.set(305, GAME_HEIGHT - 135)
    App.stage.addChild(BERND_BUTTON)

    // Finally adding Scenes:
    SCENE_MANAGER.add("startScene", new StartScene(App))
    LEVEL_SCREEN = new LevelChooserScene(App)
    SCENE_MANAGER.add("levelChooserScene", LEVEL_SCREEN)

    LevelInitiator.addLevels(SCENE_MANAGER)

    SCENE_MANAGER.startWithTransition("startScene")
};

main();
