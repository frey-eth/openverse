import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";
import { cookieToInitialState } from "wagmi";
import Web3ModalProvider from "@/provider/web3modal";

import { config } from "@/config/web3config";
import { headers } from "next/headers";
import ThirdProvider from "@/provider/thirdwebProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Openverse",
  description: "Openverse is NFT Marketplace for digital art",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className=" bg-white">
        <ThirdProvider>
          <Web3ModalProvider initialState={initialState}>
            <Header />
            <div className="min-h-screen">{children}</div>
            <Footer />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 5000,
              }}
            />
          </Web3ModalProvider>{" "}
        </ThirdProvider>
      </body>
    </html>
  );
}
