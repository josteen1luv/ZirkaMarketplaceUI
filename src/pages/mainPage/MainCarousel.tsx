import { Typography, Box, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import ProductsListItem from '../../features/productsListItem/ProductsListItem.tsx';
import { Product } from '../../types/Product.ts';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {
    title: string;
    func: any;
};
const MainCarousel = ({ title, func }: Props) => {
    const { data } = func();
    const products: Product[] | undefined = data;

    const maxVisible = 5;
    const [visibleIndex, setVisibleIndex] = useState(0);
    const totalProducts = products?.length || 5;
    const totalGroups = Math.ceil(totalProducts / maxVisible);

    const handleNext = () => {
        setVisibleIndex((prevIndex) => (prevIndex + 1) % totalGroups);
    };

    const handlePrev = () => {
        setVisibleIndex(
            (prevIndex) => (prevIndex - 1 + totalGroups) % totalGroups,
        );
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography
                variant={'h2'}
                textAlign="center"
                sx={{
                    marginBottom: 1,
                }}
            >
                {`${title}`}
            </Typography>
            <Box
                sx={{
                    padding: 1.2,
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    color: '#fff',
                    overflow: 'hidden',
                    maxWidth: 1370,
                    gap: 2,
                }}
            >
                {visibleIndex > 0 && totalGroups > 1 && (
                    <Box
                        onClick={handlePrev}
                        sx={{
                            position: 'absolute',
                            left: '15px',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(82, 5, 123, 0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 1,
                        }}
                    >
                        <ArrowBackIosIcon
                            style={{
                                color: '#FFFFFF',
                                opacity: 1,
                                transform: 'translateX(4px)',
                            }}
                        />
                    </Box>
                )}

                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        transition: 'transform 0.5s ease',
                        transform: `translateX(-${visibleIndex * 71.2}%)`,
                        width: `${(totalProducts / maxVisible) * 71.2}%`,
                    }}
                >
                    {!products ? (
                        <CircularProgress />
                    ) : (
                        products.map((product) => (
                            <Box
                                key={product.id}
                                sx={{
                                    width: `calc(100% / ${maxVisible})`,
                                    padding: '0 4px',
                                    boxSizing: 'border-box',
                                }}
                            >
                                <ProductsListItem product={product} />
                            </Box>
                        ))
                    )}
                </Box>

                {totalProducts > maxVisible && (
                    <Box
                        onClick={handleNext}
                        sx={{
                            position: 'absolute',
                            right: '15px',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(82, 5, 123, 0.6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 1,
                        }}
                    >
                        <ArrowForwardIosIcon
                            style={{
                                color: '#FFFFFF',
                                opacity: 1,
                            }}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default MainCarousel;
