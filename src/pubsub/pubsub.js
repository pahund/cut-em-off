// exported for testing
export class Pubsub {
    constructor() {
        this.subscribers = [];
    }
    subscribe(message, callback) {
        this.subscribers.push({ message, callback });
    }
    publish(incomingMessage, payload) {
        this.subscribers.forEach(({ message, callback }) => message === incomingMessage && callback(payload));
    }
}

export default new Pubsub();
