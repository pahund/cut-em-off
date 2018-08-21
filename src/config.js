import { N, W } from './directions';

export const canvasWidth = 800;
export const canvasHeight = 600;
export const tileWidth = 100;
export const tileHeight = 100;
export const mapWidth = 20;
export const mapHeight = 20;
export const mapPaddingX = 4;
export const mapPaddingY = 3;

/* player */
export const playerStartCol = 5;
export const playerStartRow = 6;
export const playerStartDirection = N;
export const playerSpeed = 5;

/* virus */
export const virusStartCol = 5;
export const virusStartRow = 4;
export const virusStartDirection = W;
export const virusSpeed = 2.5;

/* colors */
export const lightGreen = '#75a042';
export const darkGreen = '#365b1d';
export const lightBlue = '#52638a';
// export const darkBlue = '#2b3653';
export const lightRed = '#cd3926';
export const darkRed = '#7a2431';

export const collisionRadius = 30;
