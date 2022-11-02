import {Sprite, Text} from "pixi.js";
import {ASSET_STORE, GAME_HEIGHT, GAME_WIDTH} from "../index";
import {Recipe} from "../gameobjects/RecipeBox";
import {getRecipeTextureForDay} from "../ui/Buttons/LevelButton";

export class WinScreen extends Sprite {

    private title: Text
    private subTitle: Text
    private cookieIcon: Sprite
    private banner: Sprite
    private bannerText: Text

    constructor(recipe: Recipe) {
        super(ASSET_STORE.GAME_SCENE!.winScreen);
        this.position.set(GAME_WIDTH/2, GAME_HEIGHT + 200)
        this.anchor.set(0.5, 0)

        this.title = new Text("Well done!", {fontFamily: "Futurahandwritten", fontSize: 70, fill: 0x000000})
        this.title.anchor.set(0.5)
        this.title.position.set(0, 76)
        this.addChild(this.title)

        this.subTitle = new Text("You made some tasty", {fontFamily: "Futurahandwritten", fontSize: 40, fill: 0xaaaaaa})
        this.subTitle.anchor.set(0.5)
        this.subTitle.position.set(0, 140)
        this.addChild(this.subTitle)

        this.cookieIcon = new Sprite(getRecipeTextureForDay(1))
        this.cookieIcon.anchor.set(0.5)
        this.cookieIcon.position.set(0, this.height/2 + 30)
        this.addChild(this.cookieIcon)

        this.banner = new Sprite(ASSET_STORE.GAME_SCENE!.winScreenBanner)
        this.banner.anchor.set(0.5)
        this.banner.position.set(0, 830)
        this.addChild(this.banner)

        this.bannerText = new Text(recipe.name, {fontFamily: "Futurahandwritten", fontSize: 70, fill: 0xffffff})
        this.bannerText.anchor.set(0.5)
        this.banner.addChild(this.bannerText)
    }

    async blendIn() {
        await gsap.to(this.position, {y: 100, duration: 0.5, ease: Back.easeInOut})
    }

}