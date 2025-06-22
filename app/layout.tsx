"use client";
import { Oswald, Londrina_Solid, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { PrivyProvider } from "@privy-io/react-auth";
import { privyConfig } from "../lib/privyConfig";
import { config } from "../lib/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "@privy-io/wagmi";
import Navbar from "@/components/Navbar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={`${spaceGrotesk.className} `}>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
          config={privyConfig}
        >
          <QueryClientProvider client={queryClient}>
            <WagmiProvider config={config}>
              <Navbar />
              {children}
            </WagmiProvider>
          </QueryClientProvider>
        </PrivyProvider>
      </body>
    </html>
  );
}
