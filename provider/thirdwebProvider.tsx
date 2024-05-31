"use client";

import React, { ReactNode } from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";

export default function ThirdProvider({ children }: { children: ReactNode }) {
  return (
    <ThirdwebProvider
      clientId="8555f05d8c46bc9564f17bc345fa1b06"
      activeChain={"base-sepolia-testnet"}
    >
      {children}
    </ThirdwebProvider>
  );
}
