export default class {
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
