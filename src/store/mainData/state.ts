import { loadFromStorage } from 'src/helper/localStorage';
export interface State {
    isLoggedIn: boolean;
    username: string;
    users: User[];
    posts: Post[];
}

const state: State = {
    isLoggedIn: loadFromStorage('isLoggedIn') || false,
    username: loadFromStorage('username') || '',
    users: [],
    posts: []
};

export default state;
