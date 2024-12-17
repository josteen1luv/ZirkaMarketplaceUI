import React from 'react';
import { Box, Typography } from '@mui/material';
import ProductsListItem from '../productsListItem/ProductsListItem.tsx';
import { Product } from '../../types/product.ts';
import { useGetMyProductsQuery } from '../../api/product/productApiSlice.ts';
import { useSelector } from 'react-redux';
import { selectId } from '../../api/user/userSlice.ts';

const ProductsList = () => {
    const { data } = useGetMyProductsQuery();
    const id = useSelector(selectId);
    const products = data?.items.filter((elem) => elem.userId === id);

    return (
        <>
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                Twoje towary
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 3,
                    alignItems: 'center',
                    width: 800,
                    borderRadius: 3,
                }}
            >
                {products &&
                    products.map((item: Product) => (
                        <ProductsListItem key={item.id} product={item} />
                    ))}
            </Box>
        </>
    );
};

export default ProductsList;
