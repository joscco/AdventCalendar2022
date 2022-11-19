import {Howl} from "howler";
import {SOUND_MANAGER} from "../index";

export class SoundManager {
    private soundAllowed: boolean = true
    private musicAllowed: boolean = true

    private mainMusic: Howl
    private blubs: Howl[]
    private crunches: Howl[]
    private dullPlops: Howl[]
    private plops: Howl[]
    private typeSound: Howl

    constructor() {
        this.mainMusic = SoundManager.createHowl("Main.ogg", true)

        this.blubs = SoundManager.createHowls(["Blub1.ogg", "Blub2.ogg"])
        this.crunches = SoundManager.createHowls(["Crunch1.ogg", "Crunch2.ogg"])
        this.dullPlops = SoundManager.createHowls(["DullPlop1.ogg", "DullPlop2.ogg"])
        this.plops = SoundManager.createHowls(["Plop1.ogg", "Plop2.ogg", "Plop3.ogg"])
        this.typeSound = SoundManager.createHowl("Type1.ogg")
    }

    static createHowls(sources: string[]): Howl[] {
        return sources.map(source => SoundManager.createHowl(source))
    }

    static createHowl(source: string, loop: boolean = false): Howl {
        return new Howl({
            src: "assets/sounds/" + source,
            html5: true,
            loop: loop
        })
    }

    playMusic() {
        this.mainMusic.fade(0, 1, 2000)
        this.mainMusic.play()
    }

    stopMusic() {
        this.mainMusic.stop()
    }

    // TypeSound

    playBlub(): void {
        this.playAnyOf(this.blubs)
    }

    playCrunch(): void {
        this.playAnyOf(this.crunches)
    }

    playDullPlop(): void {
        this.playAnyOf(this.dullPlops)
    }

    playPlop(): void {
        this.playAnyOf(this.plops)
    }

    playTypeSound(): void {
        if (this.soundAllowed) {
            this.typeSound.play()
        }
    }

    private playAnyOf(howlArr: Howl[]) {
        howlArr.forEach(howl => howl.stop())
        if (this.soundAllowed) {
            howlArr[Math.floor(Math.random() * howlArr.length)].play()
        }
    }

    setMusicEnabled(value: boolean) {
        this.musicAllowed = value
        if (this.musicAllowed) {
            SOUND_MANAGER.playMusic()
        } else {
            SOUND_MANAGER.stopMusic()
        }
    }

    setSoundEnabled(value: boolean) {
        this.soundAllowed = value
    }
}