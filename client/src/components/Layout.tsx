import React, { PropsWithChildren } from 'react';
import { ThemeProvider } from '@mui/material';
import AppToolbar from './AppToolbar';
import theme from '../theme';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <header>
        <AppToolbar />
      </header>

      <main style={{ marginTop: 65 }}>{children}</main>
    </ThemeProvider>
  );
};

export default Layout;
