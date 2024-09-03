"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/NavBar";
import { UserProvider } from "./context/user/state";
import toast, { Toaster } from "react-hot-toast";
import { WalletProvider } from "./context/wallet/state";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <UserProvider>
            <Navbar />
            {children}
            <Toaster />
          </UserProvider>
        </WalletProvider>
      </body>
    </html>
  );
}
