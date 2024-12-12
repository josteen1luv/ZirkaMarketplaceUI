import React from 'react';
import { Box, Divider } from '@mui/material';
import AddProductForm from '../../features/addProductForm/AddProductForm.tsx';
import ProductsList from '../../features/productsList/ProductsList.tsx';

const DashBoardProducts = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: { xs: 0, md: 2 },
            }}
        >
            <Box>
                <ProductsList />
            </Box>
            <Divider
                orientation="vertical"
                variant="middle"
                sx={{ bgcolor: 'primary.main' }}
                flexItem
            />
            <Box>
                <AddProductForm />
            </Box>
        </Box>
    );
};

export default DashBoardProducts;
