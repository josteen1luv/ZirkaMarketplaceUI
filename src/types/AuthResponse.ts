export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
    userId: string;
    role: 'Buyer' | 'Seller' | 'SystemAdministrator';
};
