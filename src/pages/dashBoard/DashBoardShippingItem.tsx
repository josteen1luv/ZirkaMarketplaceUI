import React from 'react';
import { Product } from '../../types/Product.ts';
import DashBoardShippingStepper from './DashBoardShippingStepper.tsx';
import { Box, Button, CardMedia, Typography } from '@mui/material';

const DashBoardShippingItem = ({
    product,
    action,
}: {
    product: Product;
    action: 'buy' | 'sell';
}) => {
    const handleShipping = () => {};
    const handleGettingOrder = () => {};
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box sx={{ display: 'flex', flexGrow: 1, gap: 2 }}>
                <CardMedia
                    component="img"
                    image={
                        product.photoUrl || 'https://via.placeholder.com/200'
                    }
                    alt={product.name}
                    sx={{
                        width: { xs: 100, sm: 100 },
                        height: { xs: 100, sm: 100 },
                        borderRadius: 2,
                        objectFit: 'contain',
                    }}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                    }}
                >
                    <Typography variant="h5" component="h1">
                        {product.name}
                    </Typography>
                    <Typography variant="subtitle1" noWrap>
                        Iłość: {product.availableAmount}
                    </Typography>
                </Box>
            </Box>
            <DashBoardShippingStepper status={product.status} />
            <Button
                disabled={
                    (action === 'buy' && product.status !== 1) ||
                    (action === 'sell' && product.status !== 0)
                }
                color={'secondary'}
                variant={'contained'}
                sx={{ width: 200, height: 48 }}
            >
                {action === 'buy' ? 'Potwierdź otrzymanie' : 'Wyślij towar'}
            </Button>
        </Box>
    );
};

export default DashBoardShippingItem;
