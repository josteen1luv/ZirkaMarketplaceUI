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
    category: Categories;
    price: number;
    photoUrl: string;
    availableAmount: number;
}
export type Categories = 0 | 1;