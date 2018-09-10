import { Pathfinder } from './pathfinder.js';

// prettier-ignore
const simpleData = new Map([
    ['a', new Map([['b', 3],['c', 1]])],
    ['b', new Map([['a', 2],['c', 1]])],
    ['c', new Map([['a', 4],['b', 1]])]
]);

describe('When I construct a pathfinder with some graph data', () => {
    let graph;
    beforeEach(() => (graph = new Pathfinder(simpleData)));
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

const gameData = new Map([
    ['user', new Map([['b', 2]])],
    ['b', new Map([['user', 2], ['f', 4], ['c', 2]])],
    ['c', new Map([['b', 2], ['d', 1], ['e', 7]])],
    ['d', new Map([['c', 1], ['e', 2], ['f', 1]])],
    ['e', new Map([['c', 7], ['d', 2]])],
    ['f', new Map([['b', 4], ['d', 1], ['g', 2]])],
    ['g', new Map([['f', 2], ['h', 3]])],
    ['h', new Map([['g', 2], ['i', 2], ['j', 8]])],
    ['i', new Map([['h', 2], ['j', 2], ['virus', 2]])],
    ['j', new Map([['h', 8], ['i', 2], ['virus', 10]])],
    ['virus', new Map([['i', 2], ['j', 10]])]
]);

describe('The shortest path between a user and a virus (using abstract game data)', () => {
    let shortestPath;
    beforeEach(() => (shortestPath = new Pathfinder(gameData).findShortestPath('user', 'virus')));
    it('is correct', () => expect(shortestPath).toMatchSnapshot());
});

test('simple-string-map', () => {
    expect(
        // prettier-ignore
        new Pathfinder(new Map([
            ['foo', new Map([['bar', 1]])],
            ['bar', new Map([['foo', 1]])]
        ])).findShortestPath(
            'foo',
            'bar'
        )
    ).toEqual(['foo', 'bar']);
});

test('simple-object', () => {
    const foo = { foo: 'shmoo' };
    const bar = { bar: 'bar' };
    expect(
        new Pathfinder(new Map([[foo, new Map([[bar, 1]])], [bar, new Map([[foo, 1]])]])).findShortestPath(foo, bar)
    ).toEqual([foo, bar]);
});

const user = { row: 1, col: 1 };
const b = { row: 1, col: 3 };
const c = { row: 1, col: 5 };
const d = { row: 2, col: 5 };
const e = { row: 2, col: 7 };
const f = { row: 3, col: 5 };
const g = { row: 5, col: 5 };
const h = { row: 5, col: 7 };
const i = { row: 7, col: 7 };
const j = { row: 8, col: 8 };
const virus = { row: 7, col: 5 };

const gameCoordinatesData = new Map([
    [user, new Map([[b, 2]])],
    [b, new Map([[user, 2], [f, 4], [c, 2]])],
    [c, new Map([[b, 2], [d, 1], [e, 7]])],
    [d, new Map([[c, 1], [e, 2], [f, 1]])],
    [e, new Map([[c, 7], [d, 2]])],
    [f, new Map([[b, 4], [d, 1], [g, 2]])],
    [g, new Map([[f, 2], [h, 3]])],
    [h, new Map([[g, 2], [i, 2], [j, 8]])],
    [i, new Map([[h, 2], [j, 2], [virus, 2]])],
    [j, new Map([[h, 8], [i, 2], [virus, 10]])],
    [virus, new Map([[i, 2], [j, 10]])]
]);

describe('The shortest path between a user and a virus (using coordinates game data)', () => {
    let shortestPath;
    beforeEach(() => (shortestPath = new Pathfinder(gameCoordinatesData).findShortestPath(user, virus)));
    it('is correct', () => expect(shortestPath).toMatchSnapshot());
});

describe('When I create a pathfinder without setting a graph using the constructor', () => {
    let pathfinder;
    beforeEach(() => (pathfinder = new Pathfinder()));
    describe('the graph property of the pathfinder', () => it('is null', () => expect(pathfinder.graph).toBeNull()));
    describe('and I set the graph from a map', () => {
        beforeEach(() =>
            pathfinder.setDataFromMap(
                {
                    width: 4,
                    height: 4,
                    layers: {
                        main: {
                            // prettier-ignore
                            data: [
                                20,  6, 11,  2,
                                 0,  3,  0,  3,
                                 1,  4,  6, 10,
                                 9, 11, 10,  0
                            ]
                        }
                    }
                },
                'main'
            ));
        describe('the graph property of the pathfinder', () =>
            it('is correct', () => expect(pathfinder.graph).toMatchSnapshot()));
        describe("and I get the node of the user's position (row 1, column 1)", () => {
            let user;
            beforeEach(() => (user = pathfinder.getNodeByCoords({ row: 1, col: 1 })));
            describe('the node', () => it('is correct', () => expect(user).toMatchSnapshot()));
            describe("and I get the node of the virus' position (row 4, column 2)", () => {
                let virus;
                beforeEach(() => (virus = pathfinder.getNodeByCoords({ row: 4, col: 2 })));
                describe('the node', () => it('is correct', () => expect(virus).toMatchSnapshot()));
                describe('and I get the shortest path between the user and the virus', () => {
                    let shortestPath;
                    beforeEach(() => (shortestPath = pathfinder.findShortestPath(user, virus)));
                    describe('the result', () => it('is correct', () => expect(shortestPath).toMatchSnapshot()));
                });
            });
        });
        describe('and I get the shortest path between the user and the virus using their coordinates', () => {
            let shortestPath;
            beforeEach(() =>
                (shortestPath = pathfinder.findShortestPathByCoords({ row: 1, col: 1 }, { row: 4, col: 2 })));
            describe('the result', () => it('is correct', () => expect(shortestPath).toMatchSnapshot()));
        });
    });
    describe('and I set the graph from a map with broken conduits that block the way from user to virus', () => {
        beforeEach(() =>
            pathfinder.setDataFromMap(
                {
                    width: 4,
                    height: 4,
                    layers: {
                        main: {
                            // prettier-ignore
                            data: [
                                20,  6, 35,  2,
                                 0, 27,  0,  3,
                                 1,  4,  6, 10,
                                 9, 11, 10,  0
                            ]
                        }
                    }
                },
                'main'
            ));
        describe('the graph property of the pathfinder', () =>
            it('is correct', () => expect(pathfinder.graph).toMatchSnapshot()));
        describe('and I get the shortest path between the user and the virus using their coordinates', () => {
            let shortestPath;
            beforeEach(() =>
                (shortestPath = pathfinder.findShortestPathByCoords({ row: 1, col: 1 }, { row: 4, col: 2 })));
            describe('the result', () =>
                it('is null (there is no path from user to virus)', () => expect(shortestPath).toBeNull()));
        });
    });
});
