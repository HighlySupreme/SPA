// Deprecated; now using AXIOS.service for making REST-ful requests

const baseUrl = 'https://jsonplaceholder.typicode.com';

export const JsonService = {
    async get(relativeUrl: string) {
        const response = await fetch(`${baseUrl}/${relativeUrl}`);
        return response.json();
    },

    async post(relativeUrl: string, data: any) {
        const response = await fetch(`${baseUrl}/${relativeUrl}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    async put(relativeUrl: string, data: any) {
        const response = await fetch(`${baseUrl}/${relativeUrl}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    async delete(relativeUrl: string) {
        const response = await fetch(`${baseUrl}/${relativeUrl}`, { method: 'DELETE' });
        return response.json();
    },
};
