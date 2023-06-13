import { createTheme } from '@mui/material/styles';

// etherisc main colors
// red: EE4620
// blue: 5081F4
// green: 41D895
// yellow: F8B83A
// dark gray: 333F52
// light gray: C5D0DE

export const etheriscTheme = createTheme({
    palette: {
        background: {
            // default: 'hsl(222,74%,96%)',
            // paper: 'hsl(222,74%,96%)'
        },
        primary: {
            light: '#5C6C8C',
            main: '#374B72',
            dark: '#142B59',
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            // main: "#9577F7", // purple
            main: "#5AB9E6", // yellow
            // dark: will be calculated from palette.secondary.main,
            // contrastText: will be calculated to contrast with palette.secondary.main
            contrastText: "#fff" // white
            // contrastText: "#000000DE" // black
        },
    },
    components: {
        MuiIcon: {
            styleOverrides: {
                root: {
                    // Match 24px = 3 * 2 + 1.125 * 16
                    boxSizing: 'content-box',
                    padding: 3,
                    fontSize: '1.125rem',
                },
            },
        },
    },
});

export const INPUT_VARIANT = 'filled';
