import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import DashBoardShippingItem from './DashBoardShippingItem.tsx';
import { useGetShippingByBuyerQuery } from '../../api/shipping/shippingApiSlice.ts';
import { selectId } from '../../api/user/userSlice.ts';
import { useSelector } from 'react-redux';
import { Shipping } from '../../types/Shipping.ts';

const DashBoardShippingBought = () => {
    const id = useSelector(selectId);
    const { data } = useGetShippingByBuyerQuery(id as string);
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
                Sprawdź status kupionych towarów
            </Typography>
            {purchases.map((e: Shipping) => (
                <DashBoardShippingItem
                    key={e.product.id}
                    shipping={e}
                    action={'buy'}
                />
            ))}
        </Box>
    );
};

export default DashBoardShippingBought;
