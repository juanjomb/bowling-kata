import {Roll} from "./Roll";

export class Frame {
    rolls: Roll[] = [];
    readonly turn: number;

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

    score(): number {
        return this.rolls.reduce((acc, roll) => acc + roll.pins, 0);
    }
}