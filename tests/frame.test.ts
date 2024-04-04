import {Frame} from "../src/Bowling/Domain/Frame";
import {Roll} from "../src/Bowling/Domain/Roll";

describe('Frame', () => {
    test('is spare ', () => {
        const frame = new Frame(1);
        frame.addRoll(new Roll(5));
        frame.addRoll(new Roll(5));
        expect(frame.isSpare()).toBe(true);
    });

    test('is strike', () => {
        const frame = new Frame(1);
        frame.addRoll(new Roll(10));
        expect(frame.isStrike()).toBe(true);
    });
});