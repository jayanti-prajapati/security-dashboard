import { Action, Thunk, action, createStore, thunk } from "easy-peasy";
import { getDashboardData, getProducts } from "../services";
import { ProductData } from "./model";

export interface Item {
    id: string,
    title: string
}
interface BaseModel {
    isLoading: boolean;
    setIsLoading: Action<BaseModel, true | false>
}
export interface DashboardModel extends BaseModel {
    items: ProductData[];

    fetched: Action<DashboardModel, ProductData[]>;
    fetch: Thunk<DashboardModel>
}

export const store = createStore<DashboardModel>({
    items: [],
    isLoading: false,
    fetched: action((state, items) => {
        state.items = items;
    }),
    setIsLoading: action((state, payload) => {
        state.isLoading = payload;
    }),
    fetch: thunk(async (actions, undefined, { getStoreState }) => {
        actions.setIsLoading(true);
        const products = await getProducts();
        const data: ProductData[] = await getDashboardData(products.find((x: any) => x.title == "AD_Products").id);

        actions.setIsLoading(false);
        actions.fetched(data);
    })
})