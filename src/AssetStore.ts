import {Texture} from "@pixi/core";
import {Assets} from "@pixi/assets";
import {MachineShape, MachineType} from "./gameobjects/Machinery/Machine";

export class AssetStore {
    START_SCENE?: StartSceneAssets
    MAIN_FONT?: FontFace
    MACHINES?: MachineAssets
    TOOLTIP?: TooltipAssets

    constructor() {
        this.addAssets()
    }

    async loadAssets() {
        await Assets.loadBundle("textures")
        this.START_SCENE = this.prepareStartSceneAssets(await Assets.loadBundle("startSceneAssets"))
        this.MAIN_FONT = await Assets.load("font") as FontFace
        this.MACHINES = this.prepareMachineAssets(await Assets.loadBundle("machines"), await Assets.loadBundle("machineIcons"))
        this.TOOLTIP = this.prepareTooltipAssets(await Assets.loadBundle("tooltipAssets"))
    }

    private addAssets() {
        Assets.add("font", "assets/fonts/FuturaHandwritten.ttf")

        Assets.addBundle("tooltipAssets", {
            tooltipRectangle: 'assets/gameScreen/tooltip/tooltipRect.png',
            tooltipSpike: 'assets/gameScreen/tooltip/tooltipTriangle.png'
        })

        Assets.addBundle("startSceneAssets", {
            torso: "assets/startScreen/bernd/body_middle.png",
            backTorso: "assets/startScreen/bernd/backBody.png",
            head: "assets/startScreen/bernd/head.png",
            eyes_closed: "assets/startScreen/bernd/closed_eyes.png",
            eyes_open: "assets/startScreen/bernd/open_eyes.png",
            left_arm_leaning: "assets/startScreen/bernd/leftArmLeaning.png",
            left_arm_showing: "assets/startScreen/bernd/leftArmShowing.png",
            right_arm_leaning: "assets/startScreen/bernd/rightArmLeaning.png",
            backgroundPattern: "assets/startScreen/backgroundPattern.png",
            pretitle: "assets/startScreen/pretitle.png",
            startButton: "assets/startScreen/startButton.png",
            title_0: "assets/startScreen/titleLetters/title0.png",
            title_1: "assets/startScreen/titleLetters/title1.png",
            title_2: "assets/startScreen/titleLetters/title2.png",
            title_3: "assets/startScreen/titleLetters/title3.png",
            title_4: "assets/startScreen/titleLetters/title4.png",
            title_5: "assets/startScreen/titleLetters/title5.png",
            title_6: "assets/startScreen/titleLetters/title6.png",
            title_7: "assets/startScreen/titleLetters/title7.png",
            title_8: "assets/startScreen/titleLetters/title8.png",
            title_9: "assets/startScreen/titleLetters/title9.png",
            title_10: "assets/startScreen/titleLetters/title10.png",
            title_11: "assets/startScreen/titleLetters/title11.png",
            title_12: "assets/startScreen/titleLetters/title12.png",
            title_13: "assets/startScreen/titleLetters/title13.png",
            title_14: "assets/startScreen/titleLetters/title14.png",
        });

        Assets.addBundle("machines", {
            small_1x1: "assets/gameScreen/machines/1x1_small.png",
            small_1x2: "assets/gameScreen/machines/1x2_small.png",
            small_1x3: "assets/gameScreen/machines/1x3_small.png",
            small_2x1: "assets/gameScreen/machines/2x1_small.png",
            small_2x2: "assets/gameScreen/machines/2x2_small.png",
            small_2x3: "assets/gameScreen/machines/2x3_small.png",
            small_3x1: "assets/gameScreen/machines/3x1_small.png",
            small_3x2: "assets/gameScreen/machines/3x2_small.png",
            small_3x3: "assets/gameScreen/machines/3x3_small.png",
            big_1x1: "assets/gameScreen/machines/1x1_big.png",
            big_1x2: "assets/gameScreen/machines/1x2_big.png",
            big_1x3: "assets/gameScreen/machines/1x3_big.png",
            big_2x1: "assets/gameScreen/machines/2x1_big.png",
            big_2x2: "assets/gameScreen/machines/2x2_big.png",
            big_2x3: "assets/gameScreen/machines/2x3_big.png",
            big_3x1: "assets/gameScreen/machines/3x1_big.png",
            big_3x2: "assets/gameScreen/machines/3x2_big.png",
            big_3x3: "assets/gameScreen/machines/3x3_big.png"
        })

        Assets.addBundle("machineIcons", {
            iconSlot: "assets/gameScreen/machines/machineIcons/machineIconHolder.png",
            menuRect: "assets/gameScreen/machines/machineIcons/menuRect.png",
            menuSpike: "assets/gameScreen/machines/machineIcons/menuSpike.png",
            color: "assets/gameScreen/machines/machineIcons/color.png",
            taste: "assets/gameScreen/machines/machineIcons/taste.png",
            consistence: "assets/gameScreen/machines/machineIcons/consistence.png",
            white: "assets/gameScreen/machines/machineIcons/white.png",
            red: "assets/gameScreen/machines/machineIcons/red.png",
            yellow: "assets/gameScreen/machines/machineIcons/yellow.png",
            brown: "assets/gameScreen/machines/machineIcons/brown.png",
            neutral: "assets/gameScreen/machines/machineIcons/neutral.png",
            sweet: "assets/gameScreen/machines/machineIcons/sweet.png",
            sour: "assets/gameScreen/machines/machineIcons/sour.png",
            savoury: "assets/gameScreen/machines/machineIcons/savoury.png",
            sticky: "assets/gameScreen/machines/machineIcons/sticky.png",
            liquid: "assets/gameScreen/machines/machineIcons/liquid.png",
            powdery: "assets/gameScreen/machines/machineIcons/powdery.png",
            solid: "assets/gameScreen/machines/machineIcons/solid.png",
        })
    }

    private prepareTooltipAssets(rawAssets: any): TooltipAssets {
        return {
            tooltipRectangle: rawAssets.tooltipRectangle,
            tooltipSpike: rawAssets.tooltipSpike
        }
    }

    private prepareStartSceneAssets(rawAssets: any): StartSceneAssets {
        return {
            torso: rawAssets.torso,
            backTorso: rawAssets.backTorso,
            head: rawAssets.head,
            eyes_closed: rawAssets.eyes_closed,
            eyes_open: rawAssets.eyes_open,
            left_arm_leaning: rawAssets.left_arm_leaning,
            left_arm_showing: rawAssets.left_arm_showing,
            right_arm_leaning: rawAssets.right_arm_leaning,
            backgroundPattern: rawAssets.backgroundPattern,
            startButton: rawAssets.startButton,
            pretitle: rawAssets.pretitle,
            titleLetters: [
                rawAssets.title_0, rawAssets.title_1, rawAssets.title_2, rawAssets.title_3,
                rawAssets.title_4, rawAssets.title_5, rawAssets.title_6, rawAssets.title_7,
                rawAssets.title_8, rawAssets.title_9, rawAssets.title_10, rawAssets.title_11,
                rawAssets.title_12, rawAssets.title_13, rawAssets.title_14
            ]
        }
    }

    private prepareMachineAssets(rawMachineAssets: any, rawMachineIconAssets: any): MachineAssets {
        return {
            big: {
                "1x1": rawMachineAssets.big_1x1,
                "1x2": rawMachineAssets.big_1x2,
                "1x3": rawMachineAssets.big_1x3,
                "2x1": rawMachineAssets.big_2x1,
                "2x2": rawMachineAssets.big_2x2,
                "2x3": rawMachineAssets.big_2x3,
                "3x1": rawMachineAssets.big_3x1,
                "3x2": rawMachineAssets.big_3x2,
                "3x3": rawMachineAssets.big_3x3
            },
            small: {
                "1x1": rawMachineAssets.small_1x1,
                "1x2": rawMachineAssets.small_1x2,
                "1x3": rawMachineAssets.small_1x3,
                "2x1": rawMachineAssets.small_2x1,
                "2x2": rawMachineAssets.small_2x2,
                "2x3": rawMachineAssets.small_2x3,
                "3x1": rawMachineAssets.small_3x1,
                "3x2": rawMachineAssets.small_3x2,
                "3x3": rawMachineAssets.small_3x3
            },
            categoryIcons: {
                color: rawMachineIconAssets.color,
                taste: rawMachineIconAssets.taste,
                consistence: rawMachineIconAssets.consistence,
            },
            typeIcons: {
                white: rawMachineIconAssets.white,
                red: rawMachineIconAssets.red,
                yellow: rawMachineIconAssets.yellow,
                brown: rawMachineIconAssets.brown,
                neutral: rawMachineIconAssets.neutral,
                sweet: rawMachineIconAssets.sweet,
                sour: rawMachineIconAssets.sour,
                savoury: rawMachineIconAssets.savoury,
                sticky: rawMachineIconAssets.sticky,
                liquid: rawMachineIconAssets.liquid,
                powdery: rawMachineIconAssets.powdery,
                solid: rawMachineIconAssets.solid
            },
            typeIconSlot: rawMachineIconAssets.iconSlot,
            menuRect: rawMachineIconAssets.menuRect,
            menuSpike: rawMachineIconAssets.menuSpike
        }
    }
}

export interface TooltipAssets {
    tooltipRectangle: Texture,
    tooltipSpike: Texture
}

export interface MachineAssets {
    big: {
        [keys in MachineShape]: Texture
    },
    small: {
        [keys in MachineShape]: Texture
    },
    categoryIcons: {
        color: Texture,
        consistence: Texture,
        taste: Texture
    }
    typeIcons: {
        [keys in MachineType]: Texture
    },
    typeIconSlot: Texture,
    menuRect: Texture,
    menuSpike: Texture
}

export interface StartSceneAssets {
    torso: Texture,
    backTorso: Texture,
    head: Texture,
    eyes_closed: Texture,
    eyes_open: Texture,
    left_arm_leaning: Texture,
    left_arm_showing: Texture,
    right_arm_leaning: Texture,
    backgroundPattern: Texture,
    pretitle: Texture,
    startButton: Texture,
    titleLetters: Texture[]
}