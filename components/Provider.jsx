'use client';

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes"

const Provider = ({ children, session }) => (
  <SessionProvider session={session}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  </SessionProvider>
)

export default Provider;
