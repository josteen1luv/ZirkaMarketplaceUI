import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, useMemo } from 'react';
import {
    CircularProgress,
    Container,
    CssBaseline,
    ThemeProvider,
} from '@mui/material';
import MainPage from './pages/mainPage/MainPage.tsx';
import Header from './features/header/Header.tsx';
import SingleProduct from './pages/singleProduct/SingleProduct.tsx';
import PaymentForm from './features/paymentForm/PaymentForm.tsx';
import SignIn from './pages/singIn/SingIn.tsx';
import SingUp from './pages/singUp/SingUp.tsx';
import Dashboard from './pages/dashBoard/DashBoard.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { selectTheme, toggleTheme } from './api/theme/themeSlice.ts';
import { createCustomTheme } from './style/ColorTheme.ts';
import Cart from './pages/cart/CartPage.tsx';
import { useRefreshQuery } from './api/user/authApiSlice.ts';
import CategoryPage from './pages/categoryPage/CategoryPage.tsx';

function App() {
    useRefreshQuery();
    const dispatch = useDispatch();
    const currentThemeMode = useSelector(selectTheme);

    const theme = useMemo(
        () => createCustomTheme(currentThemeMode),
        [currentThemeMode],
    );
    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <CssBaseline />
                <Suspense fallback={<CircularProgress />}>
                    <Container
                        maxWidth="xl"
                        sx={{
                            minHeight: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                        disableGutters
                    >
                        <Header
                            onThemeToggle={handleThemeToggle}
                            isDarkMode={currentThemeMode === 'dark'}
                        />
                        <Routes>
                            <Route path={'/'} element={<MainPage />} />
                            <Route path={'/cart'} element={<Cart />} />
                            <Route
                                path={'/products/:id'}
                                element={<SingleProduct />}
                            />
                            <Route
                                path={'/payment'}
                                element={<PaymentForm />}
                            />
                            <Route
                                path={'/category/:id'}
                                element={<CategoryPage />}
                            />
                            <Route path={'/login'} element={<SignIn />} />
                            <Route path={'/register'} element={<SingUp />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Routes>
                        {/*<Footer/>*/}
                    </Container>
                </Suspense>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
