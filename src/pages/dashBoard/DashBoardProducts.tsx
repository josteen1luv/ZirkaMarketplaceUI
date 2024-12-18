import React, { useState } from 'react';
import { Box, Dialog, IconButton } from '@mui/material';
import AddProductForm from '../../features/addProductForm/AddProductForm.tsx';
import ProductsList from '../../features/productsList/ProductsList.tsx';
import AddIcon from '@mui/icons-material/Add';
import { selectTheme } from '../../api/theme/themeSlice.ts';
import { useSelector } from 'react-redux';
const DashBoardProducts = () => {
    const [open, setOpen] = useState(false);
    const isDarkMode = useSelector(selectTheme) === 'dark';

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 2,
            }}
        >
            <Box flexGrow={1}>
                <ProductsList />
            </Box>
            <Box
                sx={{
                    mt: 8,
                    display: {
                        xs: 'none',
                        xl: 'block',
                    },
                }}
            >
                <AddProductForm />
            </Box>
            <Box
                sx={{
                    display: { lg: 'block', xl: 'none' },
                    position: 'absolute',
                    right: 2,
                    top: 80,
                }}
            >
                <IconButton onClick={handleClickOpen} sx={{ fontSize: 70 }}>
                    <AddIcon
                        fontSize={'inherit'}
                        sx={{ color: isDarkMode ? 'white' : null }}
                    />
                </IconButton>
                <Dialog
                    sx={{
                        '& .MuiDialog-paper': {
                            m: 0,
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                        },
                    }}
                    open={open}
                    onClose={handleClose}
                    maxWidth="sm"
                >
                    <AddProductForm />
                </Dialog>
            </Box>
        </Box>
    );
};

export default DashBoardProducts;
