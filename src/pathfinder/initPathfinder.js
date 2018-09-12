import { pathfinder } from './index.js';
import { pubsub, MAP_CHANGED } from '../pubsub/index.js';

// permanent subscription OK here
export default () => pubsub.subscribe(MAP_CHANGED, changedMap => pathfinder.setDataFromMap(changedMap, 'main'), true);
