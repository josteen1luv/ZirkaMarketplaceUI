import React from 'react';
import { Box, Typography } from '@mui/material';
import ProductsListItem from '../productsListItem/ProductsListItem.tsx';
import { Product } from '../../types/Product.ts';
import { useGetMyProductsQuery } from '../../api/product/productApiSlice.ts';
import { useSelector } from 'react-redux';
import { selectId } from '../../api/user/userSlice.ts';

const ProductsList = () => {
    const { data } = useGetMyProductsQuery();
    const id = useSelector(selectId);
    const products = data?.items.filter((elem) => elem.userId === id);

    return (
        <>
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
            >
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                    Twoje towary
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        borderRadius: 3,
                    }}
                >
                    {products &&
                        products.map((item: Product) => (
                            <ProductsListItem key={item.id} product={item} />
                        ))}
                </Box>
            </Box>
        </>
    );
};

export default ProductsList;
