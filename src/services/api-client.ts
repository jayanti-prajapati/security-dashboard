import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig } from "axios";
// import {
//     Forbidden,
//     HttpError,
//     Unauthorized
// } from '../errors';
// import { Headers } from "../types";

export class ApiClient {
    constructor(
        private readonly baseUrl: string,
        private readonly headers: AxiosHeaders,
        private readonly authToken: string = ""
    ) { }


    private login = async () => {
        const data = await this.post('/api/v2.0/login', {
            email: process.env.email ?? "",
            orgToken: process.env.orgToken ?? "",
            userKey: process.env.userKey ?? "",
        });
        return data.retVal.jwtToken;
    }
    private getJwt = async () => {
        let jwt = localStorage.getItem("jwt");
        if (!jwt) {
            jwt = await this.login();
            if (jwt) {
                localStorage.setItem('jwt', jwt);
            }
            return jwt;
        }
        return new Promise((resolve, reject) => {
            return resolve(jwt);
        });
    }
    public async get(endpoint: string = "", params?: any, signal?: AbortSignal): Promise<any> {
        try {
            const client = this.createClient(params);
            const response = await client.get(endpoint, { signal });
            return response.data;
        } catch (error: any) {
            this.handleError(error);
        }
    }

    public async post(endpoint: string = "", data?: any, signal?: AbortSignal): Promise<any> {
        try {
            const client = this.createClient();
            const response = await client.post(endpoint, data, { signal });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    public async uploadFile(endpoint: string = "", formData: FormData): Promise<any> {
        try {
            const client = this.createClient();
            const response = await client.post(endpoint, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    private createClient(params: object = {}): AxiosInstance {
        const config: AxiosRequestConfig = {
            baseURL: this.baseUrl,
            headers: this.headers,
            params: params
        }
        if (this.authToken) {
            config.headers = {
                Authorization: `Bearer ${this.authToken}`,
            }
        }
        return axios.create(config);
    }

    private handleError(error: any): never {
        // if (error.response.status) {
        //     this.getJwt();
        // }
        // if (!error.response) {
        //     throw new HttpError(error.message)
        // } else if (error.response.status === 401) {
        //     throw new Unauthorized(error.response.data);
        // } else if (error.response.status === 403) {
        //     throw new Forbidden(error.response.data);
        // } else {
        //     throw error
        // }

        throw error;
    }
}