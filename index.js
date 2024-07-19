import chalk from "chalk";
import { ValueNoise } from "value-noise-js";

const noise = new ValueNoise();
const noise2 = new ValueNoise();
const noise3 = new ValueNoise();

// Height of the map
// Number of arrays in the map
const rows = 50;

// Width of the map
// Number of objects in an array
const cols = rows * 2;

// ↗ Zoom out; ↘ Zoom in
const zoom = 0.15;
// ↗ Bigger; ↘ Smaller
const islandSize = 0.1;

// ↗ Cooling; ↘ Warming
const warming = 1.6;
const falloff = 0.08;

// ASCII Art
const tropic = chalk.bgBlue.blueBright("~");
const tundra = chalk.bgGreen.white(",");
const taiga = chalk.bgGreen.white("↑");
const ice = chalk.bgBlue("#");
const grass = chalk.bgGreen.yellow(",");
const forest = chalk.bgGreen.red("♣");
const ocean = chalk.bgBlue(" ");
const desert = chalk.bgYellow.yellow("-");
const jungle = chalk.bgGreen.red("§");
const mtn = chalk.bgGray("▲");
const beach = chalk.bgYellow.green("↑");
const deepOcean = chalk.bgBlue.black("~");
const trench = chalk.bgBlue.black("≈");

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
    fill(y) {
            for (let i = 0; i < cols; i++) {
                this.row.push(perlinHumidity(i, y));
        }
    }
}

function perlinHumidity(x, y) {
    let h = Math.floor( noise.evalXY( x * zoom , y * zoom ) * 100 );
    return h;
}

// Fills the humidity map with all the rows
for (let i = 0; i < rows; i++) {
    hMap[i] = new HRow;
    hMap[i].fill(i);
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
    fill(x) {
            for (let i = 0; i < cols; i++) {
                this.row.push(temperature(x) + tempNoise(x, i));
        }
    }
}

function temperature(x) {
    // where b is the number of rows
    //
    //                            
    //   100 ⎛         ( x - b / 2 )^2 ⎞
    // 2 ─── ⎜ b / 2 - ─────────────── ⎟
    //    b                 b / 2 
    //       ⎝                         ⎠
    //
    let r = rows / 2;
    let t = Math.floor( 2 * (100 / rows ) * ( r - Math.pow(x - r, 2) / r ) );
    return t;
}




function tempNoise(x, y) {
    let tN = Math.floor( noise3.evalXY( x * falloff , y * falloff ) * 30 );
    return tN;
}

// Fills the temperature map with all the rows
for (let i = 0; i < rows; i++) {
    tMap[i] = new TRow;
    tMap[i].fill(i);
}

// ██       █████  ███    ██ ██████  
// ██      ██   ██ ████   ██ ██   ██ 
// ██      ███████ ██ ██  ██ ██   ██ 
// ██      ██   ██ ██  ██ ██ ██   ██ 
// ███████ ██   ██ ██   ████ ██████  

// 2D array humidity map
let lMap = [];

// Humidity row
class LRow {
    constructor() {
        this.row = [];
    }
    // Fill each row with as many noise values as there are columns
    fill(y) {
            for (let i = 0; i < cols; i++) {
                this.row.push(perlinLand(i, y));
        }
    }
}

function perlinLand(x, y) {
    let l = Math.floor( noise2.evalXY( x * islandSize , y * islandSize) * 100 );
    return l;
}

// Fills the land map with all the rows
for (let i = 0; i < rows; i++) {
    lMap[i] = new LRow;
    lMap[i].fill(i);
}

// ██     ██  ██████  ██████  ██      ██████  
// ██     ██ ██    ██ ██   ██ ██      ██   ██ 
// ██  █  ██ ██    ██ ██████  ██      ██   ██ 
// ██ ███ ██ ██    ██ ██   ██ ██      ██   ██ 
//  ███ ███   ██████  ██   ██ ███████ ██████  

let bMap = []; // for "biome map"

// Need to compare corresponding objects in each row for the temperature map and humidity map
// Biome row
class BRow {
    constructor() {
        this.row = [];
    }
    fill(row) {
        for (let i = 0; i < cols; i++) {
            if ( lMap[row].row[i] >= 95 ) {
                    this.row.push(mtn);

            } else if ( lMap[row].row[i] >= 50 ) {          // HIGH LAND
                if ( hMap[row].row[i] >= 66 ) {             // HIGH HUMIDITY
                    if ( tMap[row].row[i] >= 66 * warming ) {         // Tropics
                        this.row.push(tropic);
                    } else if ( tMap[row].row[i] >= 33 * warming ) {  // Ocean
                        this.row.push(ocean);
                    } else if ( tMap[row].row[i] >= 0 ) {   // Icecap
                        this.row.push(ice);
                    } else {
                        this.row.push("a");
                    }

                } else if ( hMap[row].row[i] >= 33 ) {      // MEDIUM HUMIDITY
                    if ( tMap[row].row[i] >= 66 * warming ) {         // Jungle
                        this.row.push(jungle);
                    } else if ( tMap[row].row[i] >= 33 * warming ) {  // Forest
                        this.row.push(forest);
                    } else if ( tMap[row].row[i] >= 0 ) {   // Taiga
                        this.row.push(taiga);
                    } else {
                        this.row.push("b");
                    }

                } else if ( hMap[row].row[i] >= 0 ) {       // LOW HUMIDITY
                    if ( tMap[row].row[i] > 66 * warming ) {          // Desert
                        this.row.push(desert);
                    } else if ( tMap[row].row[i] >= 33 * warming ) {  // Grassland
                        this.row.push(grass);
                    } else if ( tMap[row].row[i] >= 0 ) {   // Tundra
                        this.row.push(tundra);
                    } else {
                        this.row.push("c");
                    }

                } else {
                    this.row.push("?");
                }

            } else if (lMap[row].row[i] >= 49) {
                this.row.push(beach);

            } else if (lMap[row].row[i] >= 33) {
                this.row.push(ocean);

            } else if (lMap[row].row[i] >= 5) {
                this.row.push(deepOcean);

            } else {
                this.row.push(trench);

            }
        }
    }
}

for (let i = 0; i < rows; i++) {
    bMap[i] = new BRow;
    bMap[i].fill(i);
}

//  ██████  ██    ██ ████████ ██████  ██    ██ ████████ 
// ██    ██ ██    ██    ██    ██   ██ ██    ██    ██    
// ██    ██ ██    ██    ██    ██████  ██    ██    ██    
// ██    ██ ██    ██    ██    ██      ██    ██    ██    
//  ██████   ██████     ██    ██       ██████     ██    

// Colored world map
for (let i = 0; i < rows; i++) {
    console.log(bMap[i].row.join(""));
}