import { INFECTED } from '../constants';

export default users => users.every(user => user.state === INFECTED);
