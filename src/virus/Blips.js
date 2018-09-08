import { virusBlipInterval } from '../config';
import { createBlip } from '.';

export default class {
    constructor() {
        this.blips = [];
    }

    start(virus) {
        setInterval(() => {
            this.blips.push(createBlip({ x: virus.x, y: virus.y }));
        }, virusBlipInterval);
    }
    update() {
        this.blips.forEach(blip => blip.update());
        this.blips = this.blips.filter(blip => blip.ttl > 0);
    }
    render() {
        this.blips.forEach(blip => blip.render());
    }
}
