import { OrderProduct } from "./orderProduct";

export interface OrderResponse {
    userId: number;
    client: string;
    products: OrderProduct[];
    status: string;
    dateEntry?: string;
    id?: number
}