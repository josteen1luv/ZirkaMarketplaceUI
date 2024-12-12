import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Home, Logout, Person, Settings } from '@mui/icons-material';
import { useLogoutMutation } from '../../api/user/authApiSlice.ts';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const DashBoardMenu = ({
    activeView,
    setActiveView,
}: {
    activeView: string;
    setActiveView: React.Dispatch<
        React.SetStateAction<'home' | 'profile' | 'settings' | 'products'>
    >;
}) => {
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
                width: '250px',
                backgroundColor: 'primary.main',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                margin: '20px',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginBottom: '30px',
                    textAlign: 'center',
                }}
            >
                Twoje konto
            </Typography>
            <Box>
                <Box
                    sx={{
                        listStyleType: 'none',
                        padding: 0,
                        margin: 0,
                    }}
                >
                    <Box
                        onClick={() => setActiveView('home')}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            margin: '20px 0',
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
                                marginRight: '15px',
                                fontSize: '24px',
                            }}
                        />
                        <Typography
                            sx={{
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
                            margin: '20px 0',
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
                                marginRight: '15px',
                                fontSize: '24px',
                            }}
                        />
                        <Typography
                            sx={{
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
                            margin: '20px 0',
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
                                marginRight: '15px',
                                fontSize: '24px',
                            }}
                        />
                        <Typography
                            sx={{
                                color: 'text.primary',
                                textDecoration: 'none',
                                fontSize: '16px',
                                fontWeight: '500',
                            }}
                        >
                            Ustawienia
                        </Typography>
                    </Box>
                    <Box
                        onClick={() => setActiveView('products')}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            margin: '20px 0',
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
                                marginRight: '15px',
                                fontSize: '24px',
                            }}
                        />
                        <Typography
                            sx={{
                                color: 'text.primary',
                                textDecoration: 'none',
                                fontSize: '16px',
                                fontWeight: '500',
                            }}
                        >
                            Twoje towary
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            margin: '20px 0',
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
                            sx={{
                                color: 'text.primary',
                                marginRight: '15px',
                                fontSize: '24px',
                            }}
                        />
                        <Button
                            onClick={handleLogout}
                            sx={{
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
                            Wylogowanie
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default DashBoardMenu;
