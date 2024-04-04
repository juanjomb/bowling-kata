import {Roll} from "./Roll";

export class Frame {
    rolls: Roll[] = [];
    readonly turn: number;
    readonly previousFrame: Frame|undefined = undefined;

    constructor(turn: number) {
        this.turn = turn;
    }

    addRoll(roll: Roll): void {
        if (this.isClosed()) {
            throw new Error('Frame is already closed');
        }
        this.rolls.push(roll);
    }

    isClosed(): boolean {
        const allowedRolls = this.turn === 10 ? 3 : 2;
        return this.rolls.length === allowedRolls;
    }

    isStrike(): boolean {
        return this.rolls.length === 1 && this.rolls[0].pins === 10;
    }

    isSpare(): boolean {
        return this.rolls.length === 2 && this.rolls[0].pins + this.rolls[1].pins === 10;
    }

    score(): number {
        return this.rolls.reduce((acc, roll) => acc + roll.pins, 0);
    }
}