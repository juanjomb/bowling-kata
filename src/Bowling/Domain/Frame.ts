import {Roll} from "./Roll";

export class Frame {
    rolls: Roll[] = [];
    readonly isLast: boolean;
    nextFrame: Frame|undefined = undefined;

    constructor(isLast: boolean) {
        this.isLast = isLast;
    }

    addRoll(roll: Roll): void {
        if (this.isClosed()) {
            throw new Error('Frame is already closed');
        }
        this.rolls.push(roll);
    }

    isClosed(): boolean {
        if (this.isLast) {
            return this.rolls.length === 3 || (this.rolls.length === 2 && this.pins() < 10);
        }

        return this.rolls.length === 2 || this.isStrike();
    }

    isStrike(): boolean {
        return this.rolls.length === 1 && this.rolls[0].pins === 10;
    }

    isSpare(): boolean {
        return this.rolls.length === 2 && this.rolls[0].pins + this.rolls[1].pins === 10;
    }

    setNextFrame(frame: Frame): void {
        this.nextFrame = frame;
    }

    score(): number {
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

    pins(maxRolls: number|undefined = undefined): number {
        let rolls: Roll[] = maxRolls ? this.rolls.slice(0, maxRolls) : this.rolls;
        return rolls.reduce((acc, roll) => acc + roll.pins, 0);
    }
}