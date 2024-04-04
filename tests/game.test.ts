import {Game} from "../src/Bowling/Domain/Game";

describe('Game', () => {
    test('has an score', () => {
        expect(new Game().score()).toBe(0);
    });

    test('can roll', () => {
        const game = new Game();
        game.roll(10);
        expect(game.score()).toBe(10);
    });
});