import {Frame} from "./Frame";
import {Roll} from "./Roll";

export class Game {
    frames: Frame[] = [];
    currentFrame: Frame|undefined = undefined;

    public roll(pins: number): void {
        if(this.frames.length === 9 && this.getCurrentFrame().isClosed()){
            throw new Error('Game is over');
        }

        if(this.getCurrentFrame().isClosed()){
            this.frames.push(this.getCurrentFrame());
            this.generateCurrentFrame();
            this.frames[this.frames.length - 1]?.setNextFrame(this.getCurrentFrame());
        }

        this.getCurrentFrame().addRoll(new Roll(pins));
    }

    public score(): number {
        return this.frames.concat(this.currentFrame || []).reduce((acc, frame) => acc + frame.score(), 0);
    }

    private getCurrentFrame(): Frame {
        this.currentFrame = this.currentFrame || new Frame(this.frames.length === 9);
        return <Frame>this.currentFrame;
    }

    private generateCurrentFrame(): void {
        this.currentFrame = new Frame(this.frames.length === 9);
    }
}