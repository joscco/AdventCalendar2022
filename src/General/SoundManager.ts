import {Howl} from "howler";
import {SOUND_MANAGER} from "../index";

export class SoundManager {
    private soundAllowed: boolean = true
    private musicAllowed: boolean = true

    private mainMusic: Howl
    private blubs: Howl[]
    private talkSounds: Howl[]
    private moveSounds: Howl[]

    constructor() {
        this.mainMusic = SoundManager.createHowl("music/Main.ogg", true)

        this.blubs = SoundManager.createHowls(["click/Blub1.ogg", "click/Blub2.ogg"])
        this.talkSounds = SoundManager.createHowls([
            "talk/talk-01.ogg",
            "talk/talk-02.ogg",
            "talk/talk-03.ogg",
            "talk/talk-04.ogg",
            "talk/talk-05.ogg",
            "talk/talk-06.ogg",
            "talk/talk-07.ogg",
            "talk/talk-08.ogg",
            "talk/talk-09.ogg"
        ])
        this.moveSounds = SoundManager.createHowls([
                "move/move-01.ogg",
                "move/move-02.ogg",
                "move/move-03.ogg",
                "move/move-04.ogg"],
            0.5)
    }

    static createHowls(sources: string[], volume?: number, rate?: number): Howl[] {
        return sources.map(source => {
            return SoundManager.createHowl(source, false, volume, rate)
        })
    }

    static createHowl(source: string, loop: boolean = false, volume?: number, rate?: number): Howl {
        return new Howl({
            src: "assets/sounds/" + source,
            html5: true,
            loop: loop,
            volume: volume ?? 1,
            rate: rate ?? 1
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

    playTalkSound(): void {
        this.playAnyOf(this.talkSounds)
    }

    playMoveSound(): void {
        this.playAnyOf(this.moveSounds)
    }

    private playAnyOf(howlArr: Howl[]) {
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