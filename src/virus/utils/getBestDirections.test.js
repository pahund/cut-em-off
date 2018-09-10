import getBestDirections from './getBestDirections';
import { N, E, S, W } from '../../directions';

test.each([
    [{ viable: [N, S], visits: [[1], [0], [2]], row: 1, col: 0 }, [N]],
    [{ viable: [N, S], visits: [[1], [0], [1]], row: 1, col: 0 }, [N, S]],
    [{ viable: [E, W], visits: [[1, 0, 2]], row: 0, col: 1 }, [W]],
    [{ viable: [E, W], visits: [[2, 0, 1]], row: 0, col: 1 }, [E]]
])('When I call the function with %j then the result is %j', (input, expected) =>
    expect(getBestDirections(input)).toEqual(expected)
);
