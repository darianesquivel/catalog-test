import axios from 'axios';
//component
import React from 'react';
import { createTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import DrawerAppbar, { useStore } from './pages/DrawerAppbar';
import Routes from './pages/Routes';
import clsx from 'clsx';

axios.defaults.baseURL =
   process.env.NODE_ENV === 'production'
      ? 'https://catalog-test-server.onrender.com/'
      : 'http://localhost:3001/';

const useStyles = makeStyles((theme) => ({
   containerCloseDrawer: {
      marginLeft: theme.spacing(9),
      marginTop: theme.spacing(8),
      padding: theme.spacing(2),
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
   },
   containerOpenDrawer: {
      marginLeft: theme.spacing(30),
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   },
}));

function App() {
   const classes = useStyles();
   const mode = useStore((state: any) => state.mode);
   const drawerOpen = useStore((state: any) => state.open);

   const theme = React.useMemo(
      () =>
         createTheme({
            palette: {
               type: mode,
               ...(mode === 'light'
                  ? {
                       primary: {
                          main: '#6A5DF9',
                          light: '#DAD7FD',
                       },
                    }
                  : {
                       primary: {
                          main: '#978efb',
                          light: '#d7dafd',
                       },
                    }),
            },
            shape: {
               borderRadius: 8,
            },
            typography: {
               fontFamily: 'Inter, -apple-system, Arial, Sans-Serif',
               fontSize: 14,
               h6: {
                  fontFamily: 'Inter, -apple-system, Arial, Sans-Serif',
                  letterSpacing: '0.0075em',
               },
            },
         }),
      [mode]
   );

   return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
         <DrawerAppbar />
         <div
            className={clsx(classes.containerCloseDrawer, {
               [classes.containerOpenDrawer]: drawerOpen,
            })}
         >
            <Routes />
         </div>
      </ThemeProvider>
   );
}

export default App;
