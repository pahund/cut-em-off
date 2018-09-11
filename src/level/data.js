import { N, W, S, E } from '../directions/index.js';

export default [
    {
        player: {
            col: 8,
            row: 9,
            direction: S,
            speed: 5
        },
        virus: {
            speed: 2.5,
            max: 2,
            interval: 10000
        },
        servers: [{ row: 9, col: 8 }, { row: 9, col: 12 }, { row: 15, col: 15 }],
        map: {
            width: 20,
            height: 20,
            // prettier-ignore
            data: [
                 0, 17,  0,  0,  0, 17,  0,  0,  0, 17,  0,  0,  0, 17,  0,  0,  0, 17,  0,  0,
                20,  4, 11,  2,  1,  4,  2,  0,  0,  5, 11,  6, 11, 13,  0,  1, 11, 12,  2,  0,
                 0,  1, 11, 10,  9, 11, 13,  0,  0,  3,  0,  3,  0,  5, 11, 13,  0,  3,  3,  0,
                 0,  3,  1, 11,  6, 11, 10,  0,  1,  4,  2,  9, 11, 13,  0,  9, 11, 10,  3,  0,
                 0,  3,  3,  0,  3,  0,  0,  0,  3,  1, 13,  0,  0,  3,  0,  0,  0,  0,  5, 18,
                 0,  3,  3,  0,  3,  0,  1, 11, 10,  3,  9, 11,  6,  4, 11,  6,  2,  0,  3,  0,
                 0,  3,  3,  0,  3,  0,  3,  0,  0,  3,  0,  0,  3,  0,  0,  3,  3,  0,  3,  0,
                 0,  9, 13,  0,  5, 11, 10,  0,  0,  3,  1, 11, 10,  0,  0,  3,  3,  0,  3,  0,
                 0,  0,  3,  0,  3,  0,  0,  0,  1,  4, 10,  0,  0,  0,  0,  3,  5, 11,  4, 18,
                 0,  1, 13,  0,  5, 11,  2,  0,  3,  0,  1, 11, 11, 11, 11, 12, 10,  0,  0,  0,
                 0,  3,  3,  0,  3,  0,  5, 11, 13,  0,  9, 11,  2,  0,  0,  3,  0,  0,  1, 18,
                 0,  9, 10,  0,  5, 11, 10,  0,  9, 11, 11, 11, 12, 11,  6, 10,  0,  0,  3,  0,
                 0,  0,  0,  0,  3,  1, 11,  2,  1, 11, 11, 11, 10,  0,  3,  0,  1, 11,  4, 18,
                20,  6,  6, 11, 10,  3,  0,  3,  3,  0,  0,  0,  1,  2,  9, 11, 12, 11,  2,  0,
                 0,  3,  3,  0,  0,  3,  0,  3,  3,  1, 11,  2,  3,  3,  0,  0,  3,  0,  3,  0,
                 0,  5,  4,  2,  0,  5, 11, 10,  3,  3,  0,  5, 12,  4, 11, 11, 13,  0,  5, 18,
                 0,  3,  0,  5, 11, 12, 11,  6, 10,  9,  6, 10,  3,  0,  0,  0,  9, 11, 10,  0,
                20,  4, 11, 13,  0,  3,  0,  9, 11, 11, 13,  0,  9, 11,  6, 11,  6,  6, 11, 18,
                 0,  0,  0,  3,  0,  3,  0,  0,  0,  0,  5, 11, 11,  2,  3,  0,  3,  3,  0,  0,
                 0,  0,  0, 19,  0, 19,  0,  0,  0,  0, 19,  0,  0, 19,  9, 11, 10, 19,  0,  0
            ]
        }
    }
];
