import React from 'react';
import { Box, Button } from '@mui/material';
import { Product } from '../../types/product.ts';
import { useDispatch, useSelector } from 'react-redux';
import { selectId, selectRole } from '../../api/user/userSlice.ts';
import { Link } from 'react-router-dom';
import SingleProductItemInfo from './SingleProductItemInfo.tsx';
import { addProduct, selectPaymentInfo } from '../../api/cart/cartSlice.ts';

const SingleProductItem = ({ product }: { product: Product }) => {
    const role = useSelector(selectRole);
    const id: string | null = useSelector(selectId);
    const cart = useSelector(selectPaymentInfo).purchaseItemDtos;
    const dispatch = useDispatch();
    const handleAddToCart = () => {
        if (cart.filter((elem) => elem.productId === product.id).length === 0) {
            dispatch(addProduct({ productId: product.id, quantity: 1 }));
        } else {
            alert('This product is already in your cart');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                height: 400,
            }}
        >
            <SingleProductItemInfo product={product} />
            {!role ? (
                <Link to={'/login'}>
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{
                            borderRadius: 3,
                            mt: 3,
                            height: 45,
                            width: '100%',
                            maxWidth: 400,
                        }}
                    >
                        Login to buy products
                    </Button>
                </Link>
            ) : role === 2 ? (
                <Button
                    onClick={handleAddToCart}
                    variant="contained"
                    color="secondary"
                    sx={{
                        borderRadius: 3,
                        mt: 3,
                        height: 45,
                        width: '100%',
                        maxWidth: 400,
                    }}
                >
                    Add to cart
                </Button>
            ) : id === product.userId ? (
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                        borderRadius: 3,
                        mt: 3,
                        height: 45,
                        width: '100%',
                        maxWidth: 400,
                    }}
                >
                    Delete my product
                </Button>
            ) : (
                <></>
            )}
        </Box>
    );
};

export default SingleProductItem;
