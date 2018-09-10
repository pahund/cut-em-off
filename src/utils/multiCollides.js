import { collides } from './index.js';

export default (arr1, arr2) => {
    const collisions = [];
    for (let i1 = 0; i1 < arr1.length; i1++) {
        const sprite1 = arr1[i1];
        for (let i2 = 0; i2 < arr2.length; i2++) {
            const sprite2 = arr2[i2];
            if (collides(sprite1, sprite2)) {
                collisions.push([sprite1, sprite2]);
            }
        }
    }
    return collisions;
};
