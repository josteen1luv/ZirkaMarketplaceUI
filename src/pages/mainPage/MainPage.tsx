import { Container } from '@mui/material';
import MainCarousel from './MainCarousel.tsx';
import {
    useGetBestSellersQuery,
    useGetNewProductsQuery,
} from '../../api/product/productApiSlice.ts';
import Banner from './Banners.tsx';
import Footer from './Footer.tsx';

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
                gap: { xs: 0, md: 6 },
            }}
        >
            <Banner />
            <MainCarousel title={'Bestsellery'} func={useGetBestSellersQuery} />
            <MainCarousel title={'Nowe towary'} func={useGetNewProductsQuery} />
            <Footer />
        </Container>
    );
};

export default MainPage;
