import React from 'react';

import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Product } from '../../types/Product.ts';
import { useGetSingleCategoryQuery } from '../../api/category/categoryApiSlice.ts';
import { Category } from '../../types/Category.ts';
import ProductsListItem from '../../features/productsListItem/ProductsListItem.tsx';

const CategoryPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data } = useGetSingleCategoryQuery(id as string);
    const category: Category | undefined | null = data;
    return (
        <Container
            maxWidth={'xl'}
            sx={{
                minHeight: '100vh',
                height: 'auto',
                pt: { xs: 9, sm: 10 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 0, md: 2 },
            }}
        >
            {!category ? (
                <CircularProgress />
            ) : (
                <>
                    <Typography
                        variant={'h2'}
                        textAlign="center"
                        sx={{
                            marginBottom: 1,
                        }}
                    >
                        {`${category.name}`}
                    </Typography>
                    <Box>
                        <img
                            src={`${category.photoUrl}`}
                            alt="Placeholder"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </Box>
                    <Typography
                        variant={'h4'}
                        color={'text.secondary'}
                        textAlign="center"
                        sx={{
                            marginBottom: 1,
                        }}
                    >
                        {`${category.description}`}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            maxWidth: {
                                custom575: 528,
                                sm: 526,
                                md: 800,
                                lg: 1122,
                                xl: 1400,
                            },
                            gap: 3,
                            justifyContent: {
                                xs: 'center',
                                custom575: 'flex-start',
                            },
                            flexWrap: 'wrap',
                        }}
                    >
                        {!category.products ? (
                            <CircularProgress />
                        ) : (
                            category.products.map((product: Product) => (
                                <ProductsListItem
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        )}
                    </Box>
                </>
            )}
        </Container>
    );
};

export default CategoryPage;
