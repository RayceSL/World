import chalk from "chalk";
import { ValueNoise } from "value-noise-js";

const noise = new ValueNoise();

class NoiseMap {
    constructor() {
        this.map = [];
        this.row = [];
    }

    // Make a row with as many objects as their are cols
    makeRow(cols) {
        for (let col = 0; col < cols; col++) {
            this.row.push(Math.floor(noise.evalXY(x, row)*10));
        }
    }

    makeMap(rows, cols) {
        for (let row = 0; row < rows; row++) {
            this.map[row] = new NoiseMap;
            this.map[row].makeRow(rows, cols);
        }
    }

    logMap() {
        for (let row = 0; row < this.map.length; row++) {
            console.log(this.map[row].join(", "));
        }
    }

}

const noiseMap1 = new NoiseMap;

noiseMap1.makeMap(5, 10);
noiseMap1.logMap();