import { data } from './index.js';

class Levels {
    getLevel(levelIndex) {
        return data[levelIndex];
    }
}

export default new Levels();
