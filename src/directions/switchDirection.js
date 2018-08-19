import { directionSwitchMap } from '.';

export default (tile, curr) => directionSwitchMap[tile].change[curr] || curr;
