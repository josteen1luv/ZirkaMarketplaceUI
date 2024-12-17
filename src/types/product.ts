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
    Name: string;
    Description: string;
    CategoryId: string;
    Price: number;
    PhotoUrl: Blob | string;
    AvailableAmount: number;
    UserId: string;
}
