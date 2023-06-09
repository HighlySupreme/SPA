export interface State {
    isLogin: boolean;
    username: string;
    users: User[];
}

const state: State = {
    isLogin: false,
    username: '',
    users: []
};

export default state;
