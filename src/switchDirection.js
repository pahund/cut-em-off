import directionSwitchMap from './directionSwitchMap';

export default (tile, curr) => directionSwitchMap[tile][curr] || curr;

