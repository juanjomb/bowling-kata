export class Roll {
    readonly pins: number;

    constructor(pins: number) {
        if(pins < 0 || pins > 10){
            throw new Error('Invalid roll');
        }
        this.pins = pins;
    }
}