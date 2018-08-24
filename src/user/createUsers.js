import { createUser } from '.';
import { mapHeight, mapWidth, mapPaddingX, mapPaddingY } from '../config';
import { multiCollides } from '../utils';
import { allInfected } from './utils';

export default map => {
    const users = [];
    for (let row = 1; row <= mapHeight + mapPaddingY * 2; row++) {
        for (let col = 1; col <= mapWidth + mapPaddingX * 2; col++) {
            const tile = map.tileAtLayer('main', { row, col });
            if (tile >= 17 && tile <= 20) {
                users.push(createUser({ map, row: row - mapPaddingY + 1, col: col - mapPaddingX + 1 }));
            }
        }
    }
    return {
        update() {
            users.forEach(user => user.update());
        },
        render() {
            users.forEach(user => user.render());
        },
        infect(viruses, messageBox) {
            const userVirusCollisions = multiCollides(users, viruses);
            if (userVirusCollisions.length === 0) {
                return;
            }
            if (allInfected(users)) {
                messageBox.show('all users infected<br>game over');
                return;
            }
            messageBox.flash('user infected!');
            userVirusCollisions.forEach(([user]) => user.infect());
        }
    };
};
