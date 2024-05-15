import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "@/components/header/page";
import Footer from "@/components/footer/page";
import { cookieToInitialState } from "wagmi";
import Web3ModalProvider from "@/provider/web3modal";
import { config } from "@/config/web3config";
import { headers } from "next/headers";

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
        <Web3ModalProvider initialState={initialState}>
          <Header />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </Web3ModalProvider>
      </body>
    </html>
  );
}
