"use client";

import { nftService } from "@/services/nft.service";
import {
  ApiNFTProps,
  GetAllByContractType,
  SellItemType,
} from "@/types/global";
import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import market_abi from "../../../contract/market_abi.json";
import SellCard from "@/components/commons/card/SellCard";

const SingleCollection = () => {
  const [nftData, setNftData] = useState<ApiNFTProps[]>([]);
  const respone = useReadContract({
    abi: market_abi,
    address: process.env.NEXT_PUBLIC_MARKET_ADDRESS as string,
    functionName: "getAllListingItems",
  });
  const getSeller = respone.data as GetAllByContractType[];
  const FetchNTFs = async (address: string) => {
    try {
      const res = await nftService.getNFTsByWallet(address, {
        chain: "base sepolia",
        format: "decimal",
        limit: 20,
        media_items: false,
      });
      if (res) {
        setNftData(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchNTFs(process.env.NEXT_PUBLIC_MARKET_ADDRESS as string);
  }, []);

  const NFTCombined = nftData.map((item1) => {
    const combinedItem =
      getSeller &&
      getSeller.find(
        (item2: GetAllByContractType) =>
          item1.token_id == item2?.tokenId.toString()
      );
    return {
      ...item1,
      price: combinedItem?.price,
      seller: combinedItem?.seller, // Ensure tokenId is a string to match token_id
    };
  });

  return (
    <div className="pt-[70px] flex flex-col gap-8 w-full">
      <div className="w-full h-[250px] relative">
        <img
          src="/images/demo4.jpg"
          alt="bg"
          className="w-full h-full object-cover absolute z-0"
        />
        <div className="absolute w-full h-full bg-black bg-opacity-30 z-[1]" />
        <div className="flex text-white flex-col absolute z-[2] bottom-0 w-full p-5 gap-2">
          <img
            src="/images/atom.png"
            alt="hehe"
            className="w-20 h-20 rounded-lg"
          />
          <div className="flex flex-row items-center w-full justify-between">
            <h1 className="text-[24px] leading-[24px] font-bold">
              Atom Solution
            </h1>
            <div className="flex flex-row items-center gap-5">
              <div className="flex flex-col gap-1 text-[16px] leading-[16px]">
                108,385 ETH
                <p className="text-white opacity-80">Total Volume</p>
              </div>
              <div className="flex flex-col gap-1 text-[16px] leading-[16px]">
                0.0001 ETH
                <p className="text-white opacity-80">Floor Price</p>
              </div>
              <div className="flex flex-col gap-1 text-[16px] leading-[16px]">
                --
                <p className="text-white opacity-80">Best Offer</p>
              </div>

              <div className="flex flex-col gap-1 text-[16px] leading-[16px]">
                2,958 (30%)
                <p className="text-white opacity-80">Owners (Unique)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 px-4">
        {NFTCombined &&
          NFTCombined.length > 0 &&
          NFTCombined.map((nft: SellItemType, index: number) => (
            <SellCard key={index} data={nft} />
          ))}
      </div>
    </div>
  );
};

export default SingleCollection;
