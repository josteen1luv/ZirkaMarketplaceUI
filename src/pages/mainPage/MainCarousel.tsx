import React, { useState } from 'react';
import {
    Typography,
    Box,
    CircularProgress,
    IconButton,
    useMediaQuery,
} from '@mui/material';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ProductsListItem from '../../features/productsListItem/ProductsListItem.tsx';
import { Product } from '../../types/product.ts';

type Props = {
    title: string;
    func: any;
};

const MainCarousel = ({ title, func }: Props) => {
    const { data } = func();
    const products: Product[] = data || [];

    const isCustom575 = useMediaQuery('(max-width:528px)');
    const isSm = useMediaQuery('(max-width:800px)');
    const isMd = useMediaQuery('(max-width:1122px)');
    const isLg = useMediaQuery('(max-width:1400px)');

    const maxVisible = isCustom575 ? 1 : isSm ? 2 : isMd ? 3 : isLg ? 4 : 5;

    const [startIndex, setStartIndex] = useState(0);

    const handleNext = () => {
        setStartIndex((prev) =>
            prev + maxVisible < products.length ? prev + 1 : 0
        );
    };

    const handlePrev = () => {
        setStartIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const visibleProducts = products ? products.slice(startIndex, startIndex + maxVisible): [];

    return (
        <Box sx={{ height:480}}
        >
            <Typography variant="h2" mb={2} sx={{textAlign: 'center'}}>
                {title}
            </Typography>

            {products.length === 0 ? (
                <CircularProgress />
            ) : (
                <Box
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        height:415,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {startIndex > 0 && (
                        <IconButton
                            onClick={handlePrev}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: 0,
                                transform: 'translateY(-50%)',
                                zIndex: 2,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                color: 'white',
                                '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
                            }}
                        >
                            <ArrowBackIosIcon />
                        </IconButton>
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'nowrap',
                            justifyContent: 'space-between',
                            gap: 1,
                            transition: 'transform 0.5s ease',
                        }}
                    >
                        {visibleProducts.map((product) => (
                            <Box
                                key={product.id}
                                sx={{ 
                                    boxSizing: 'border-box',
                                    
                                }}
                            >
                                <ProductsListItem product={product} />
                            </Box>
                        ))}
                    </Box>
                    <IconButton
                        onClick={handleNext}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            right: 0,
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            color: 'white',
                            '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
                        }}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default MainCarousel;
