import Graph from './Graph';

const simpleData = { a: { b: 3, c: 1 }, b: { a: 2, c: 1 }, c: { a: 4, b: 1 } };

describe('When I construct a graph with some graph data', () => {
    let graph;
    beforeEach(() => (graph = new Graph(simpleData)));
    test.each([
        [['a', 'b'], ['a', 'c', 'b']],
        [['a', 'c'], ['a', 'c']],
        [['b', 'a'], ['b', 'a']],
        [['b', 'c', 'b'], ['b', 'c', 'b']],
        [['c', 'a', 'b'], ['c', 'b', 'a', 'c', 'b']],
        [['c', 'b', 'a'], ['c', 'b', 'a']]
    ])('and I call the method “findShortestPath” with arguments %j, the result is %j', (args, expected) =>
        expect(graph.findShortestPath(...args)).toEqual(expected)
    );
});

const gameData = {
    user: { b: 2 },
    b: { user: 2, f: 4, c: 2 },
    c: { b: 2, d: 1, e: 7 },
    d: { c: 1, e: 2, f: 1 },
    e: { c: 7, d: 2 },
    f: { b: 4, d: 1, g: 2 },
    g: { f: 2, h: 3 },
    h: { g: 2, i: 2, j: 8 },
    i: { h: 2, j: 2, virus: 2 },
    j: { h: 8, i: 2, virus: 10 },
    virus: { i: 2, j: 10 }
};

describe('The shortest path between a user and a virus (using abstract game data)', () => {
    let shortestPath;
    beforeEach(() => (shortestPath = new Graph(gameData).findShortestPath('user', 'virus')));
    it('is correct', () => expect(shortestPath).toMatchSnapshot());
});

/*
const gameCoordinatesData = {
    [{ row: 1, col: 1 }]: { [{ row: 1, col: 3 }]: 2 },
    [{ row: 1, col: 3 }]: { [{ row: 1, col: 1 }]: 2, [{ row: 3, col: 5 }]: 4, [{ row: 1, col: 5 }]: 2 },
    [{ row: 1, col: 5 }]: { [{ row: 1, col: 3 }]: 2, [{ row: 2, col: 5 }]: 1, [{ row: 2, col: 7 }]: 7 },
    [{ row: 2, col: 5 }]: { [{ row: 1, col: 5 }]: 1, [{ row: 2, col: 7 }]: 2, [{ row: 3, col: 5 }]: 1 },
    [{ row: 2, col: 7 }]: { [{ row: 1, col: 5 }]: 7, [{ row: 2, col: 5 }]: 2 },
    [{ row: 3, col: 5 }]: { [{ row: 1, col: 3 }]: 4, [{ row: 2, col: 5 }]: 1, [{ row: 5, col: 5 }]: 2 },
    [{ row: 5, col: 5 }]: { [{ row: 3, col: 5 }]: 2, [{ row: 5, col: 7 }]: 3 },
    [{ row: 5, col: 7 }]: { [{ row: 5, col: 5 }]: 2, [{ row: 7, col: 7 }]: 2, [{ row: 8, col: 8 }]: 8 },
    [{ row: 7, col: 7 }]: { [{ row: 5, col: 7 }]: 2, [{ row: 8, col: 8 }]: 2, [{ row: 7, col: 5 }]: 2 },
    [{ row: 8, col: 8 }]: { [{ row: 5, col: 7 }]: 8, [{ row: 7, col: 7 }]: 2, [{ row: 7, col: 5 }]: 10 },
    [{ row: 7, col: 5 }]: { [{ row: 7, col: 7 }]: 2, [{ row: 8, col: 8 }]: 10 }
};

const userCoords = { row: 1, col: 1 };
const virusCoords = { row: 7, col: 5 };

describe('The shortest path between a user and a virus (using coordinates game data)', () => {
    let shortestPath;
    beforeEach(() => (shortestPath = new Graph(gameCoordinatesData).findShortestPath(userCoords, virusCoords)));
    it('is correct', () => expect(shortestPath).toMatchSnapshot());
});
*/
