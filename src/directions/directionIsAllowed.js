import { directionSwitchMap } from '.';

export default (tile, direction) => directionSwitchMap[tile].allowed.includes(direction);
