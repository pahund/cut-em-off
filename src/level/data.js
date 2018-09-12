import { N, W, S } from '../directions/index.js';

export default [
    {
        player: {
            col: 7,
            row: 7,
            direction: N,
            speed: 5
        },
        virus: {
            speed: 2.5,
            max: 1,
            interval: 3000
        },
        servers: [{ row: 7, col: 4 }, { row: 7, col: 10 }],
        map: {
            width: 7,
            height: 7,
            // prettier-ignore
            data:
                '   6   ' +
                '   2 01' +
                '0aac03c' +
                '2 0b9 2' +
                '4594aa9' +
                '89 2   ' +
                '   e   '
        }
    },
    {
        player: {
            col: 6,
            row: 8,
            direction: S,
            speed: 5
        },
        virus: {
            speed: 2.5,
            max: 1,
            interval: 3000
        },
        servers: [{ row: 7, col: 4 }, { row: 7, col: 8 }, { row: 8, col: 6 }],
        map: {
            width: 5,
            height: 8,
            // prettier-ignore
            data:
                '  6  ' +
                ' 626 ' +
                '0b3b1' +
                '22 22' +
                '83b39' +
                '05b51' +
                '8b3b9' +
                ' e e '
        }
    },
    {
        player: {
            col: 9,
            row: 9,
            direction: N,
            speed: 5
        },
        virus: {
            speed: 2.5,
            max: 2,
            interval: 3000
        },
        servers: [{ row: 6, col: 5 }, { row: 7, col: 9 }, { row: 7, col: 9 }, { row: 9, col: 9 }],
        map: {
            width: 9,
            height: 9,
            // prettier-ignore
            data:
                '  6 6    ' +
                ' 03a31   ' +
                ' 410a3a57' +
                ' 228aaac ' +
                'fc8aa1 2 ' +
                ' 20aabac ' +
                ' 49  2 47' +
                'fc05aba9 ' +
                ' 89e e   '
        }
    },
    {
        player: {
            col: 12,
            row: 4,
            direction: W,
            speed: 5
        },
        virus: {
            speed: 2.5,
            max: 3,
            interval: 3000
        },
        servers: [{ row: 5, col: 7 }, { row: 4, col: 12 }, { row: 7, col: 9 }, { row: 8, col: 15 }],
        map: {
            width: 13,
            height: 6,
            // prettier-ignore
            data:
                '  6    0a1   ' +
                '  4aa1 2 2 6 ' +
                'fabaaba353a31' +
                '  47 2  2  fc' +
                ' fbaa9  85aa9' +
                '  e      e   '
        }
    }
    /* ,
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
            data:
                ' 6   6   6   6   6  ' +
                'f3a1031  4a5ac 0ab1 ' +
                ' 0a98ac  2 2 4ac 22 ' +
                ' 20a5a9 0318ac 8a92 ' +
                ' 22 2   20c  2    47' +
                ' 22 2 0a928a53a51 2 ' +
                ' 22 2 2  2  2  22 2 ' +
                ' 8c 4a9  20a9  22 2 ' +
                '  2 2   039    24a37' +
                ' 0c 4a1 2 0aaaab9   ' +
                ' 22 2 4ac 8a1  2  07' +
                ' 89 4a9 8aaaba59  2 ' +
                '    20a10aaa9 2 0a37' +
                'f55a92 22   018aba1 ' +
                ' 22  2 220a122  2 2 ' +
                ' 431 4a922 4b3aac 47' +
                ' 2 4aba598592   8a9 ' +
                'f3ac 2 8aac 8a5a55a7' +
                '   2 2    4aa12 22  ' +
                '   e e    e  e8a9e  '
        }
    }*/
];
