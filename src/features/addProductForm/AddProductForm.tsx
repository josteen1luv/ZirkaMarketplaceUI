import React, { useRef } from 'react';
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
    CircularProgress,
} from '@mui/material';
import { ProductForm } from '../../types/Product.ts';
import { usePostProductMutation } from '../../api/product/productApiSlice.ts';
import { useSelector } from 'react-redux';
import { selectId } from '../../api/user/userSlice.ts';
import { useGetCategoriesQuery } from '../../api/category/categoryApiSlice.ts';
const AddProductForm = () => {
    const id = useSelector(selectId);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { handleSubmit, control } = useForm<ProductForm>({
        defaultValues: {
            Name: '',
            Description: '',
            CategoryId: '5f6bf0d9-954e-4670-a5d0-d53419af16f5',
            Price: 0,
            PhotoUrl: '',
            AvailableAmount: 0,
            UserId: id as string,
        },
    });

    const [postProduct] = usePostProductMutation();
    const categories = useGetCategoriesQuery().data;
    const onSubmit = async (otherFields: Omit<ProductForm, 'PhotoUrl'>) => {
        const file = fileInputRef.current?.files?.[0];
        if (!file) {
            console.error('No file selected');
            return;
        }

        try {
            const productData: ProductForm = {
                ...otherFields,
                PhotoUrl: file, // Assign Base64 string here
            };

            console.log(productData);

            const formData = new FormData();
            formData.append('PhotoUrl', productData.PhotoUrl);
            formData.append('Name', productData.Name);
            formData.append('Description', productData.Description);
            formData.append('CategoryId', productData.CategoryId);
            formData.append('UserId', productData.UserId);
            formData.append(
                'AvailableAmount',
                productData.AvailableAmount.toString(),
            );
            formData.append('Price', productData.Price.toString());

            await postProduct(formData).unwrap();
            console.log('Product created successfully');
        } catch (error) {
            console.error('Error creating product:', error);
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
                    name="Name"
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
                    name="Description"
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
                    name="CategoryId"
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
                                {!categories ? (
                                    <CircularProgress />
                                ) : (
                                    categories.map((category) => (
                                        <MenuItem
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>
                    )}
                />
                <Controller
                    name="Price"
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
                    name="PhotoUrl"
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
                <Controller
                    name="AvailableAmount"
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
