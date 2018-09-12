// exported for testing
export class Pubsub {
    constructor() {
        this.subscribers = [];
    }
    subscribe(message, callback, permanent = false) {
        this.subscribers.push({ message, callback, permanent });
    }
    reset() {
        this.subscribers = this.subscribers.filter(({ permanent }) => permanent);
    }
    publish(incomingMessage, payload) {
        this.subscribers.forEach(({ message, callback }) => message === incomingMessage && callback(payload));
    }
}

export default new Pubsub();
