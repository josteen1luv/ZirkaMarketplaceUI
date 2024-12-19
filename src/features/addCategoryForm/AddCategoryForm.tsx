import React, { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Card, Typography, TextField, Button } from '@mui/material';
import { usePostCategoryMutation } from '../../api/category/categoryApiSlice.ts';
import { CategoryForm } from '../../types/Category.ts';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const AddCategoryForm = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { handleSubmit, control } = useForm<CategoryForm>({
        defaultValues: {
            name: '',
            description: '',
            photoUrl: '',
        },
    });

    const [postCategory] = usePostCategoryMutation();

    const onSubmit = async (categoryData: CategoryForm) => {
        const file = fileInputRef.current?.files?.[0];
        if (file) {
            categoryData.photoUrl = file;
        }

        try {
            const formData = new FormData();
            formData.append('Name', categoryData.name);
            formData.append('Description', categoryData.description);
            if (categoryData.photoUrl) {
                formData.append('PhotoUrl', categoryData.photoUrl);
            }

            await postCategory(formData).unwrap();
            alert('Category added successfully.');
        } catch (err) {
            const error = err as FetchBaseQueryError;
            const errorData = error.data as {
                message?: string;
                errors?: string[];
            };
            const errorMessage: string =
                errorData?.errors?.[0] ||
                errorData?.message ||
                'An error occurred.';
            alert('Adding category failed: ' + errorMessage);
        }
    };

    return (
        <Card
            elevation={4}
            sx={{
                width: 300,
                minHeight: 400,
                backgroundColor: 'primary.main',
                p: 3,
                borderRadius: 3,
                gap: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h5" color="textSecondary">
                Dodaj nową kategorię
            </Typography>
            <Box
                component="form"
                sx={{ mt: 2, width: '100%' }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: 'Nazwa jest wymagana' }}
                    render={({ field, fieldState }) => (
                        <TextField
                            color={'secondary'}
                            {...field}
                            label="Nazwa"
                            fullWidth
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    rules={{ required: 'Opis jest wymagany' }}
                    render={({ field, fieldState }) => (
                        <TextField
                            color={'secondary'}
                            {...field}
                            label="Opis"
                            multiline
                            maxRows={4}
                            fullWidth
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    )}
                />
                <Controller
                    name="photoUrl"
                    control={control}
                    rules={{ required: 'Zdjęcie jest wymagane' }}
                    render={({ field, fieldState }) => (
                        <TextField
                            sx={{ input: { height: 50 } }}
                            type={'file'}
                            color={'secondary'}
                            {...field}
                            inputRef={fileInputRef}
                            label="Zdjęcie"
                            fullWidth
                            margin="normal"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    )}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 2, borderRadius: 3 }}
                    fullWidth
                >
                    Dodaj Kategorię
                </Button>
            </Box>
        </Card>
    );
};

export default AddCategoryForm;
