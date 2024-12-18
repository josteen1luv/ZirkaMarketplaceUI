import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { User } from '../../types/User';

const DashBoardProfile = ({ user }: { user: User }) => {
    return (
        <Box>
            <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                Moje dane
            </Typography>
            <Grid2
                container
                spacing={{ xs: 0, md: 2 }}
                columns={{ xs: 6, md: 12 }}
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '12px',
                    padding: '16px',
                    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'primary.main',
                }}
            >
                <Grid2 size={6}>
                    <Typography
                        sx={{
                            padding: '8px',
                            fontWeight: 'bold',
                            color: 'text.primary',
                        }}
                    >
                        Imię Nazwisko:
                    </Typography>
                </Grid2>
                <Grid2 size={6}>
                    <Typography
                        sx={{
                            mb: { xs: 3, sm: 0 },
                            padding: '8px',
                            color: 'text.secondary',
                        }}
                    >
                        {user.firstName + ' ' + user.lastName}
                    </Typography>
                </Grid2>

                <Grid2 size={6}>
                    <Typography
                        sx={{
                            padding: '8px',
                            fontWeight: 'bold',
                            color: 'text.primary',
                        }}
                    >
                        Email:
                    </Typography>
                </Grid2>
                <Grid2 size={6}>
                    <Typography
                        sx={{
                            mb: { xs: 3, sm: 0 },
                            padding: '8px',
                            color: 'text.secondary',
                        }}
                    >
                        {user.email}
                    </Typography>
                </Grid2>

                <Grid2 size={6}>
                    <Typography
                        sx={{
                            padding: '8px',
                            fontWeight: 'bold',
                            color: 'text.primary',
                        }}
                    >
                        Nazwa użytkownika:
                    </Typography>
                </Grid2>
                <Grid2 size={6}>
                    <Typography
                        sx={{
                            mb: { xs: 3, sm: 0 },
                            padding: '8px',
                            color: 'text.secondary',
                        }}
                    >
                        {user.userName}
                    </Typography>
                </Grid2>

                <Grid2 size={6}>
                    <Typography
                        sx={{
                            padding: '8px',
                            fontWeight: 'bold',
                            color: 'text.primary',
                        }}
                    >
                        Rola:
                    </Typography>
                </Grid2>
                <Grid2 size={6}>
                    <Typography
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
                    </Typography>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default DashBoardProfile;
