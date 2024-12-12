import { Box, Container } from '@mui/material';
import { Product } from '../../types/product.ts';
import SingleProductItem from '../../features/singleProductItem/SingleProductItem.tsx';

const CartPage = () => {
    const products: Product[] | null = [
        {
            id: 'kindOfId',
            name: 'Zirka',
            description: 'Best Chess Player',
            rating: 2.1,
            price: 100,
            photoUrl: '',
            availableAmount: 1,
            userId: 'ss',
        },
    ];
    return (
        <Container
            maxWidth={'xl'}
            sx={{
                minHeight: '100vh',
                height: 'auto',
                pt: { xs: 9, sm: 10 },
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 0, md: 2 },
            }}
        >
            <Box>
                {products &&
                    products.map((product) => (
                        <SingleProductItem product={product} />
                    ))}
            </Box>
        </Container>
    );
};

export default CartPage;
