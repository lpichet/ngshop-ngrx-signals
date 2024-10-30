import { Product } from "./product.model";

export interface Cart {
    id: number;
    items: ItemLines[];
}

export interface ItemLines {
    product: Product;
    quantity: number;
}