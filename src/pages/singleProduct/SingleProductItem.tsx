import React, { useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Rating,
} from '@mui/material';
import { Product } from '../../types/Product.ts';
import { useDispatch, useSelector } from 'react-redux';
import { selectId, selectRole } from '../../api/user/userSlice.ts';
import { Link } from 'react-router-dom';
import SingleProductItemInfo from './SingleProductItemInfo.tsx';
import { addProduct, selectPaymentInfo } from '../../api/cart/cartSlice.ts';
import { useRateProductMutation } from '../../api/product/productApiSlice.ts';

const SingleProductItem = ({ product }: { product: Product }) => {
    const [openRatingDialog, setOpenRatingDialog] = useState(false);
    const [ratingValue, setRatingValue] = useState<number | null>(0);

    const role = useSelector(selectRole);
    const id: string | null = useSelector(selectId);
    const cart = useSelector(selectPaymentInfo).purchaseItemDtos;
    const dispatch = useDispatch();

    const [rate] = useRateProductMutation();

    const handleAddToCart = () => {
        if (product?.availableAmount === 0) {
            alert('Prodult się skończył');
        }
        if (cart.filter((elem) => elem.productId === product.id).length === 0) {
            dispatch(addProduct({ productId: product.id, quantity: 1 }));
        } else {
            alert('Ten produkt już jest w koszyku');
        }
    };

    const handleOpenRatingDialog = () => {
        setOpenRatingDialog(true);
    };

    const handleCloseRatingDialog = () => {
        setOpenRatingDialog(false);
    };

    const handleSubmitRating = () => {
        rate({
            productId: product.id,
            rating: ratingValue as number,
        });
        handleCloseRatingDialog();
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
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
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
                        Dodaj do koszyka
                    </Button>
                    <Button
                        onClick={handleOpenRatingDialog}
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
                        Oceń produkt
                    </Button>
                </Box>
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
            <Dialog open={openRatingDialog} onClose={handleCloseRatingDialog}>
                <DialogTitle>Oceń produkt</DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <Rating
                        name="product-rating"
                        value={ratingValue}
                        onChange={(event, newValue) => setRatingValue(newValue)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseRatingDialog}
                        sx={{ color: 'text.secondary' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmitRating}
                        variant="contained"
                        color="secondary"
                        disabled={ratingValue === 0}
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SingleProductItem;
