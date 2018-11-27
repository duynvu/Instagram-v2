import { getUser as findUserByUsername} from 'services/user.js';

export async function getUser(username) {
    const user = findUserByUsername(username);
    //do sth
    return user;
}
