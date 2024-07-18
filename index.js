import chalk from "chalk";
import { ValueNoise } from "value-noise-js";

const seed = "1";
const noise = new ValueNoise(seed);

// Height of the map
// Number of arrays in the map
const rows = 10;

// Width of the map
// Number of objects in an array
const cols = rows * 2;

// ↗ Zoom out; ↘ Zoom in
const zoom = 1;

// ██   ██ ██    ██ ███    ███ ██ ██████  ██ ████████ ██    ██ 
// ██   ██ ██    ██ ████  ████ ██ ██   ██ ██    ██     ██  ██  
// ███████ ██    ██ ██ ████ ██ ██ ██   ██ ██    ██      ████   
// ██   ██ ██    ██ ██  ██  ██ ██ ██   ██ ██    ██       ██    
// ██   ██  ██████  ██      ██ ██ ██████  ██    ██       ██    

// 2D array humidity map
let hMap = [];

// Humidity row
class HRow {
    constructor() {
        this.row = [];
    }
    // Fill each row with as many noise values as there are columns
    fill(y, ascii) {
            for (let i = 0; i < cols; i++) {
                this.row.push(perlin(i, y, ascii));
        }
    }
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

// Fills the humidity map with all the rows
for (let i = 0; i < rows; i++) {
    hMap[i] = new HRow;
    hMap[i].fill(i, true);
}

// Outputs the humidity map to the console
function logHMap() {
    for (let i = 0; i < rows; i++) {
        console.log(hMap[i].row.join(""));
    }
}

// ████████ ███████ ███    ███ ██████     
//    ██    ██      ████  ████ ██   ██    
//    ██    █████   ██ ████ ██ ██████     
//    ██    ██      ██  ██  ██ ██         
//    ██    ███████ ██      ██ ██      ██ 

let tMap = []; // Temperature map


// Temperature row
class TRow {
    constructor() {
        this.row = [];
    }
    // Fill each row with as many temperature values as there are columns
    fill(Θ, ascii) {
            for (let i = 0; i < cols; i++) {
                this.row.push(temperature(Θ, ascii));
        }
    }
}

// Input degrees; 0 = 90°N; 90 = 0°N; 180 = -90°S
// Returns the temperature as a percentage
function temperature(Θ, ascii) {
    let r = 1;
    let y = Math.floor( ( r * Math.sin( Θ * Math.PI / 180 ) ) * 100 );

    switch (ascii) {
        case true:
            if (y >= 90) {
                return "@";
            } else if (y >= 80) {
                return "%";
            } else if (y >= 70) {
                return "#";
            } else if (y >= 60) {
                return "*";
            } else if (y >= 50) {
                return "+";
            } else if (y >= 40) {
                return "=";
            } else if (y >= 30) {
                return "-";
            } else if (y >= 20) {
                return ":";
            } else if (y >= 10) {
                return ".";
            } else if (y >= 0) {
                return " ";
            }
            break;
        case false:
            if (z >= 90) {
                return "█";
            } else if (y >= 80) {
                return "█";
            } else if (y >= 70) {
                return "▓";
            } else if (y >= 60) {
                return "▓";
            } else if (y >= 50) {
                return "▒";
            } else if (y >= 40) {
                return "▒";
            } else if (y >= 30) {
                return "░";
            } else if (y >= 20) {
                return "░";
            } else if (y >= 10) {
                return " ";
            } else if (y >= 0) {
                return " ";
            }
            break;
    }
}

// Fills the temperature map with all the rows
for (let i = 0; i < rows; i++) {
    let sectors = Math.floor( 180 / rows );

    tMap[i] = new TRow;
    tMap[i].fill(i * sectors, true);
}

// Outputs the temperature map to the console
function logTMap() {
    for (let i = 0; i < rows; i++) {
        console.log(tMap[i].row.join(""));
    }
}

//  ██████  ██    ██ ████████ ██████  ██    ██ ████████ 
// ██    ██ ██    ██    ██    ██   ██ ██    ██    ██    
// ██    ██ ██    ██    ██    ██████  ██    ██    ██    
// ██    ██ ██    ██    ██    ██      ██    ██    ██    
//  ██████   ██████     ██    ██       ██████     ██    

console.log("Temperature:");
logTMap();
console.log("\nHumidity:")
logHMap();