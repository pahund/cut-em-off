import flatIndex from './flatIndex';

test.each([[2, 2, 3, 4], [1, 1, 3, 0], [3, 3, 3, 8]])(
    'When I call the function “flatIndex” with row=%d, col=%d and width=%d, the result is %d',
    (row, col, width, expected) => expect(flatIndex(row, col, width)).toEqual(expected)
);
