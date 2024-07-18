import chalk from "chalk";
import { ValueNoise } from "value-noise-js";

const seed = "1";
const noise = new ValueNoise(seed);
// Width of the map
// Number of objects in an array
const cols = 100;
// Height of the map
// Number of arrays in the map
const rows = cols / 2;
const zoom = 0.25;

let map = []; // An array of arrays

class Row {
    constructor() {
        this.row = [];
    }
    // Fill each row with as many noise values as there are columns
    fill(y) {
            for (let i = 0; i < cols; i++) {
                this.row.push(perlin(i, y, false));
        }
    }
}

// >0: Cold; >30: Warm; >60: Hot
function temp(y) {
    //                       ┌  Hypot.  ┐   ↓ Opposite
    // let y = r * Math.sin( Θ * Math.PI / 180 );
    // 
    // ↓ Solved for Θ
    // let Θ = ( 180 * Math.asin( y / r ) ) / Math.PI
    //
    // ↓ Adjusted for my purposes
    let Θ = ( 180 * Math.asin( y / 4 ) ) / Math.PI

    return Math.floor(Θ);
}

function perlin(x, y, ascii) {
    let z = Math.floor( noise.evalXY( x * zoom , y * zoom ) * 100 );
    
    switch (ascii) {
        case true:
            if (z >= 90) {
                return "@";
            } else if (z >= 80) {
                return "%";
            } else if (z >= 70) {
                return "#";
            } else if (z >= 60) {
                return "*";
            } else if (z >= 50) {
                return "+";
            } else if (z >= 40) {
                return "=";
            } else if (z >= 30) {
                return "-";
            } else if (z >= 20) {
                return ":";
            } else if (z >= 10) {
                return ".";
            } else if (z >= 0) {
                return " ";
            }
            break;
        case false:
            if (z >= 90) {
                return "█";
            } else if (z >= 80) {
                return "█";
            } else if (z >= 70) {
                return "▓";
            } else if (z >= 60) {
                return "▓";
            } else if (z >= 50) {
                return "▒";
            } else if (z >= 40) {
                return "▒";
            } else if (z >= 30) {
                return "░";
            } else if (z >= 20) {
                return "░";
            } else if (z >= 10) {
                return " ";
            } else if (z >= 0) {
                return " ";
            }
            break;
    }
}

// Fills the map with all the rows
for (let i = 0; i < rows; i++) {
    map[i] = new Row;
    map[i].fill(i);
}

for (let i = 0; i < rows; i++) {
    console.log(map[i].row.join(""));
}