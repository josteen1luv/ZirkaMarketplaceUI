import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    Snackbar,
    Alert,
    CircularProgress,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { selectPaymentInfo } from '../../api/cart/cartSlice.ts';
import { useSelector } from 'react-redux';
import { usePaymentMutation } from '../../api/cart/cartApiSlice.ts';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const [cardNumber, setCardNumber] = useState<string>('4242-4242-4242-4242');
    const [cardExpiry, setCardExpiry] = useState<string>('30/30');
    const [cardCVC, setCardCVC] = useState<string>('333');
    const [cardNumberError, setCardNumberError] = useState<boolean>(false);
    const [cardExpiryError, setCardExpiryError] = useState<boolean>(false);
    const [cardCVCError, setCardCVCError] = useState<boolean>(false);
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [paymentError, setPaymentError] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const [payment] = usePaymentMutation();

    const purchaseData = useSelector(selectPaymentInfo);

    const sum: number = purchaseData.purchaseItemDtos.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const formatCardNumber = (value: string) =>
        value
            .replace(/\D/g, '')
            .replace(/(\d{4})(?=\d)/g, '$1-')
            .slice(0, 19);
    const formatExpiry = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        if (!cleaned) return '';
        let formatted = cleaned.slice(0, 2);
        if (formatted.length === 2 && parseInt(formatted, 10) > 12)
            formatted = formatted.slice(0, 1);
        if (cleaned.length > 2) formatted += '/' + cleaned.slice(2, 4);
        return formatted.slice(0, 5);
    };

    const validateExpiry = (value: string) => {
        const [month, year] = value.split('/').map(Number);
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear() % 100;
        return !(
            year < currentYear ||
            (year === currentYear && month < currentMonth)
        );
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedExpiry = formatExpiry(e.target.value);
        setCardExpiry(formattedExpiry);
        setCardExpiryError(!validateExpiry(formattedExpiry));
    };

    const navigate = useNavigate();
    const handlePayment = () => {
        const isCardNumberEmpty = !cardNumber;
        const isCardExpiryEmpty = !cardExpiry;
        const isCardCVCEmpty = !cardCVC;
        setCardNumberError(isCardNumberEmpty);
        setCardExpiryError(isCardExpiryEmpty || !validateExpiry(cardExpiry));
        setCardCVCError(isCardCVCEmpty);

        if (
            isCardNumberEmpty ||
            isCardExpiryEmpty ||
            isCardCVCEmpty ||
            !validateExpiry(cardExpiry)
        ) {
            setPaymentError(true);
            return;
        }

        setOpenSuccess(true);
        payment(purchaseData);
        const timeout = setTimeout(() => {
            navigate('/');
        }, 1000);
        return clearTimeout(timeout);
    };

    useEffect(() => {
        if (purchaseData?.purchaseItemDtos.length === 0) {
            navigate('/');
        }
    }, [purchaseData, navigate]);
    return (
        <Box
            sx={{
                p: 2,
                maxWidth: 800,
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Typography variant={'h3'}>Płatność</Typography>
            <TextField
                label="Numer karty"
                slotProps={{
                    input: {
                        readOnly: true,
                    },
                    inputLabel: { sx: { marginTop: -1.2 } },
                }}
                variant="outlined"
                color="secondary"
                value={cardNumber}
                onChange={(e) =>
                    setCardNumber(formatCardNumber(e.target.value))
                }
                fullWidth
                error={cardNumberError}
                helperText={cardNumberError ? 'Numer karty jest wymagany' : ''}
                sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    label="Data ważności (MM/RR)"
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                        inputLabel: { sx: { marginTop: -1.2 } },
                    }}
                    variant="outlined"
                    color="secondary"
                    value={cardExpiry}
                    onChange={handleExpiryChange}
                    fullWidth
                    error={cardExpiryError}
                    helperText={
                        cardExpiryError
                            ? 'Data ważności jest nieprawidłowa'
                            : ''
                    }
                />
                <TextField
                    label="CVC"
                    slotProps={{
                        input: {
                            readOnly: true,
                        },
                        inputLabel: { sx: { marginTop: -1.2 } },
                    }}
                    variant="outlined"
                    color="secondary"
                    value={cardCVC}
                    onChange={(e) =>
                        setCardCVC(
                            e.target.value.replace(/\D/g, '').slice(0, 3),
                        )
                    }
                    fullWidth
                    error={cardCVCError}
                    helperText={cardCVCError ? 'CVC jest wymagane' : ''}
                />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    gap: 1,
                }}
            >
                <Typography variant="body1">Do zapłaty</Typography>
                <Typography variant="h6">{`${sum.toFixed(2)} PLN`}</Typography>
            </Box>

            <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handlePayment}
                disabled={isProcessing}
            >
                ZAPŁAĆ
            </Button>

            <Snackbar
                open={openSuccess}
                autoHideDuration={3000}
                onClose={() => setOpenSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setOpenSuccess(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                    icon={<CheckCircleIcon sx={{ fontSize: 30 }} />}
                >
                    Płatność zakończona sukcesem!
                </Alert>
            </Snackbar>
            <Snackbar
                open={paymentError}
                autoHideDuration={3000}
                onClose={() => setPaymentError(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setPaymentError(false)}
                    severity="error"
                    sx={{ width: '100%' }}
                    icon={<ErrorIcon sx={{ fontSize: 30 }} />}
                >
                    Płatność nie powiodła się. Sprawdź dane karty.
                </Alert>
            </Snackbar>
            {isProcessing && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}
        </Box>
    );
};

export default PaymentPage;
