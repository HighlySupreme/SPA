import store  from 'src/store'

// Dummy credentials
const DUMMY_USERNAME = 'admin'
const DUMMY_PASSWORD = 'admin123'

export async function login(username: string, password: string): Promise<boolean> {
    //To simulate a delay like a real server request
    await new Promise(resolve => setTimeout(resolve, 500))

    if (username === DUMMY_USERNAME && password === DUMMY_PASSWORD) {
        await store.dispatch('logIn', { username });
        return Promise.resolve(true)
    } else {
        return Promise.resolve(false)
    }
}
