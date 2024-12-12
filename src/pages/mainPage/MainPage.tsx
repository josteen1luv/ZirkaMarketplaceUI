import { Container } from '@mui/material';
import MainCarousel from './MainCarousel.tsx';
import {
    useGetBestSellersQuery,
    useGetNewProductsQuery,
} from '../../api/product/productApiSlice.ts';

const MainPage = () => {
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
            <MainCarousel title={'Top sellers'} func={useGetBestSellersQuery} />
            <MainCarousel
                title={'New products'}
                func={useGetNewProductsQuery}
            />
        </Container>
    );
};

export default MainPage;
