import {Roll} from "../src/Bowling/Domain/Roll";

describe('Roll', () => {
    test('cannot have > 10 pins', () => {
        expect(() => new Roll(11)).toThrowError('Invalid roll');
    });

    test('cannot have negative pins', () => {
        expect(() => new Roll(-1)).toThrowError('Invalid roll');
    });
});