// exported for testing
export class Pubsub {
    constructor() {
        this.subscribers = [];
    }
    subscribe(message, callback) {
        this.subscribers.push({ message, callback });
    }
    reset(messageToBeReset, callback = null) {
        this.subscribers = this.subscribers.filter(({ message }) => message !== messageToBeReset);
        if (callback) {
            this.subscribe(messageToBeReset, callback);
        }
    }
    publish(incomingMessage, payload) {
        this.subscribers.forEach(({ message, callback }) => message === incomingMessage && callback(payload));
    }
}

export default new Pubsub();
