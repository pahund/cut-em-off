import { gameManager } from './gameManager/index.js';

// will be removed by tree shaking
import createDevbox from './devbox/createDevbox.js';
if (process.env.NODE_ENV === 'development') {
    createDevbox();
}

(async () => {
    await gameManager.init();
    gameManager.showStartScreen();
    // gameManager.startLevel();
})();
