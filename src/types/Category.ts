import { Product } from './Product.ts';

export type Category = {
    id: string;
    name: string;
    description: string;
    photoUrl: string;
    products?: Product[];
};
