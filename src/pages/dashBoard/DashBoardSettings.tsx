import React, { useState } from 'react';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import { User } from '../../types/User.ts';
import { Controller, useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '../../api/user/authApiSlice.ts';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';
import { selectId } from '../../api/user/userSlice.ts';

const DashBoardSettings = ({ user }: { user: User }) => {
    const [isEditing, setIsEditing] = useState(false);
    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleStopEditing = () => {
        setIsEditing(false);
    };
    const id = useSelector(selectId) as string;
    const [updateUser] = useUpdateUserMutation();
    const {
        control,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm({
        defaultValues: {
            email: user.email || '',
            userName: user.userName || '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            role: user.role,
        },
    });

    const onSubmit = async (data: User) => {
        try {
            await updateUser({ id, credentials: data }).unwrap();
            alert('Profil był onowiony');
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
            alert('Updating failed: ' + errorMessage);
            handleStopEditing();
        }
    };
    return (
        <Box>
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                Edytuj Profil
            </Typography>
            <Card
                sx={{
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'primary.main',
                }}
            >
                <Box component="form">
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '16px',
                        }}
                    >
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
                                    color="secondary"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.email}
                                    helperText={
                                        errors.email ? errors.email.message : ''
                                    }
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                        input: {
                                            readOnly: !isEditing,
                                        },
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="userName"
                            control={control}
                            rules={{
                                required: 'Nazwa użytkownika jest wymagana',
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    color="secondary"
                                    label="Nazwa użytkownika"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    error={!!errors.userName}
                                    helperText={errors.userName?.message}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                        input: {
                                            readOnly: true,
                                            disabled: true,
                                        },
                                    }}
                                />
                            )}
                        />
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
                                    variant="outlined"
                                    margin="normal"
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                        input: {
                                            readOnly: !isEditing,
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
                                    variant="outlined"
                                    margin="normal"
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                    slotProps={{
                                        inputLabel: {
                                            shrink: true,
                                        },
                                        input: {
                                            readOnly: !isEditing,
                                        },
                                    }}
                                />
                            )}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '20px',
                            gap: 2,
                        }}
                    >
                        {!isEditing ? (
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleEdit}
                            >
                                Zacznij edycję
                            </Button>
                        ) : (
                            <>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleStopEditing}
                                    sx={{ width: 160 }}
                                >
                                    Anuluj
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    sx={{ width: 160 }}
                                    onClick={async () => {
                                        const isValid = await trigger();
                                        if (isValid) {
                                            await handleSubmit(onSubmit)();
                                        }
                                    }}
                                >
                                    Zapisz
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>
            </Card>
        </Box>
    );
};

export default DashBoardSettings;
