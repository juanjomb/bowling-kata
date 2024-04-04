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
            this.currentFrame = new Frame(this.frames.length + 1);
        }

        this.currentFrame.addRoll(new Roll(pins));
    }

    public score(): number {
        const frames = this.frames.length === 10 ? this.frames : this.frames.concat(this.currentFrame || []);
        return frames.reduce((acc, frame) => acc + frame.score(), 0);
    }
}