import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    TextField,
    MenuItem,
    Card,
} from '@mui/material';
import { useGetUserQuery } from '../../api/user/authApiSlice.ts';
import { useSelector } from 'react-redux';
import { selectId } from '../../api/user/userSlice.ts';
import { Roles, User } from '../../types/User.ts';
import DashBoardHome from './DashBoardHome.tsx';
import DashBoardProfile from './DashBoardProfile.tsx';
import DashBoardSettings from './DashBoardSettings.tsx';
import DashBoardMenu from './DashBoardMenu.tsx';
import DashBoardProducts from './DashBoardProducts.tsx';

const Dashboard = () => {
    const [activeView, setActiveView] = useState<
        'home' | 'profile' | 'settings' | 'products'
    >('home');
    const id = useSelector(selectId);
    const { data } = useGetUserQuery(id as string);
    const userInfo: User | undefined = data;

    const initial: User = {
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        role: 1 as Roles,
    };
    const [user, setUser] = useState(initial);

    const [initialUser, setInitialUser] = useState(user);

    useEffect(() => {
        if (userInfo) {
            const { firstName, lastName, email, userName, role } = userInfo;
            const newUserState = { firstName, lastName, email, userName, role };

            setUser(newUserState);
            setInitialUser(newUserState);
        }
    }, [userInfo]);

    const handleChange = (
        event:
            | React.ChangeEvent<HTMLInputElement>
            | { target: { name: string; value: string } },
    ) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const isFormValid = () => {
        return (
            user.firstName &&
            user.lastName &&
            user.email &&
            user.userName &&
            user.role
        );
    };

    return (
        <Box sx={{ display: 'flex', height: 'flex', margin: '80px' }}>
            <DashBoardMenu
                activeView={activeView}
                setActiveView={setActiveView}
            />
            <Box sx={{ flex: 1, padding: '20px' }}>
                {activeView === 'home' && <DashBoardHome user={user} />}
                {activeView === 'profile' && <DashBoardProfile user={user} />}
                {activeView === 'settings' && <DashBoardSettings user={user} />}
                {activeView === 'products' && <DashBoardProducts />}
            </Box>
        </Box>
    );
};
export default Dashboard;
