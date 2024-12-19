import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Home, Logout, Person, Settings } from '@mui/icons-material';
import { useLogoutMutation } from '../../api/user/authApiSlice.ts';
import { useNavigate } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useSelector } from 'react-redux';
import { selectRole } from '../../api/user/userSlice.ts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const DashBoardMenu = ({
    activeView,
    setActiveView,
}: {
    activeView: string;
    setActiveView: React.Dispatch<
        React.SetStateAction<
            'home' | 'profile' | 'settings' | 'products' | 'admin'
        >
    >;
}) => {
    const role: 0 | 1 | 2 | null = useSelector(selectRole);
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const handleLogout = async () => {
        try {
            await logout().unwrap();
            navigate('/');
        } catch (e) {
            console.error(e);
        }
    };
    return (
        <Box
            sx={{
                position: { xs: 'fixed', sm: 'sticky' },
                zIndex: 1,
                bottom: { xs: 10, sm: null },
                backgroundColor: 'primary.main',
                px: { xs: 1, sm: 2 },
                py: 1,
                borderRadius: '12px',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                mb: 2,
                ml: { xs: 0, sm: 2 },
                mt: 10,
                height: { xs: 'auto', sm: '100%' },
                top: { sm: 80 },
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '30px',
                    textAlign: 'center',
                }}
            >
                Twoje konto
            </Typography>
            <Box
                sx={{
                    listStyleType: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: { xs: 'row', sm: 'column' },
                    gap: { xs: 2, sm: 2.5 },
                }}
            >
                <Box
                    onClick={() => setActiveView('home')}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        padding: '10px',
                        borderRadius: '8px',
                        transition: 'background 0.3s ease',
                        cursor: 'pointer',
                        background:
                            activeView === 'home'
                                ? 'rgba(255, 255, 255, 0.2)'
                                : 'transparent',
                        '&:hover': {
                            background: 'rgba(255, 255, 255, 0.2)',
                        },
                    }}
                >
                    <Home
                        sx={{
                            color: 'text.primary',
                            fontSize: '24px',
                        }}
                    />
                    <Typography
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            color: 'text.primary',
                            textDecoration: 'none',
                            fontSize: '16px',
                            fontWeight: '500',
                        }}
                    >
                        Główna
                    </Typography>
                </Box>
                <Box
                    onClick={() => setActiveView('profile')}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        padding: '10px',
                        borderRadius: '8px',
                        transition: 'background 0.3s ease',
                        cursor: 'pointer',
                        background:
                            activeView === 'profile'
                                ? 'rgba(255, 255, 255, 0.2)'
                                : 'transparent',
                        '&:hover': {
                            background: 'rgba(255, 255, 255, 0.2)',
                        },
                    }}
                >
                    <Person
                        sx={{
                            color: 'text.primary',
                            fontSize: '24px',
                        }}
                    />
                    <Typography
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            color: 'text.primary',
                            textDecoration: 'none',
                            fontSize: '16px',
                            fontWeight: '500',
                        }}
                    >
                        Dane użytkownika
                    </Typography>
                </Box>
                <Box
                    onClick={() => setActiveView('settings')}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        padding: '10px',
                        borderRadius: '8px',
                        transition: 'background 0.3s ease',
                        cursor: 'pointer',
                        background:
                            activeView === 'settings'
                                ? 'rgba(255, 255, 255, 0.2)'
                                : 'transparent',
                        '&:hover': {
                            background: 'rgba(255, 255, 255, 0.2)',
                        },
                    }}
                >
                    <Settings
                        sx={{
                            color: 'text.primary',
                            fontSize: '24px',
                        }}
                    />
                    <Typography
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            color: 'text.primary',
                            textDecoration: 'none',
                            fontSize: '16px',
                            fontWeight: '500',
                        }}
                    >
                        Ustawienia
                    </Typography>
                </Box>
                {role === 1 ? (
                    <Box
                        onClick={() => setActiveView('products')}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            padding: '10px',
                            borderRadius: '8px',
                            transition: 'background 0.3s ease',
                            cursor: 'pointer',
                            background:
                                activeView === 'products'
                                    ? 'rgba(255, 255, 255, 0.2)'
                                    : 'transparent',
                            '&:hover': {
                                background: 'rgba(255, 255, 255, 0.2)',
                            },
                        }}
                    >
                        <ShoppingCartIcon
                            sx={{
                                color: 'text.primary',
                                fontSize: '24px',
                            }}
                        />
                        <Typography
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                color: 'text.primary',
                                textDecoration: 'none',
                                fontSize: '16px',
                                fontWeight: '500',
                            }}
                        >
                            Twoje towary
                        </Typography>
                    </Box>
                ) : null}
                {role === 0 ? (
                    <Box
                        onClick={() => setActiveView('admin')}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            padding: '10px',
                            borderRadius: '8px',
                            transition: 'background 0.3s ease',
                            cursor: 'pointer',
                            background:
                                activeView === 'admin'
                                    ? 'rgba(255, 255, 255, 0.2)'
                                    : 'transparent',
                            '&:hover': {
                                background: 'rgba(255, 255, 255, 0.2)',
                            },
                        }}
                    >
                        <AdminPanelSettingsIcon
                            sx={{
                                color: 'text.primary',
                                fontSize: '24px',
                            }}
                        />
                        <Typography
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                color: 'text.primary',
                                textDecoration: 'none',
                                fontSize: '16px',
                                fontWeight: '500',
                            }}
                        >
                            Panel admina
                        </Typography>
                    </Box>
                ) : null}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center',
                        padding: '10px',
                        borderRadius: '8px',
                        transition: 'background 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                            background: 'rgba(255, 255, 255, 0.2)',
                        },
                    }}
                >
                    <Logout
                        onClick={handleLogout}
                        sx={{
                            color: 'text.primary',
                            fontSize: '24px',
                        }}
                    />
                    <Button
                        onClick={handleLogout}
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            color: '#ff4d4f',
                            background: 'none',
                            border: 'none',
                            fontSize: '16px',
                            fontWeight: '500',
                            textTransform: 'none',
                            padding: 0,
                            cursor: 'pointer',
                        }}
                    >
                        <Typography
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                color: 'error',
                                textDecoration: 'none',
                                fontSize: '16px',
                                fontWeight: '500',
                            }}
                        >
                            Wylogowanie
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default DashBoardMenu;
