import { createTheme } from '@mui/material';
import { ThemeMode } from '../api/theme/themeSlice.ts';
declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xs: true;
        sm: true;
        md: true;
        lg: true;
        xl: true;
        custom575: true;
    }
}
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        customColor: true;
    }
}
export const createCustomTheme = (mode: ThemeMode) => {
    const colorSchemes = {
        light: {
            palette: {
                primary: {
                    main: '#ffffff',
                    textContrast: '#000000',
                },
                secondary: {
                    main: '#52057B',
                },
                background: {
                    default: '#f8f8f8',
                },
                text: {
                    primary: '#000000',
                    secondary: '#222222',
                },
                customColor: {
                    main: '#ececec',
                    textContrast: '#000000',
                },
            },
        },
        dark: {
            mode: 'dark',
            palette: {
                primary: {
                    main: '#1E1E1E',
                    textContrast: '#ffffff',
                },
                secondary: {
                    main: '#533859',
                    textContrast: '#ffffff',
                },
                background: {
                    default: '#121212',
                    textContrast: '#ffffff',
                    paper: '#424242',
                },
                text: {
                    primary: '#ffffff',
                    secondary: '#d8d8d8',
                },
                customColor: {
                    main: '#808080',
                    textContrast: '#ffffff',
                },
            },
        },
    };

    return createTheme({
        ...colorSchemes[mode],
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
                custom575: 575,
            },
        },
    });
};
