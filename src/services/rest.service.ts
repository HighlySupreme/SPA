import AxiosService from "src/services/axios.service";

const getUsers = (): Promise<User> => {
    return AxiosService.GET(`users`);
}

const getPost = (id: number): Promise<Post> => {
    return AxiosService.GET(`posts/${id}`);
}

const getPosts = (): Promise<Post> => {
    return AxiosService.GET(`posts`);
}

const updatePost = (post: Post) => {
    return AxiosService.PUT(`posts/${post.id}`, post);
}

const deletePost = (id: number) => {
    return AxiosService.DELETE(`posts/${id}`);
}

const createPost = (post: Post) => {
    return AxiosService.POST(`posts`, post);
}


export const RestService = {
    getUsers,
    getPost,
    getPosts,
    updatePost,
    deletePost,
    createPost
};
