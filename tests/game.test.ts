import {Game} from "../src/Bowling/Domain/Game";
import {randomInt} from "node:crypto";

describe('Game', () => {
    test('has an score', () => {
        expect(new Game().score()).toBe(0);
    });

    test('can roll', () => {
        const game = new Game();
        game.roll(10);
        expect(game.score()).toBe(10);
    });

    test('highest without strike', () => {
        const game = new Game();
        for (let i = 0; i < 10; i++) {
            game.roll(9);
            game.roll(1);
        }
        game.roll(9);
        expect(game.score()).toBe(190);
    });

    test('perfect game', () => {
        const game = new Game();
        for (let i = 0; i < 12; i++) {
            game.roll(10);
        }
        expect(game.score()).toBe(300);
    });

    test('all 5s', () => {
        const game = new Game();
        for (let i = 0; i < 21; i++) {
            game.roll(5);
        }
        expect(game.score()).toBe(150);
    });

    test('any spare or strike score only pins', () => {
        const game = new Game();
        let total = 0;
        for (let i = 0; i < 10; i++) {
            const  firstRoll = randomInt(0, 9);
            const  secondRoll = randomInt(0, 9 - firstRoll);
            game.roll(firstRoll);
            game.roll(secondRoll);
            total += firstRoll + secondRoll;
        }
        expect(game.score()).toBe(total);
    });
});