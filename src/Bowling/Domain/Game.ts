import {Frame} from "./Frame";
import {Roll} from "./Roll";

export class Game {
    frames: Frame[] = [];
    currentFrame: Frame|undefined = undefined;

    public roll(pins: number): void {
        if (!this.currentFrame || (this.currentFrame.isClosed() && this.frames.length < 10)) {
            if(this.currentFrame && this.currentFrame.isClosed()){
                this.frames.push(this.currentFrame);
            }
            this.currentFrame = new Frame(this.frames.length === 9);
            this.frames[this.frames.length - 1]?.setNextFrame(this.currentFrame);
        }

        this.currentFrame.addRoll(new Roll(pins));
    }

    public score(): number {
        return this.frames.concat(this.currentFrame || []).reduce((acc, frame) => acc + frame.score(), 0);
    }
}