# Function of this program
Generate an ASCII map of a randomly generated planet
***
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

Generate three 2D perlin noise --- one for humidity, one for mountains
These two numbers define a vector --- the angle of the vector defines the biome
The map will be 10 x 20 --- Temperature falls off from center