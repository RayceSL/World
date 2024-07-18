/*
        Cold    Warm    Hot
Wet     Ice     Ocean   Ocean
Humid   Taiga   Forest  Jungle
Dry     Ice     Grass   Desert

Tundra      /
Jungle      ¶
Taiga       ↑
Forest      ♣
Ice         *
Grass       ,
Desert      -
Ocean       ≈
Mountain    ▲

Step 1:
Generate three 2D perlin noise --- one for humidity, one for mountains
These two numbers define a vector --- the angle of the vector defines the biome
The map will be 10 x 20 --- Temperature falls off from center

Step 2:
Multiply noise values by 2, then floor it --- 0: Cold/Wet; 1: Warm/Humid; 2: Hot/Dry
*/

import chalk from "chalk";
import { ValueNoise } from "value-noise-js";

let map = [];

// 0 ≥ x < 21 and 0 ≥ y < 11
function humidity(x, y) {
    const noise = new ValueNoise();
    let humidity = noise.evalXY(x, y);
    return humidity;
}

function temp(y) {
    let r = 1;
    //                       ┌  Hypot.  ┐   ↓ Opposite
    // let y = r * Math.sin( Θ * Math.PI / 180 );
    // 
    // ↓ Solved for Θ
    let Θ = ( 180 * Math.asin( y / r ) ) / Math.PI

    return Θ;
}

// For now, temperatur is hot at the south pole
function fillMap() {
    for (let i = 0; i < 10; i++) {
        map.push([
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+0)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+1)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+2)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+3)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+4)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+5)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+6)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+7)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+8)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+9)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+10)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+11)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+12)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+13)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+14)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+15)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+16)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+17)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+18)},
            {"temp": temp(i / 9) / 90, "humidity": humidity(i, i+19)}
        ]);
    }
}

fillMap();
console.log(map);