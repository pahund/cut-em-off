import directions from './directions';

export default {
    // curve from S to E
    1: {
        [directions.N]: directions.E,
        [directions.E]: null,
        [directions.S]: null,
        [directions.W]: directions.S
    },
    // curve from W to S
    2: {
        [directions.N]: directions.W,
        [directions.E]: directions.S,
        [directions.S]: null,
        [directions.W]: null
    },
    // straight from N to S
    3: {
        [directions.N]: null,
        [directions.E]: null,
        [directions.S]: null,
        [directions.W]: null
    },
    // T section W, N, E
    4: {
        [directions.N]: null,
        [directions.E]: null,
        [directions.S]: directions.N,
        [directions.W]: null
    },
    // T section N, E, S
    5: {
        [directions.N]: null,
        [directions.E]: null,
        [directions.S]: null,
        [directions.W]: directions.E
    },
    // T section W, E, S
    6: {
        [directions.N]: directions.S,
        [directions.E]: null,
        [directions.S]: null,
        [directions.W]: null
    },
    // curve from N to E
    9: {
        [directions.N]: null,
        [directions.E]: null,
        [directions.S]: directions.E,
        [directions.W]: directions.N
    },
    // curve from W to N
    10: {
        [directions.N]: null,
        [directions.E]: directions.N,
        [directions.S]: directions.W,
        [directions.W]: null
    },
    // straight from W to E
    11: {
        [directions.N]: null,
        [directions.E]: null,
        [directions.S]: null,
        [directions.W]: null
    },
    // crossing
    12: {
        [directions.N]: null,
        [directions.E]: null,
        [directions.S]: null,
        [directions.W]: null
    },
    // T section N, S, W
    13: {
        [directions.N]: null,
        [directions.E]: directions.W,
        [directions.S]: null,
        [directions.W]: null
    },
    // player start
    14: {
        [directions.N]: null,
        [directions.E]: null,
        [directions.S]: null,
        [directions.W]: null
    },
    // terminus S
    17: {
        [directions.N]: directions.S,
        [directions.E]: null,
        [directions.S]: null,
        [directions.W]: null
    },
    // terminus W
    18: {
        [directions.N]: null,
        [directions.E]: directions.W,
        [directions.S]: null,
        [directions.W]: null
    },
    // terminus N
    19: {
        [directions.N]: null,
        [directions.E]: null,
        [directions.S]: directions.N,
        [directions.W]: null
    },
    // terminus E
    20: {
        [directions.N]: null,
        [directions.E]: null,
        [directions.S]: null,
        [directions.W]: directions.E
    }
};
