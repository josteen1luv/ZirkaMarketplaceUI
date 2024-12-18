import React, { useState } from 'react';
import { Product } from '../../types/Product.ts';
import { Box, Card, CardMedia, Rating, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ProductsListItem = ({ product }: { product: Product }) => {
    const [isHovered, setIsHovered] = useState(false);

    const { id, name, rating, price, photoUrl, availableAmount } = product;

    return (
        <Link to={`/products/${id}`}>
            <Card
                elevation={4}
                sx={{
                    backgroundColor: 'primary.main',
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    minHeight: '240px',
                    p: 3,
                    borderRadius: 3,
                    // border: 1,
                    gap: 1,
                    width: 250,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    boxShadow: isHovered
                        ? '0 15px 25px rgba(0, 0, 0, 0.3)'
                        : '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <CardMedia
                            component="img"
                            image={`${photoUrl}`}
                            sx={{
                                width: 200,
                                height: 200,
                                objectFit: 'contain',
                            }}
                        />
                    </Box>
                    <Typography variant="h5">{`${name}`}</Typography>

                    <Rating
                        emptyIcon={<StarBorderIcon sx={{ color: 'gray' }} />}
                        name="rating"
                        value={rating}
                        readOnly
                    />
                    <Typography
                        variant="subtitle1"
                        sx={{ color: 'text.secondary' }}
                    >{`Ilość: ${availableAmount}`}</Typography>
                    <Typography
                        variant="h5"
                        sx={{ color: 'secondary.light' }}
                    >{`${price} PLN`}</Typography>
                </Box>
            </Card>
        </Link>
    );
};

export default ProductsListItem;
