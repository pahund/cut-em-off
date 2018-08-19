/* global kontra */

import { N, E, S, W } from '../../directions';

export default () => {
    if (kontra.keys.pressed('right')) {
        return E;
    }
    if (kontra.keys.pressed('left')) {
        return W;
    }
    if (kontra.keys.pressed('up')) {
        return N;
    }
    if (kontra.keys.pressed('down')) {
        return S;
    }
    return null;
};
