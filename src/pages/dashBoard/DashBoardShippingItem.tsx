import React from 'react';
import DashBoardShippingStepper from './DashBoardShippingStepper.tsx';
import { Box, Button, CardMedia, Typography } from '@mui/material';
import { Shipping } from '../../types/Shipping.ts';
import { useUpdateShippingStatusMutation } from '../../api/shipping/shippingApiSlice.ts';
import { Link } from 'react-router-dom';

const DashBoardShippingItem = ({
    shipping,
    action,
}: {
    shipping: Shipping;
    action: 'buy' | 'sell';
}) => {
    const product = shipping.product;
    const [update] = useUpdateShippingStatusMutation();
    const handleShipping = () => {
        update({
            purchaseId: shipping.id,
            status: 1,
        });
    };
    const handleGettingOrder = () => {
        update({
            purchaseId: shipping.id,
            status: 2,
        });
    };
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Link to={`/products/${product.id}`}>
                {' '}
                <Box sx={{ display: 'flex', flexGrow: 1, gap: 2 }}>
                    <CardMedia
                        component="img"
                        image={
                            product.photoUrl ||
                            'https://via.placeholder.com/200'
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
                            Iłość: {shipping.quantity}
                        </Typography>
                    </Box>
                </Box>
            </Link>

            <DashBoardShippingStepper status={shipping.status} />
            <Button
                disabled={
                    (action === 'buy' && shipping.status !== 1) ||
                    (action === 'sell' && shipping.status !== 0)
                }
                color={'secondary'}
                variant={'contained'}
                sx={{ width: 200, height: 48 }}
                onClick={action === 'buy' ? handleGettingOrder : handleShipping}
            >
                {action === 'buy' ? 'Potwierdź otrzymanie' : 'Wyślij towar'}
            </Button>
        </Box>
    );
};

export default DashBoardShippingItem;
