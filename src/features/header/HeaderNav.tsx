import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { OnThemeToggle } from './Header.tsx';
type Props = {
    role: number;
    isDarkMode: boolean;
    onThemeToggle: OnThemeToggle;
};
const HeaderNav = ({ role, isDarkMode, onThemeToggle }: Props) => {
    return (
        <>
            {role === 2 ? (
                <Link to={'/cartPage'}>
                    <IconButton aria-label="cart" size="large">
                        <ShoppingCartIcon
                            fontSize="inherit"
                            sx={{ color: isDarkMode ? 'white' : null }}
                        />
                    </IconButton>
                </Link>
            ) : null}
            <Link to={role ? '/dashboard' : '/login'}>
                <IconButton aria-label="profile" size="large">
                    <PersonIcon
                        fontSize="inherit"
                        sx={{ color: isDarkMode ? 'white' : null }}
                    />
                </IconButton>
            </Link>
            <IconButton onClick={onThemeToggle} size="large">
                {isDarkMode ? (
                    <Tooltip title="Dark Mode">
                        <Brightness4Icon sx={{ color: 'white' }} />
                    </Tooltip>
                ) : (
                    <Tooltip title="Light Mode">
                        <Brightness7Icon sx={{ color: 'orange' }} />
                    </Tooltip>
                )}
            </IconButton>
        </>
    );
};

export default HeaderNav;
