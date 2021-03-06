import convertMapToGraph from './convertMapToGraph.js';

const map = {
    width: 4,
    height: 4,
    layers: {
        main: {
            // prettier-ignore
            data: [
                16,  6, 11,  2,
                 0,  3,  0,  3,
                 1,  4,  6, 10,
                 9, 11, 10,  0
            ]
        }
    }
};

describe('When I convert a map to a graph', () => {
    describe('the result', () => {
        let result;
        beforeEach(() => (result = convertMapToGraph(map, 'main')));
        it('is correct', () => expect(result).toMatchSnapshot());
    });
});
