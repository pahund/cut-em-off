/* global kontra */

/**
 * A tile engine for rendering tilesets. Works well with the tile engine program Tiled.
 * @memberof kontra
 *
 * @param {object} properties - Properties of the tile engine.
 * @param {number} [properties.tileWidth=32] - Width of a tile.
 * @param {number} [properties.tileHeight=32] - Height of a tile.
 * @param {number} properties.width - Width of the map (in tiles).
 * @param {number} properties.height - Height of the map (in tiles).
 * @param {number} [properties.x=0] - X position to draw.
 * @param {number} [properties.y=0] - Y position to draw.
 * @param {number} [properties.sx=0] - X position to clip the tileset.
 * @param {number} [properties.sy=0] - Y position to clip the tileset.
 * @param {Context} [properties.context=kontra.context] - Provide a context for the tile engine to draw on.
 */
export default (properties = {}) => {
    if (process.env.NODE_ENV === 'development' && (!properties.width || !properties.height)) {
        throw Error('You must provide width and height properties');
    }

    const width = properties.width;
    const height = properties.height;

    // size of the tiles. Most common tile size on opengameart.org seems to be 32x32,
    // followed by 16x16
    // Tiled names the property tilewidth and tileheight
    const tileWidth = properties.tileWidth || 32;
    const tileHeight = properties.tileHeight || 32;

    const mapWidth = width * tileWidth;
    const mapHeight = height * tileHeight;

    const context = properties.context || kontra.context;
    const canvasWidth = context.canvas.width;
    const canvasHeight = context.canvas.height;

    // create an off-screen canvas for pre-rendering the map
    // @see http://jsperf.com/render-vs-prerender
    const offscreenCanvas = document.createElement('canvas');
    const offscreenContext = offscreenCanvas.getContext('2d');

    // when clipping an image, sx and sy must within the image region, otherwise
    // Firefox and Safari won't draw it.
    // @see http://stackoverflow.com/questions/19338032/canvas-indexsizeerror-index-or-size-is-negative-or-greater-than-the-allowed-a
    const sxMax = Math.max(0, mapWidth - canvasWidth);
    const syMax = Math.max(0, mapHeight - canvasHeight);

    let _sx, _sy;

    // draw order of layers (by name)
    const layerOrder = [];

    const tileEngine = {
        width,
        height,

        tileWidth,
        tileHeight,

        mapWidth,
        mapHeight,

        context,

        x: properties.x || 0,
        y: properties.y || 0,

        tilesets: [],
        layers: {},

        /**
         * Add an tileset for the tile engine to use.
         * @memberof kontra.tileEngine
         */
        addTilesets: function addTilesets(tilesets) {
            [].concat(tilesets).forEach(tileset => {
                const tilesetImage = tileset.image;
                let image, firstGrid, lastTileset, tiles;

                // @see https://github.com/jed/140bytes/wiki/Byte-saving-techniques#coercion-to-test-for-types
                if (`${tilesetImage}` === tilesetImage) {
                    let i = Infinity;

                    while (i >= 0) {
                        i = tilesetImage.lastIndexOf('/', i);
                        const path = i < 0 ? tilesetImage : tilesetImage.substr(i);

                        if (kontra.assets.images[path]) {
                            image = kontra.assets.images[path];
                            break;
                        }

                        i--;
                    }
                } else {
                    image = tilesetImage;
                }

                firstGrid = tileset.firstGrid;

                // if the width or height of the provided image is smaller than the tile size,
                // default calculation to 1
                const numTiles = ((image.width / tileWidth) | 0 || 1) * ((image.height / tileHeight) | 0 || 1);

                if (!firstGrid) {
                    // only calculate the first grid if the tile map has a tileset already
                    if (tileEngine.tilesets.length > 0) {
                        lastTileset = tileEngine.tilesets[tileEngine.tilesets.length - 1];
                        tiles =
                            ((lastTileset.image.width / tileWidth) | 0) * ((lastTileset.image.height / tileHeight) | 0);

                        firstGrid = lastTileset.firstGrid + tiles;
                    }
                    // otherwise this is the first tile added to the tile map
                    else {
                        firstGrid = 1;
                    }
                }

                tileEngine.tilesets.push({
                    firstGrid,
                    lastGrid: firstGrid + numTiles - 1,
                    image
                });

                // sort the tile map so we can perform a binary search when drawing
                tileEngine.tilesets.sort((a, b) => a.firstGrid - b.firstGrid);
            });
        },

        /**
         * Add a layer to the tile engine.
         * @memberof kontra.tileEngine
         */
        addLayers: function addLayers(layers) {
            [].concat(layers).forEach(layer => {
                // eslint-disable-next-line no-param-reassign
                layer.render = layer.render === undefined ? true : layer.render;

                let data, row, c, value;

                // flatten a 2D array into a single array
                if (Array.isArray(layer.data[0])) {
                    data = [];

                    // eslint-disable-next-line no-cond-assign
                    for (let r = 0; (row = layer.data[r]); r++) {
                        for (c = 0; c < width; c++) {
                            data.push(row[c] || 0);
                        }
                    }
                } else {
                    data = layer.data;
                }

                tileEngine.layers[layer.name] = {
                    data,
                    zIndex: layer.zIndex || 0,
                    render: layer.render
                };

                // merge properties of layer onto layer object
                for (const prop in layer.properties) {
                    if (layer.properties.hasOwnProperty(prop)) {
                        value = layer.properties[prop];

                        try {
                            value = JSON.parse(value);
                        } catch (e) {
                            /* intentionally empty */
                        }

                        tileEngine.layers[layer.name][prop] = value;
                    }
                }

                // only add the layer to the layer order if it should be drawn
                if (tileEngine.layers[layer.name].render) {
                    layerOrder.push(layer.name);

                    layerOrder.sort((a, b) => tileEngine.layers[a].zIndex - tileEngine.layers[b].zIndex);
                }
            });

            preRenderImage();
        },

        changeTile(layerId, position, tile) {
            const dataIndex = getIndex(position);
            const layer = tileEngine.layers[layerId];
            layer.data[dataIndex] = tile;
            renderTile(layer, dataIndex, true);
        },

        /**
         * Get the tile from the specified layer at x, y or row, col.
         * @memberof kontra.tileEngine
         *
         * @param {string} name - Name of the layer.
         * @param {object} position - Position of the tile in either x, y or row, col.
         * @param {number} position.x - X coordinate of the tile.
         * @param {number} position.y - Y coordinate of the tile.
         * @param {number} position.row - Row of the tile.
         * @param {number} position.col - Col of the tile.
         *
         * @returns {number}
         */
        tileAtLayer(name, position) {
            const index = getIndex(position);

            if (index >= 0) {
                return tileEngine.layers[name].data[index];
            }
            return undefined;
        },

        /**
         * Render the pre-rendered canvas.
         * @memberof kontra.tileEngine
         */
        render() {
            tileEngine.context.drawImage(
                offscreenCanvas,
                tileEngine.sx,
                tileEngine.sy,
                canvasWidth,
                canvasHeight,
                tileEngine.x,
                tileEngine.y,
                canvasWidth,
                canvasHeight
            );
        },

        /**
         * Render a specific layer.
         * @memberof kontra.tileEngine
         *
         * @param {string} name - Name of the layer to render.
         */
        renderLayer: function renderLayer(name) {
            const layer = tileEngine.layers[name];

            // calculate the starting tile
            let row = tileEngine.getRow();
            const col = tileEngine.getCol();
            let index = getIndex({ row, col });

            // calculate where to start drawing the tile relative to the drawing canvas
            const startX = col * tileWidth - tileEngine.sx;
            const startY = row * tileHeight - tileEngine.sy;

            // calculate how many tiles the drawing canvas can hold
            const viewWidth = Math.min(Math.ceil(canvasWidth / tileWidth) + 1, width);
            const viewHeight = Math.min(Math.ceil(canvasHeight / tileHeight) + 1, height);
            const numTiles = viewWidth * viewHeight;

            let count = 0;
            let x, y, tile, tileset, image, tileOffset, w, sx, sy;

            // draw just enough of the layer to fit inside the drawing canvas
            while (count < numTiles) {
                tile = layer.data[index];

                if (tile) {
                    tileset = getTileset(tile);
                    image = tileset.image;

                    x = startX + (count % viewWidth) * tileWidth;
                    y = startY + ((count / viewWidth) | 0) * tileHeight;

                    tileOffset = tile - tileset.firstGrid;
                    w = image.width / tileWidth;

                    sx = (tileOffset % w) * tileWidth;
                    sy = ((tileOffset / w) | 0) * tileHeight;

                    tileEngine.context.drawImage(image, sx, sy, tileWidth, tileHeight, x, y, tileWidth, tileHeight);
                }

                if (++count % viewWidth === 0) {
                    index = col + ++row * width;
                } else {
                    index++;
                }
            }
        },

        getRowAndCol({ x, y }) {
            return {
                row: this.getRow(y),
                col: this.getCol(x)
            };
        },

        getXAndY({ row, col, mapX, mapY }) {
            return {
                x: (col ? col * tileWidth : mapX) - tileEngine.sx + tileWidth / 2,
                y: (row ? row * tileHeight : mapY) - tileEngine.sy + tileHeight / 2
            };
        },

        /**
         * Get the row from the y coordinate.
         * @memberof kontra.tileEngine
         *
         * @param {number} y - Y coordinate.
         *
         * @return {number}
         */
        getRow(y = 0) {
            return ((tileEngine.sy + y) / tileHeight) | 0;
        },

        /**
         * Get the col from the x coordinate.
         * @memberof kontra.tileEngine
         *
         * @param {number} x - X coordinate.
         *
         * @return {number}
         */
        getCol(x = 0) {
            return ((tileEngine.sx + x) / tileWidth) | 0;
        },

        get sx() {
            return _sx;
        },

        get sy() {
            return _sy;
        },

        // ensure sx and sy are within the image region
        set sx(value) {
            _sx = Math.min(Math.max(0, value), sxMax);
        },

        set sy(value) {
            _sy = Math.min(Math.max(0, value), syMax);
        }
    };

    // set here so we use setter function
    tileEngine.sx = properties.sx || 0;
    tileEngine.sy = properties.sy || 0;

    // make the off-screen canvas the full size of the map
    offscreenCanvas.width = mapWidth;
    offscreenCanvas.height = mapHeight;

    // merge properties of the tile engine onto the tile engine itself
    for (const prop in properties.properties) {
        if (properties.properties.hasOwnProperty(prop)) {
            let value = properties.properties[prop];

            try {
                value = JSON.parse(value);
            } catch (e) {
                /* intentionally empty */
            }

            // passed in properties override properties.properties
            tileEngine[prop] = tileEngine[prop] || value;
        }
    }

    if (properties.tilesets) {
        tileEngine.addTilesets(properties.tilesets);
    }

    if (properties.layers) {
        tileEngine.addLayers(properties.layers);
    }

    /**
     * Get the index of the x, y or row, col.
     * @memberof kontra.tileEngine
     * @private
     *
     * @param {number} position.x - X coordinate of the tile.
     * @param {number} position.y - Y coordinate of the tile.
     * @param {number} position.row - Row of the tile.
     * @param {number} position.col - Col of the tile.
     *
     * @return {number} Returns the tile index or -1 if the x, y or row,
     *         col is outside the dimensions of the tile engine.
     */
    function getIndex(position) {
        let row, col;

        if (typeof position.x !== 'undefined' && typeof position.y !== 'undefined') {
            row = tileEngine.getRow(position.y);
            col = tileEngine.getCol(position.x);
        } else {
            row = position.row;
            col = position.col;
        }

        // don't calculate out of bound numbers
        if (row < 0 || col < 0 || row >= height || col >= width) {
            return -1;
        }

        return col + row * width;
    }

    /**
     * Modified binary search that will return the tileset associated with the tile
     * @memberof kontra.tileEngine
     * @private
     *
     * @param {number} tile - Tile grid.
     *
     * @return {object}
     */
    function getTileset(tile) {
        let min = 0;
        let max = tileEngine.tilesets.length - 1;
        let index, currTile;

        while (min <= max) {
            index = ((min + max) / 2) | 0;
            currTile = tileEngine.tilesets[index];

            if (tile >= currTile.firstGrid && tile <= currTile.lastGrid) {
                return currTile;
            } else if (currTile.lastGrid < tile) {
                min = index + 1;
            } else {
                max = index - 1;
            }
        }
        return undefined;
    }

    /**
     * Pre-render the tiles to make drawing fast.
     * @memberof kontra.tileEngine
     * @private
     */
    function preRenderImage() {
        // draw each layer in order
        // eslint-disable-next-line no-cond-assign
        for (let layerIndex = 0, layer; (layer = tileEngine.layers[layerOrder[layerIndex]]); layerIndex++) {
            for (let dataIndex = 0, len = layer.data.length; dataIndex < len; dataIndex++) {
                renderTile(layer, dataIndex);
            }
        }
    }

    function renderTile(layer, dataIndex, clear = false) {
        const tile = layer.data[dataIndex];

        // skip empty tiles (0)
        if (!tile) {
            return;
        }

        const tileset = getTileset(tile);
        const image = tileset.image;

        const x = (dataIndex % width) * tileWidth;
        const y = ((dataIndex / width) | 0) * tileHeight;

        const tileOffset = tile - tileset.firstGrid;
        const w = image.width / tileWidth;

        const sx = (tileOffset % w) * tileWidth;
        const sy = ((tileOffset / w) | 0) * tileHeight;

        if (clear) {
            offscreenContext.clearRect(x, y, tileWidth, tileHeight);
        }
        offscreenContext.drawImage(image, sx, sy, tileWidth, tileHeight, x, y, tileWidth, tileHeight);
    }

    return tileEngine;
};
