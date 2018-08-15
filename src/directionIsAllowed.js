import directionSwitchMap from './directionSwitchMap';

export default (tile, direction) => directionSwitchMap[tile].allowed.includes(direction);
