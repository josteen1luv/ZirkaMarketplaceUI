import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import { selectPaymentInfo } from '../../api/cart/cartSlice.ts';
import { useSelector } from 'react-redux';
import CartPageItem from './CartPageItem.tsx';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const productsInfo = useSelector(selectPaymentInfo).purchaseItemDtos;
    return (
        <Container
            maxWidth={'xl'}
            sx={{
                minHeight: '100vh',
                height: 'auto',
                pt: { xs: 9, sm: 10 },
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Typography
                variant={'h2'}
                textAlign="center"
                sx={{
                    marginBottom: 1,
                }}
            >
                Twój koszyk
            </Typography>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start"
                gap={2}
            >
                {productsInfo &&
                    productsInfo.map((info) => (
                        <CartPageItem
                            key={info.productId}
                            id={info.productId}
                            quantity={info.quantity}
                        />
                    ))}
            </Box>
            {productsInfo.length ? (
                <Link to={'/payment'}>
                    <Box display="flex" justifyContent="center">
                        <Button
                            size={'large'}
                            variant={'contained'}
                            color={'secondary'}
                            sx={{
                                width: '400px',
                                padding: 2,
                                borderRadius: 3,
                                marginBottom: 5,
                            }}
                        >
                            Przejdź do zapłaty
                        </Button>
                    </Box>
                </Link>
            ) : null}
        </Container>
    );
};

export default CartPage;
