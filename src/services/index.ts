import { AxiosHeaders } from "axios"
import { ApiClient } from "./api-client"
import { ProductData } from "../store/model";

const baseUrl = process.env.baseUrl ?? "";

const login = async () => {
    const apiClient = new ApiClient(baseUrl, new AxiosHeaders());
    const data = await apiClient.post('/api/v2.0/login', {
        email: process.env.email ?? "",
        orgToken: process.env.orgToken ?? "",
        userKey: process.env.userKey ?? "",
    });
    return data.retVal.jwtToken;
}

const getJwt = async () => {
    let jwt = localStorage.getItem("jwt") as string;
    if (!jwt) {
        jwt = await login();
        if (jwt) {
            localStorage.setItem('jwt', jwt);
        }
        return jwt;
    }
    return new Promise((resolve, reject) => {
        return resolve(jwt);
    });
}

export const getProducts = async () => {
    const jwt = await getJwt();
    const apiClient = new ApiClient(baseUrl, new AxiosHeaders(), jwt as string);
    const data = await apiClient.get(`/api/v2.0/orgs/${process.env.orgToken}/products?pageSize=50&page=0`);
    return data.retVal.map((x: any) => {
        return { title: x.name, id: x.uuid }
    });
}

export const getDashboardData = async (productId: string) => {
    const jwt = await getJwt();
    const apiClient = new ApiClient(baseUrl, new AxiosHeaders(), jwt as string);
    const data = await apiClient.get(`/api/v2.0/products/${productId}/alerts/security?pageSize=50&page=0&search=&sort=&optionalColumns=integration`);
    return data.retVal as ProductData[];
}
