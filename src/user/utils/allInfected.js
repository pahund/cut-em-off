import { INFECTED } from '../constants.js';

export default users => users.every(user => user.state === INFECTED);
