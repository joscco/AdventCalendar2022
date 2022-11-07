import {Howl} from "howler";

export class SoundManager {
    private mainMusic: Howl

    constructor() {
        this.mainMusic = new Howl({
            src: ["assets/sounds/Main.ogg"],
            loop: true,
            html5: true
        })
    }

    playMusic() {
        this.mainMusic.play()
    }

    stopMusic() {
        this.mainMusic.stop()
    }
}