import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Card, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../api/user/authApiSlice.ts';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { validatePassword } from '../../validation/PasswordValidation.ts';

type LoginForm = {
    userName: string;
    password: string;
};

const SingIn = () => {
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const { handleSubmit, control, trigger } = useForm<LoginForm>({
        defaultValues: {
            userName: '',
            password: '',
        },
        mode: 'all',
    });

    const handleSubmitLogin = async (data: LoginForm) => {
        try {
            await login(data).unwrap();
            alert('Login successful');
            navigate('/');
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
            alert('Login failed: ' + errorMessage);
        }
    };
    return (
        <>
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
                        width: 450,
                        backgroundColor: 'primary.main',
                        p: 3,
                        borderRadius: 3,
                        gap: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: 5,
                    }}
                >
                    <Typography
                        variant="h5"
                        color="textSecondary"
                        sx={{ mb: 3 }}
                    >
                        Zaloguj się
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: 3,
                            width: '100%',
                            alignItems: 'center',
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 3,
                                width: '100%',
                                justifyContent: 'center',
                            }}
                        >
                            <Controller
                                name="userName"
                                control={control}
                                rules={{
                                    required: 'Nazwa użytkownika jest wymagana',
                                }}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        label="Nazwa użytkownika"
                                        fullWidth
                                        color="secondary"
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
                                name="password"
                                control={control}
                                rules={{
                                    required: 'Hasło jest wymagane',
                                    validate: validatePassword,
                                }}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        label="Hasło"
                                        type="password"
                                        fullWidth
                                        color="secondary"
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
                                mb: 2,
                            }}
                            onClick={async () => {
                                const isValid = await trigger();
                                if (isValid) {
                                    await handleSubmit(handleSubmitLogin)();
                                }
                            }}
                        >
                            Zaloguj
                        </Button>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Link to={'/register'}>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{
                                        mt: 2,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        display: 'inline',
                                    }}
                                >
                                    Nie masz konta?{' '}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        mt: 2,
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        display: 'inline',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                        color: 'secondary.light',
                                    }}
                                >
                                    Utwórz nowe konto
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </>
    );
};

export default SingIn;
