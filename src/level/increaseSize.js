const connections = {
    0: [0, 0],
    1: [11, 3],
    2: [0, 3],
    3: [0, 3],
    4: [11, 0],
    5: [11, 3],
    6: [11, 3],
    7: [0, 3],
    8: [0, 0],
    9: [11, 0],
    10: [0, 0],
    11: [11, 0],
    12: [11, 3],
    13: [0, 3],
    14: [0, 0],
    15: [0, 0],
    16: [11, 0]
};

export default (width, mapData) =>
    mapData
        .reduce((acc, tile) => [...acc, tile, connections[tile][0]], [])
        .reduce(
            (acc, tile, index, arr) =>
                index % 2 > 0
                    ? acc
                    : acc === null
                        ? [...arr.slice(0, width * 2), connections[tile][1], 0, ...arr.slice(width * 2)]
                        : [
                              ...acc.slice(0, width * 2 + index),
                              connections[tile][1],
                              0,
                              ...acc.slice(width * 2 + index)
                          ],
            null
        );
