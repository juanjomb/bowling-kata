import {Game} from "../src/Bowling/Domain/Game";

describe('Game', () => {
    test('has an score', () => {
        expect(new Game().score()).toBe(0);
    });
});