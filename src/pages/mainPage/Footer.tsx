import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer: React.FC = () => {
    return (
        <Box
            sx={{
                padding: '40px 20px',
                borderTop: '1px solid #333',
                textAlign: 'center',
            }}
        >
            <Typography
                variant="h5"
                fontWeight="bold"
                color="main"
                sx={{ marginBottom: '20px' }}
            >
                Skontaktuj się z nami
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: { xs: 3, md: 0 },
                    textAlign: { xs: 'center', md: 'left' },
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <Box
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="center"
                    >
                        <EmailIcon
                            sx={{
                                color: 'secondary.main',
                                marginRight: 1,
                                marginTop: 0.5,
                            }}
                        />
                        <Box>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                color="main"
                            >
                                Napisz do nas
                            </Typography>
                            <Typography variant="body2" color="main">
                                zirkamarketplace@gmail.com
                            </Typography>
                            <Typography variant="body2" color="main">
                                wsparciezirkamarketplace@gmail.com
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <LocationOnIcon
                            sx={{ color: 'secondary.main', marginRight: 1 }}
                        />
                        <Box>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                color="main"
                            >
                                Nasza lokalizacja
                            </Typography>
                            <Typography variant="body2" color="main">
                                Stokłosy 3, 02-787 Warszawa
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Box
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="center"
                    >
                        <PhoneIcon
                            sx={{
                                color: 'secondary.main',
                                marginRight: 1,
                                marginTop: 0.5,
                            }}
                        />
                        <Box>
                            <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                color="main"
                            >
                                Zadzwoń do nas
                            </Typography>
                            <Typography variant="body2" color="main">
                                +48 123 456 789
                            </Typography>
                            <Typography variant="body2" color="main">
                                +48 987 654 321
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    marginTop: 4,
                    marginBottom: 2,
                    height: '1px',
                    backgroundColor: '#333',
                    width: '100%',
                }}
            ></Box>

            <Typography variant="body2" fontWeight="bold" color="#bdbdbd">
                © 2025 ZirkaMarketPlace | Wszystkie prawa zastrzeżone
            </Typography>

            <Box display="flex" justifyContent="center" marginTop={2} gap={1}>
                <IconButton
                    href="#"
                    sx={{
                        color: '#0165E1',
                        '&:hover': { color: 'secondary' },
                    }}
                >
                    <FacebookIcon />
                </IconButton>
                <IconButton
                    href="#"
                    sx={{
                        color: ' #1D9BF0',
                        '&:hover': { color: 'secondary' },
                    }}
                >
                    <TwitterIcon />
                </IconButton>
                <IconButton
                    href="#"
                    sx={{
                        color: '#0A66C2',
                        '&:hover': { color: 'secondary' },
                    }}
                >
                    <LinkedInIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Footer;
