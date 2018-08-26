export default ({ sx, sy, tileWidth, tileHeight }) => ({
    col: Math.floor(sx / tileWidth) + 1,
    row: Math.floor(sy / tileHeight) + 1
});
