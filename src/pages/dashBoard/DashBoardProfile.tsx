import React from 'react';
import { Box, Typography } from '@mui/material';
import { User } from '../../types/User.ts';

const DashBoardProfile = ({ user }: { user: User }) => {
    return (
        <Box>
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                Informacje o użytkowniku
            </Typography>
            <Box
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'primary.main',
                }}
            >
                <Box
                    component="table"
                    sx={{
                        width: '100%',
                        borderCollapse: 'collapse',
                    }}
                >
                    <Box component="tbody">
                        <Box
                            component="tr"
                            sx={{
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Box
                                component="td"
                                sx={{
                                    padding: '8px',
                                    fontWeight: 'bold',
                                    color: 'text.primary',
                                }}
                            >
                                Imię Nazwisko
                            </Box>
                            <Box
                                component="td"
                                sx={{
                                    padding: '8px',
                                    color: 'text.secondary',
                                }}
                            >
                                {user.firstName + ' ' + user.lastName}
                            </Box>
                        </Box>
                        <Box
                            component="tr"
                            sx={{
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Box
                                component="td"
                                sx={{
                                    padding: '8px',
                                    fontWeight: 'bold',
                                    color: 'text.primary',
                                }}
                            >
                                Email
                            </Box>
                            <Box
                                component="td"
                                sx={{
                                    padding: '8px',
                                    color: 'text.secondary',
                                }}
                            >
                                {user.email}
                            </Box>
                        </Box>
                        <Box
                            component="tr"
                            sx={{
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Box
                                component="td"
                                sx={{
                                    padding: '8px',
                                    fontWeight: 'bold',
                                    color: 'text.primary',
                                }}
                            >
                                Nazwa użytkownika
                            </Box>
                            <Box
                                component="td"
                                sx={{
                                    padding: '8px',
                                    color: 'text.secondary',
                                }}
                            >
                                {user.userName}
                            </Box>
                        </Box>
                        <Box component="tr">
                            <Box
                                component="td"
                                sx={{
                                    padding: '8px',
                                    fontWeight: 'bold',
                                    color: 'text.primary',
                                }}
                            >
                                Rola
                            </Box>
                            <Box
                                component="td"
                                sx={{
                                    padding: '8px',
                                    color: 'text.secondary',
                                }}
                            >
                                {user.role === 2
                                    ? 'Kupujący'
                                    : user.role === 1
                                      ? 'Sprzedawca'
                                      : 'Admin'}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default DashBoardProfile;
