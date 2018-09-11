import { tileWidth, tileHeight } from '../config.js';
import transformMapCoordinates from './transformMapCoordinates';

test.each([
    [{ tileWidth, tileHeight, sx: 0, sy: 0 }, { row: 1, col: 1 }, { x: 450, y: 350 }],
    [{ tileWidth, tileHeight, sx: 0, sy: 0 }, { x: 0, y: 0 }, { x: 450, y: 350 }],
    [{ tileWidth, tileHeight, sx: 0, sy: 0 }, { row: 3, col: 3 }, { x: 650, y: 550 }],
    [{ tileWidth, tileHeight, sx: 200, sy: 100 }, { x: 300, y: 400 }, { x: 550, y: 650 }]
])(
    'When I call the function “transformMapCoordinates” with map %j and coordinates %j, the result is %j',
    (map, coordinates, expected) => expect(transformMapCoordinates(map, coordinates)).toEqual(expected)
);
