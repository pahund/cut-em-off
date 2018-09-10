export default (arr, w, h, pad) => {
    const retVal = [];
    let idx = 0;
    for (let row = 0; row < h + pad * 2; row++) {
        for (let col = 0; col < w + pad * 2; col++) {
            if (row < pad || row >= pad + h || col < pad || col >= pad + w) {
                retVal.push(0);
                continue;
            }
            retVal.push(arr[idx++]);
        }
    }
    return retVal;
};
