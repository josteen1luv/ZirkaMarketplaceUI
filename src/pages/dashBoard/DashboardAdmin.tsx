import React from 'react';
import { Box, Typography } from '@mui/material';
import AddCategoryForm from '../../features/addCategoryForm/AddCategoryForm.tsx';

const DashboardAdmin = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                Zarządzanie kategoriami
            </Typography>
            <AddCategoryForm />
        </Box>
    );
};

export default DashboardAdmin;
