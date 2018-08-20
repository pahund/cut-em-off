import getBestDirections from './getBestDirections';
import { N, E, S, W } from '../../directions';

test.each([
    [{ viable: [N, S], visits: [[1], [0], [2]], row: 2, col: 1 }, [N]],
    [{ viable: [N, S], visits: [[1], [0], [1]], row: 2, col: 1 }, [N, S]],
    [{ viable: [E, W], visits: [[1, 0, 2]], row: 1, col: 2 }, [W]],
    [{ viable: [E, W], visits: [[2, 0, 1]], row: 1, col: 2 }, [E]]
])('When I call the function with %o then the result is %p', (input, expected) =>
    expect(getBestDirections(input)).toEqual(expected)
);
