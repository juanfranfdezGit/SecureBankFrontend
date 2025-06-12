import { ReactNode } from 'react';
import '../css/index.css'

export const metadata = {
  title: 'Secure Bank',
  description: 'Login and Dashboard for Secure Bank',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}