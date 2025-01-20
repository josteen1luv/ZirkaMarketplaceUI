import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

const Banner: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();
    const slides = [
        {
            imageUrl: '/telewizor.png',
            Url: `/products/${import.meta.env.VITE_TELEWIZOR_ID}`,
        },
        {
            imageUrl: '/telefon.png',
            Url: `/products/${import.meta.env.VITE_TELEFON_ID}`,
        },
        {
            imageUrl: '/flip.png',
            Url: `/products/${import.meta.env.VITE_FLIP_ID}`,
        },
        {
            imageUrl: '/watch.png',
            Url: `/products/${import.meta.env.VITE_WATCH_ID}`,
        },
        {
            imageUrl: '/monitor.png',
            Url: `/products/${import.meta.env.VITE_MONITOR_ID}`,
        },
    ];
    const handleImageClick = () => {
        navigate(slides[activeIndex].Url);
    };
    const goToPreviousSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
        );
    };
    const goToNextSlide = () => {
        setActiveIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
        );
    };
    useEffect(() => {
        const interval = setInterval(() => {
            goToNextSlide();
        }, 3000);

        return () => clearInterval(interval);
    }, [activeIndex]);
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3,
                borderRadius: 2,
                color: 'white',
                overflow: 'hidden',
                backgroundColor: slides[activeIndex],
                textAlign: 'center',
            }}
        >
            <IconButton
                onClick={goToPreviousSlide}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '30px',
                    transform: 'translateY(-50%)',
                    color: 'gray',
                }}
            >
                <ArrowBackIosIcon />
            </IconButton>
            <IconButton
                onClick={goToNextSlide}
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '30px',
                    transform: 'translateY(-50%)',
                    color: 'gray',
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
            <Box
                component="img"
                src={slides[activeIndex].imageUrl}
                alt="banner"
                onClick={handleImageClick}
                sx={{
                    maxWidth: '100%',
                    borderRadius: 2,
                    height: {
                        xs: '150px',
                        sm: '200px',
                        md: '300px',
                        lg: '400px',
                    },
                    width: '100%',
                    cursor: 'pointer',
                    marginTop: 3,
                }}
            />
            <Box display="flex" justifyContent="center" gap={1} marginTop={3}>
                {slides.map((_, index) => (
                    <IconButton
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        sx={{
                            padding: 0,
                            color:
                                activeIndex === index
                                    ? 'secondary.main'
                                    : '#ccc',
                            transition: 'color 0.3s',
                        }}
                    >
                        <CircleIcon
                            sx={{
                                typography: 'body1',
                                height: '10px',
                            }}
                        />
                    </IconButton>
                ))}
            </Box>
        </Box>
    );
};

export default Banner;
