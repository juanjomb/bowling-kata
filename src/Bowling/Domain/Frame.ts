import {Roll} from "./Roll";

export class Frame {
    private rolls: Roll[] = [];
    private readonly isLast: boolean;
    private nextFrame: Frame|undefined = undefined;

    constructor(isLast: boolean) {
        this.isLast = isLast;
    }

    public addRoll(roll: Roll): void {
        if (this.isClosed()) {
            throw new Error('Frame is already closed');
        }
        if (this.pins() + roll.pins > 10 && !this.isLast) {
            throw new Error('Invalid roll');
        }
        this.rolls.push(roll);
    }

    public isClosed(): boolean {
        if (this.isLast) {
            return this.rolls.length === 3 || (this.rolls.length === 2 && this.pins() < 10);
        }

        return this.rolls.length === 2 || this.isStrike();
    }

    public setNextFrame(frame: Frame): void {
        this.nextFrame = frame;
    }

    public score(): number {
        if (this.isLast) {
            return this.pins();
        }

        if (this.isStrike()) {
            return this.pins() + this.bonusForStrike();
        }

        if (this.isSpare()) {
            return this.pins() + this.bonusForSpare();
        }

        return this.pins();
    }

    public pins(maxRolls: number|undefined = undefined): number {
        let rolls: Roll[] = maxRolls ? this.rolls.slice(0, maxRolls) : this.rolls;
        return rolls.reduce((acc, roll) => acc + roll.pins, 0);
    }

    private isStrike(): boolean {
        return this.rolls.length === 1 && this.pins(0) === 10;
    }

    private isSpare(): boolean {
        return this.rolls.length === 2 && this.pins() === 10;
    }

    private bonusForStrike(): number {
        if (!this.nextFrame) {
            return 0;
        }
        let bonus: number = this.nextFrame.pins(this.nextFrame.isLast ? 2 : undefined);

        if(this.nextFrame.isStrike() && this.nextFrame.nextFrame){
            bonus += this.nextFrame.nextFrame.pins(this.nextFrame.nextFrame.isLast ? 1 : undefined)
        }

        return bonus;
    }

    private bonusForSpare(): number {
        if (!this.nextFrame) {
            return 0;
        }

        return this.nextFrame.pins(1);
    }
}