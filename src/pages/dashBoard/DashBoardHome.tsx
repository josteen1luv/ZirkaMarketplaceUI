import React from 'react';
import { Box, Typography } from '@mui/material';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { User } from '../../types/User.ts';

const DashBoardHome = ({ user }: { user: User }) => {
    return (
        <Box>
            <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                Witam, {user.firstName + ' ' + user.lastName}!{' '}
                <WavingHandIcon
                    sx={{
                        color: '#f3c30b',
                        marginRight: '25px',
                        fontSize: '35px',
                    }}
                />
            </Typography>
            <Box
                sx={{
                    border: '2px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    padding: '13px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'primary.main',
                }}
            >
                <Typography>
                    Tutaj będziesz mógł zobaczyć całą informacje o swoim koncie
                    na naszym MarketPlace.
                </Typography>
            </Box>
        </Box>
    );
};

export default DashBoardHome;
