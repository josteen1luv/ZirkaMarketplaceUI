import React from 'react';
import { Box, Typography } from '@mui/material';
import { Product } from '../../types/Product.ts';
import DashBoardShippingItem from './DashBoardShippingItem.tsx';

const DashBoardShippingSold = () => {
    const products: Product[] = [
        {
            id: '222',
            name: '123456789012345',
            photoUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nzY-ddC6PcaerdlhR15HzGVdop_PO6Px9A&s',
            availableAmount: 1,
            description: '222222222',
            price: 4444,
            rating: 5,
            userId: '2222',
            status: 1,
        },
        {
            id: '222',
            name: '123456789012345',
            photoUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4nzY-ddC6PcaerdlhR15HzGVdop_PO6Px9A&s',
            availableAmount: 1,
            description: '222222222',
            price: 4444,
            rating: 5,
            userId: '2222',
            status: 0,
        },
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                Zarządzaj sprzedanymi towarami
            </Typography>
            {products.map((e) => (
                <DashBoardShippingItem key={e.id} product={e} action={'sell'} />
            ))}
        </Box>
    );
};

export default DashBoardShippingSold;
