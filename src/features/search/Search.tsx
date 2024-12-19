import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    alpha,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemText,
    styled,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useGetProductsQuery } from '../../api/product/productApiSlice.ts';
import { Link } from 'react-router-dom';
import CancelIcon from '@mui/icons-material/Cancel';

interface Props {
    isDarkMode: boolean;
}

const SearchContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${alpha(theme.palette.common.black, 0.2)}`,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '90%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(2, 1, 2, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
    },
}));

const Search = React.memo(({ isDarkMode }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const handleSearchTermChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value);
        },
        [],
    );

    const { data, isLoading, isError, error } = useGetProductsQuery(
        { name: debouncedSearchTerm },
        { skip: !debouncedSearchTerm },
    );
    const products = data?.items;

    return (
        <>
            <SearchContainer sx={{ flexGrow: 1, display: 'flex' }}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    sx={{ flexGrow: 1 }}
                    placeholder="Search…"
                    inputRef={inputRef}
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                />
                <IconButton onClick={() => setSearchTerm('')}>
                    <CancelIcon sx={{ color: isDarkMode ? 'white' : null }} />
                </IconButton>
            </SearchContainer>
            {!isLoading && debouncedSearchTerm && products && (
                <List
                    sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: 'background.paper',
                        maxHeight: 300,
                        overflowY: 'auto',
                        border: `1px solid ${alpha('#000', 0.2)}`,
                    }}
                >
                    {isError && (error as Error) ? (
                        <ListItem key={'error'}>
                            <ListItemText primary="Error fetching products" />
                        </ListItem>
                    ) : products.length === 0 ? (
                        <ListItem key={'noResults'}>
                            <ListItemText primary="No results found" />
                        </ListItem>
                    ) : (
                        products.map((product: any) => (
                            <ListItem key={product.id}>
                                <Link
                                    to={`products/${product.id}`}
                                    onClick={() => setSearchTerm('')}
                                >
                                    <ListItemText
                                        key={product.id}
                                        primary={product.name}
                                        secondary={`Cena: ${product.price} PLN`}
                                    />
                                </Link>
                            </ListItem>
                        ))
                    )}
                </List>
            )}
        </>
    );
});

export default Search;
