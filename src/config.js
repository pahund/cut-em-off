import { S, E } from './directions/index.js';

export const canvasWidth = 800;
export const canvasHeight = 600;

/* map */
export const tileWidth = 100;
export const tileHeight = 100;
export const mapWidth = 20;
export const mapHeight = 20;
export const mapPadding = 4;

/* player */
export const playerStartCol = 8;
export const playerStartRow = 9;
export const playerStartDirection = S;
export const playerSpeed = 5;

/* virus */
export const virusStartCol = 8;
export const virusStartRow = 7;
export const virusStartDirection = E;
export const virusSpeed = 2.5;
export const virusBlipInterval = 1000;
export const virusBlipTtl = 180;

/* colors */
export const lightGreen = '#75a042';
export const darkGreen = '#365b1d';
export const lightBlue = '#52638a';
export const darkBlue = '#2b3653';
export const lightRed = '#cd3926';
export const darkRed = '#7a2431';

export const collisionRadius = 30;
export const bombCooldown = 100;
export const teleportCooldownTimeout = 600;
