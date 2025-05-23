import { Inter } from 'next/font/google';
import './globals.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import { MantineProvider } from '@mantine/core';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Impaction',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
