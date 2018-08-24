import Pubsub from './Pubsub';

const message = 'foo';
const payload = 'bar';
const callback = jest.fn();

describe('When I create a Pubsub', () => {
    let pubsub;
    beforeEach(() => (pubsub = new Pubsub()));
    describe('and I subscribe for a message', () => {
        beforeEach(() => pubsub.subscribe(message, callback));
        describe('and I publish the message', () => {
            beforeEach(() => pubsub.publish(message, payload));
            describe("the subscriber's callback function", () => {
                it('is called with the payload data of the message', () => expect(callback).toBeCalledWith(payload));
            });
        });
    });
});
