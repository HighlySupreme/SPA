import {JsonService} from "src/services/json.service";

export const RestService = {
    getUsers: () => JsonService.get(`users`),

    getPosts: () => JsonService.get(`posts`),

    getPost: (id: number) => JsonService.get(`posts/${id}`),

    updatePost: (post: Post) => JsonService.put(`posts/${post.id}`, post),

    deletePost: (id: number) => JsonService.delete(`posts/${id}`),

    createPost: (post: Post) => JsonService.post(`posts`, post)
};
