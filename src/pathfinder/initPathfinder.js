import { pathfinder } from '.';
import { pubsub, MAP_CHANGED } from '../pubsub';

export default map => {
    pathfinder.setDataFromMap(map, 'main');
    pubsub.subscribe(MAP_CHANGED, changedMap => pathfinder.setDataFromMap(changedMap, 'main'));
};
