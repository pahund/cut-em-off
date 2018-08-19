/* global kontra */

import { canvasHeight, canvasWidth, playerStartDirection } from '../config';
import { drawPlayer } from '.';

export default () =>
    kontra.sprite({
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        direction: playerStartDirection,
        render() {
            drawPlayer(this);
        }
    });
