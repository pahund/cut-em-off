import data from './data.js';
import mapHex2Arr from './mapHex2Arr.js';

export default levelIndex => {
    const level = data[levelIndex];
    return {
        ...level,
        map: {
            ...level.map,
            data: mapHex2Arr(level.map.data)
        }
    };
};
