import { pathfinder } from './index.js';
import { pubsub, MAP_CHANGED } from '../pubsub/index.js';

export default () => pubsub.subscribe(MAP_CHANGED, changedMap => pathfinder.setDataFromMap(changedMap, 'main'));
