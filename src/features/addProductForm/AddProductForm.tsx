import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Box,
    Card,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import { ProductForm } from '../../types/product.ts';
import { usePostProductMutation } from '../../api/product/productApiSlice.ts';

const AddProductForm = () => {
    const { handleSubmit, control, reset } = useForm<ProductForm>({
        defaultValues: {
            name: '',
            description: '',
            category: 0,
            price: 0,
            photoUrl: '',
            availableAmount: 0,
        },
    });

    const [postProduct] = usePostProductMutation();

    const onSubmit = async (data: ProductForm) => {
        try {
            await postProduct(data).unwrap();
            console.log('Product added successfully');
            reset();
        } catch (err) {
            console.error('Failed to add product:', err);
        }
    };

    return (
        <Card
            elevation={4}
            sx={{
                mt: 10.5,
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
                Dodaj nowy towar
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
                    name="category"
                    control={control}
                    rules={{ required: 'Musisz wybrac kategorie' }}
                    render={({ field, fieldState }) => (
                        <FormControl
                            fullWidth
                            color="secondary"
                            error={!!fieldState.error}
                            variant="outlined"
                        >
                            <InputLabel id="category-label">
                                Categoria
                            </InputLabel>
                            <Select
                                {...field}
                                size={'small'}
                                label="Kategoria"
                                sx={{
                                    typography: 'body1',
                                    height: '33px',
                                }}
                            >
                                <MenuItem value={0}>Komputery</MenuItem>
                                <MenuItem value={1}>Telefony</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />
                <Controller
                    name="price"
                    control={control}
                    rules={{
                        required: 'Cena jest wymagana',
                        min: {
                            value: 0.01,
                            message: 'Cena musi być większa niż 0',
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <TextField
                            color={'secondary'}
                            {...field}
                            label="Cena w PLN"
                            type="number"
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
                    rules={{ required: 'URL zdjęcia jest wymagany' }}
                    render={({ field, fieldState }) => (
                        <TextField
                            color={'secondary'}
                            {...field}
                            label="URL Zdjęcia"
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
                    name="availableAmount"
                    control={control}
                    rules={{
                        required: 'Ilość jest wymagana',
                        min: {
                            value: 1,
                            message: 'Ilość musi być większa niż 0',
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <TextField
                            color={'secondary'}
                            {...field}
                            label="Ilość"
                            type="number"
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
                    Dodaj Produkt
                </Button>
            </Box>
        </Card>
    );
};

export default AddProductForm;
