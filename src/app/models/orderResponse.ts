import { OrderProduct } from "./orderProduct";

export interface OrderResponse{

    "id": number;
    "userId": number;
    "client": string;
    "products": OrderProduct [];
}