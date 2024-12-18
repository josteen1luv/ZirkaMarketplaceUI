import {
    AppBar,
    Avatar,
    Box,
    Button,
    ButtonGroup,
    CircularProgress,
    Container,
    Dialog,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { selectRole } from '../../api/user/userSlice.ts';
import { useSelector } from 'react-redux';
import { useGetCategoriesQuery } from '../../api/category/categoryApiSlice.ts';
import { Category } from '../../types/Category.ts';
import Search from '../search/Search.tsx';
import HeaderNav from './HeaderNav.tsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AppsIcon from '@mui/icons-material/Apps';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
export type OnThemeToggle = (event: React.MouseEvent<HTMLElement>) => void;
export type HeaderProps = {
    onThemeToggle: OnThemeToggle;
    isDarkMode: boolean;
};

const Header = ({ onThemeToggle, isDarkMode }: HeaderProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openNav = Boolean(anchorEl);
    const handleClickNav = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseNav = () => {
        setAnchorEl(null);
    };

    const role: 0 | 1 | 2 | null = useSelector(selectRole);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const { data } = useGetCategoriesQuery();
    const categories: Category[] | undefined = data;

    return (
        <AppBar>
            <Container
                maxWidth="xl"
                sx={{
                    px: {
                        xs: 0,
                        sm: 2,
                    },
                }}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Link to={'/'}>
                        <ButtonGroup
                            sx={{
                                display: 'flex',
                                gap: 1,
                                alignItems: 'center',
                                cursor: 'pointer',
                            }}
                        >
                            <Avatar
                                alt={'Zirka'}
                                src={'../../../public/sticker.webp'}
                                sx={{ width: 56, height: 56 }}
                            />
                            <Typography
                                variant="h6"
                                sx={{
                                    display: {
                                        xs: 'none',
                                        md: 'none',
                                        lg: 'block',
                                    },
                                    mr: 2,
                                    fontWeight: 700,
                                    letterSpacing: '.2rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                Zirka
                                <br />
                                Marketplace
                            </Typography>
                        </ButtonGroup>
                    </Link>
                    <Button
                        onClick={handleClickOpen}
                        variant="contained"
                        color="secondary"
                        sx={{
                            borderRadius: 4,
                            display: { xs: 'none', sm: 'block' },
                        }}
                    >
                        Kategorie
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        sx={{ div: { alignItems: 'flex-start' } }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 2,
                                padding: 2,
                            }}
                        >
                            {!categories ? (
                                <CircularProgress />
                            ) : (
                                categories.map((category) => (
                                    <Link
                                        to={`/category/${category.id}`}
                                        key={category.id}
                                    >
                                        <Button
                                            variant="contained"
                                            color="customColor"
                                            sx={{
                                                padding: 1.5,
                                                borderRadius: 2,
                                            }}
                                            key={category.id}
                                            onClick={handleClose}
                                        >
                                            <Typography>
                                                {category.name}
                                            </Typography>
                                        </Button>
                                    </Link>
                                ))
                            )}
                        </Box>
                    </Dialog>
                    <Search isDarkMode={isDarkMode} />
                    <Box sx={{ width: { md: 0, lg: 100 } }} />
                    {role === undefined ? (
                        <CircularProgress />
                    ) : (
                        <Box
                            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
                        >
                            <HeaderNav
                                isDarkMode={isDarkMode}
                                role={role}
                                onThemeToggle={onThemeToggle}
                            />
                        </Box>
                    )}
                    <IconButton
                        onClick={handleClickNav}
                        sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
                    >
                        {!openNav ? (
                            <ExpandMoreIcon
                                fontSize={'large'}
                                sx={{ color: isDarkMode ? 'white' : null }}
                            />
                        ) : (
                            <ExpandLessIcon
                                fontSize={'large'}
                                sx={{ color: isDarkMode ? 'white' : null }}
                            />
                        )}
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openNav}
                        onClose={handleCloseNav}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem sx={{ padding: 0 }} onClick={handleCloseNav}>
                            <IconButton
                                onClick={handleClickOpen}
                                sx={{
                                    display: { xs: 'inline-flex', sm: 'none' },
                                }}
                            >
                                <AppsIcon
                                    fontSize={'large'}
                                    sx={{ color: isDarkMode ? 'white' : null }}
                                />
                            </IconButton>
                        </MenuItem>
                        {role === 2 ? (
                            <MenuItem
                                sx={{ padding: 0 }}
                                onClick={handleCloseNav}
                            >
                                <Link to={'/cartPage'}>
                                    <IconButton aria-label="cart" size="large">
                                        <ShoppingCartIcon
                                            fontSize="inherit"
                                            sx={{
                                                color: isDarkMode
                                                    ? 'white'
                                                    : null,
                                            }}
                                        />
                                    </IconButton>
                                </Link>
                            </MenuItem>
                        ) : null}
                        <MenuItem sx={{ padding: 0 }} onClick={handleCloseNav}>
                            <Link to={role ? '/dashboard' : '/login'}>
                                <IconButton aria-label="profile" size="large">
                                    <PersonIcon
                                        fontSize="inherit"
                                        sx={{
                                            color: isDarkMode ? 'white' : null,
                                        }}
                                    />
                                </IconButton>
                            </Link>
                        </MenuItem>
                        <MenuItem sx={{ padding: 0 }} onClick={handleCloseNav}>
                            <IconButton onClick={onThemeToggle} size="large">
                                {isDarkMode ? (
                                    <Tooltip title="Dark Mode">
                                        <Brightness4Icon
                                            sx={{ color: 'white' }}
                                        />
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Light Mode">
                                        <Brightness7Icon
                                            sx={{ color: 'orange' }}
                                        />
                                    </Tooltip>
                                )}
                            </IconButton>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
