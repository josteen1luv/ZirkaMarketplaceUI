import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import { useGetSingleProductQuery } from '../../api/product/productApiSlice.ts';
import { Product } from '../../types/Product.ts';
import SingleProductItem from './SingleProductItem.tsx';

const SingleProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const { isLoading, data } = useGetSingleProductQuery(id as string);
    const product: Product | undefined | null = data;

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }
    if (!product) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Typography variant="h4" component="h2">
                    Product not found
                </Typography>
            </Box>
        );
    }

    return (
        <Container
            maxWidth={'lg'}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <SingleProductItem product={product} />
        </Container>
    );
};

export default SingleProductPage;
