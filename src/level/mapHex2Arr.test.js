import mapHex2Arr from './mapHex2Arr.js';

test.each([[' 0123456789abcdef', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]]])(
    'When I call the function “collides” with hex string %s, the result array is %j',
    (hex, arr) => expect(mapHex2Arr(hex)).toEqual(arr)
);
