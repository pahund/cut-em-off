import { N, E, S, W } from '.';

export default {
    // curve from S to E
    1: {
        allowed: [S, E],
        change: {
            [N]: E,
            [W]: S
        }
    },
    // curve from W to S
    2: {
        allowed: [W, S],
        change: {
            [N]: W,
            [E]: S
        }
    },
    // straight from N to S
    3: {
        allowed: [N, S],
        change: {}
    },
    // T section W, N, E
    4: {
        allowed: [W, N, E],
        change: {
            [S]: N
        }
    },
    // T section N, E, S
    5: {
        allowed: [N, E, S],
        change: {
            [W]: E
        }
    },
    // T section W, E, S
    6: {
        allowed: [W, E, S],
        change: {
            [N]: S
        }
    },
    // curve from N to E
    9: {
        allowed: [N, E],
        change: {
            [S]: E,
            [W]: N
        }
    },
    // curve from W to N
    10: {
        allowed: [W, N],
        change: {
            [E]: N,
            [S]: W
        }
    },
    // straight from W to E
    11: {
        allowed: [W, E],
        change: {}
    },
    // crossing
    12: {
        allowed: [N, E, S, W],
        change: {}
    },
    // T section N, S, W
    13: {
        allowed: [N, S, W],
        change: {
            [E]: W
        }
    },
    // server
    14: {
        allowed: [N, S],
        change: {}
    },
    // terminus S
    17: {
        allowed: [S],
        change: {
            [N]: S
        }
    },
    // terminus W
    18: {
        allowed: [W],
        change: {
            [E]: W
        }
    },
    // terminus N
    19: {
        allowed: [N],
        change: {
            [S]: N
        }
    },
    // terminus E
    20: {
        allowed: [E],
        change: {
            [W]: E
        }
    },
    // broken server
    38: {
        allowed: [N, S],
        change: {}
    }
};
