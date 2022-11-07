import {sound} from "@pixi/sound";

type Sound = {
    play: (opts: {loop: boolean, singleInstance: boolean}) => void;
    stop: () => void;
    volume: number;
    loop: boolean
}

export class SoundManager {
    private mainMusic?: Sound

    constructor() {
        this.mainMusic = sound.add("main", "assets/sounds/Main.ogg")
    }

    isPlayingMusic(): boolean {
        return sound.find("main").isPlaying
    }

    playMusic() {
        sound.play("main", {loop: true})
    }

    stopMusic() {
        sound.stop("main")
    }
}