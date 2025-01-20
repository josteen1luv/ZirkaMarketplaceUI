import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import DashBoardShippingItem from './DashBoardShippingItem.tsx';
import { useSelector } from 'react-redux';
import { selectId } from '../../api/user/userSlice.ts';
import { useGetShippingBySellerQuery } from '../../api/shipping/shippingApiSlice.ts';
import { Shipping } from '../../types/Shipping.ts';

const DashBoardShippingSold = () => {
    const id = useSelector(selectId);
    const { data } = useGetShippingBySellerQuery(id as string);
    const purchases: Shipping[] | undefined = data;

    if (!purchases) {
        return (
            <Box
                sx={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                Zarządzaj sprzedanymi towarami
            </Typography>
            {purchases.map((e: Shipping) => (
                <DashBoardShippingItem
                    key={e.product.id}
                    shipping={e}
                    action={'sell'}
                />
            ))}
        </Box>
    );
};

export default DashBoardShippingSold;
