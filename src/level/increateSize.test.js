import increaseSize from './increaseSize.js';

test.each([
    // [4, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]],
    [2, [1, 2, 9, 10]]
])('When I call “increaseSize” with width %j and values %j, the result is correct', (width, input) =>
    expect(increaseSize(width, input)).toMatchSnapshot()
);
