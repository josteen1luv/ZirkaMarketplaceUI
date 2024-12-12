export type Product = {
    id: string;
    name: string;
    description: string;
    rating: number;
    price: number;
    photoUrl: string;
    availableAmount: number;
    userId: string;
};

export interface ProductForm {
    name: string;
    description: string;
    price: number;
    photoUrl: string;
    availableAmount: number;
}
