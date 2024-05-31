"use client";

import { useContract, useNFTs } from "@thirdweb-dev/react";

const Shop = () => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string
  );

  
  return (
    <div className="flex w-full pt-20 px-4">
      <h1>Shop</h1>
    </div>
  );
};

export default Shop;
