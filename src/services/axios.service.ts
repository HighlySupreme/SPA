import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com';


const getBaseUrl = (rest: boolean, u?: string): string => {
    if (u) {
        return process.env.APP_REST_HOST + "/" + u;
    }
    return baseURL;
};

const axiosRequest = async <T>(
    method: string,
    uri: string,
    data?: any,
    headers?: any,
    rest = false
): Promise<T> => {
    const requestConfig: AxiosRequestConfig = {
        baseURL: getBaseUrl(rest),
        method,
        url: uri,
        headers: headers,
        data,
    };

    try {
        const response: AxiosResponse<T> = await axios(requestConfig);
        return response.data;
    } catch (error) {
        console.error('Request failed:', error);
        throw error;
    }
};

export default {
    async GET<T>(uri: string, params?: any, headers?: any, rest = false): Promise<T> {
        return axiosRequest<T>('GET', uri, undefined, { params, ...headers }, rest);
    },

    async POST<T>(uri: string, data?: any, headers?: any, rest = false): Promise<T> {
        return axiosRequest<T>('POST', uri, data, headers, rest);
    },

    async PUT<T>(uri: string, data?: any, headers?: any, rest = false): Promise<T> {
        return axiosRequest<T>('PUT', uri, data, headers, rest);
    },

    async DELETE<T>(uri: string, data?: any, headers?: any, rest = false): Promise<T> {
        return axiosRequest<T>('DELETE', uri, undefined, { data, ...headers }, rest);
    },

    async PATCH<T>(uri: string, data?: any, rest = false): Promise<T> {
        return axiosRequest<T>('PATCH', uri, data, undefined, rest);
    },
};
