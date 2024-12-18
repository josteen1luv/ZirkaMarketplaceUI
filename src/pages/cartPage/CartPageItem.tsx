import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useGetSingleProductQuery } from '../../api/product/productApiSlice.ts';
import { Product } from '../../types/Product.ts';
import SingleProductItemInfo from '../singleProduct/SingleProductItemInfo.tsx';
import { useDispatch } from 'react-redux';
import { changeQuantity } from '../../api/cart/cartSlice.ts';
const CartPageItem = ({ id, quantity }: { id: string; quantity: number }) => {
    const product: Product | undefined = useGetSingleProductQuery(id).data;
    const [quantityState, setQuantityState] = useState(quantity);
    const dispatch = useDispatch();
    const handleSetQuantity = (action: 'plus' | 'minus') => {
        if (action === 'plus') {
            if (
                product?.availableAmount &&
                quantityState < product.availableAmount
            ) {
                setQuantityState((state) => state + 1);
            } else {
                alert('Już wybrana maksymalna ilość towaru');
            }
        }
        if (action === 'minus') {
            if (quantityState > 1) {
                setQuantityState((state) => state - 1);
            } else {
                alert('Nie można kupić mniej niż jeden towar');
            }
        }
    };
    useEffect(() => {
        dispatch(
            changeQuantity({
                productId: id,
                quantity: quantityState,
                price: product?.price || 0,
            }),
        );
    }, [dispatch, id, quantityState, product?.price]);
    if (!product) {
        return <CircularProgress />;
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 2,
                borderRadius: 7,
                border: '1px solid gray',
            }}
        >
            <SingleProductItemInfo product={product} />
            <Box
                display={'flex'}
                flex={1}
                flexDirection={'column'}
                alignItems={'center'}
            >
                <Typography variant={'h4'}>Ilość</Typography>
                <Box display={'flex'} alignItems={'center'}>
                    <IconButton onClick={() => handleSetQuantity('minus')}>
                        <RemoveIcon fontSize={'large'} color={'secondary'} />
                    </IconButton>
                    <Typography variant={'h4'}>{quantityState}</Typography>
                    <IconButton onClick={() => handleSetQuantity('plus')}>
                        <AddIcon fontSize={'large'} color={'secondary'} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default CartPageItem;
