export default (arr, w, h, x, y) => {
    const retVal = [];
    let idx = 0;
    for (let row = 0; row < h + y * 2; row++) {
        for (let col = 0; col < w + x * 2; col++) {
            if (row < y || row >= y + h || col < x || col >= x + w) {
                retVal.push(0);
                continue;
            }
            retVal.push(arr[idx++]);
        }
    }
    return retVal;
};
