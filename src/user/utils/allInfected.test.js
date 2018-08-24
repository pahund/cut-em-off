import allInfected from './allInfected';
import { INFECTED } from '../constants';

describe('When I call the “allInfected” function', () => {
    describe('and only one user is infected', () =>
        describe('the result', () => {
            let result;
            beforeEach(() => (result = allInfected([{ state: INFECTED }, { state: 'foo' }])));
            it('is “false”', () => expect(result).toEqual(false));
        }));
    describe('and all users are infected', () =>
        describe('the result', () => {
            let result;
            beforeEach(() => (result = allInfected([{ state: INFECTED }, { state: INFECTED }])));
            it('is “true”', () => expect(result).toEqual(true));
        }));
});
