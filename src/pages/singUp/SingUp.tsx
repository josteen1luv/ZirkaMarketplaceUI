import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Box,
    Card,
    Typography,
    TextField,
    Button,
    Divider,
    Select,
    MenuItem,
    InputLabel,
    FormHelperText,
    FormControl,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useRegistrationMutation } from '../../api/user/authApiSlice.ts';
import { User } from '../../types/User.ts';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
export type RegisterUser = User & {
    password: string;
};

const SingUp = () => {
    const [registration] = useRegistrationMutation();
    const navigate = useNavigate();

    const {
        handleSubmit,
        control,
        formState: { errors },
        trigger,
    } = useForm<RegisterUser>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            userName: '',
            role: 2,
            password: '',
        },
        mode: 'all',
    });

    const validatePassword = (password: string) => {
        const minLength = 8;
        const minLowercase = 1;
        const minUppercase = 1;
        const minNumbers = 1;
        const minSymbols = 1;

        if (password.length < minLength) {
            return `Hasło musi mieć co najmniej ${minLength} znaków`;
        }

        const lowercaseCount = (password.match(/[a-z]/g) || []).length;
        const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
        const numberCount = (password.match(/[0-9]/g) || []).length;
        const symbolCount = (password.match(/[^a-zA-Z0-9]/g) || []).length;

        if (lowercaseCount < minLowercase) {
            return `Hasło musi zawierać co najmniej ${minLowercase} małą literę`;
        }

        if (uppercaseCount < minUppercase) {
            return `Hasło musi zawierać co najmniej ${minUppercase} wielką literę`;
        }

        if (numberCount < minNumbers) {
            return `Hasło musi zawierać co najmniej ${minNumbers} cyfrę`;
        }

        if (symbolCount < minSymbols) {
            return `Hasło musi zawierać co najmniej ${minSymbols} symbol`;
        }
    }

    const handleSubmitRegister = async (data: RegisterUser) => {
        try {
            await registration(data).unwrap();
            alert('Registration successful! Please log in.');
            navigate('/login');
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
            alert('Registration failed: ' + errorMessage);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: 'background.default',
            }}
        >
            <Card
                elevation={4}
                sx={{
                    width: 600,
                    minHeight: 500,
                    backgroundColor: 'primary.main',
                    p: 4,
                    borderRadius: 3,
                    gap: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: 5,
                }}
            >
                <Typography variant="h5" color="textSecondary" sx={{ mb: 3 }}>
                    Rejestracja
                </Typography>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 3,
                        width: '100%',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            width: '50%',
                            justifyContent: 'center',
                        }}
                    >
                        <Controller
                            name="firstName"
                            control={control}
                            rules={{ required: 'Imię jest wymagane' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Imię"
                                    fullWidth
                                    color="secondary"
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            rules={{ required: 'Nazwisko jest wymagane' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Nazwisko"
                                    fullWidth
                                    color="secondary"
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'Email jest wymagany',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Nieprawidłowy adres email',
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    fullWidth
                                    color="secondary"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />
                            )}
                        />
                    </Box>
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            width: '1px',
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            width: '50%',
                            justifyContent: 'center',
                        }}
                    >
                        <Controller
                            name="userName"
                            control={control}
                            rules={{
                                required: 'Nazwa użytkownika jest wymagana',
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Nazwa użytkownika"
                                    fullWidth
                                    color="secondary"
                                    error={!!errors.userName}
                                    helperText={errors.userName?.message}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="role"
                            control={control}
                            rules={{ required: 'Rola jest wymagana' }}
                            render={({ field }) => (
                                <FormControl
                                    fullWidth
                                    color="secondary"
                                    error={!!errors.role}
                                >
                                    <InputLabel id="role-label">
                                        Rola
                                    </InputLabel>
                                    <Select
                                        {...field}
                                        labelId="role-label"
                                        label="Rola"
                                        size={'small'}
                                        sx={{
                                            typography: 'body1',
                                            height: '33px',
                                        }}
                                    >
                                        <MenuItem value={2}>
                                            Użytkownik
                                        </MenuItem>
                                        <MenuItem value={1}>
                                            Sprzedawca
                                        </MenuItem>
                                    </Select>
                                    {errors.role && (
                                        <FormHelperText>
                                            {errors.role.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: 'Hasło jest wymagane',
                                validate: validatePassword,
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Hasło"
                                    type="password"
                                    fullWidth
                                    color="secondary"
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                    }}
                                />
                            )}
                        />
                    </Box>
                </Box>

                <Box sx={{ width: '100%', mt: 3 }}>
                    <Button
                        type="button"
                        variant="contained"
                        color="secondary"
                        sx={{
                            borderRadius: 3,
                            width: '100%',
                            padding: 1.5,
                            fontWeight: 'bold',
                        }}
                        onClick={async () => {
                            const isValid = await trigger();
                            if (isValid) {
                                await handleSubmit(handleSubmitRegister)();
                            }
                        }}
                    >
                        Zarejestruj się
                    </Button>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Link to={'/login'} style={{ textDecoration: 'none' }}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mt: 2,
                                    cursor: 'pointer',
                                }}
                            >
                                Mam już{' '}
                                <Typography
                                    variant="body2"
                                    component="span"
                                    sx={{
                                        color: 'secondary.light',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    konto
                                </Typography>
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default SingUp;
