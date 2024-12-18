import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useGetUserQuery } from '../../api/user/authApiSlice.ts';
import { useSelector } from 'react-redux';
import { selectId, selectIsAuth } from '../../api/user/userSlice.ts';
import { Roles, User } from '../../types/User.ts';
import DashBoardHome from './DashBoardHome.tsx';
import DashBoardProfile from './DashBoardProfile.tsx';
import DashBoardSettings from './DashBoardSettings.tsx';
import DashBoardMenu from './DashBoardMenu.tsx';
import DashBoardProducts from './DashBoardProducts.tsx';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [activeView, setActiveView] = useState<
        'home' | 'profile' | 'settings' | 'products'
    >('home');
    const id = useSelector(selectId) as string;
    const { data } = useGetUserQuery(id, {
        skip: !id,
    });
    const userInfo: User | undefined = data;

    const isAuth = useSelector(selectIsAuth);

    const navigate = useNavigate();
    const initial: User = {
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        role: 1 as Roles,
    };
    const [user, setUser] = useState(initial);

    useEffect(() => {
        if (userInfo) {
            const { firstName, lastName, email, userName, role } = userInfo;
            const newUserState = { firstName, lastName, email, userName, role };

            setUser(newUserState);
        }
    }, [userInfo]);
    if (!isAuth) {
        navigate('/login');
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column-reverse', sm: 'row' },
                alignItems: { xs: 'center', sm: 'flex-start' },
                minHeight: '100vh',
                height: 'auto',
                pt: { xs: 9, sm: 10 },
            }}
        >
            <DashBoardMenu
                activeView={activeView}
                setActiveView={setActiveView}
            />
            <Box sx={{ flex: 1, m: 2, mb: { xs: 14, sm: 2 } }}>
                {activeView === 'home' && <DashBoardHome user={user} />}
                {activeView === 'profile' && <DashBoardProfile user={user} />}
                {activeView === 'settings' && <DashBoardSettings user={user} />}
                {activeView === 'products' && <DashBoardProducts />}
            </Box>
        </Box>
    );
};
export default Dashboard;
