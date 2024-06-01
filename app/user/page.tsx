"use client";

import ItemCard from "@/components/commons/card/ItemCard";
import { nftService } from "@/services/nft.service";
import { ApiNFTProps } from "@/types/global";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const Tabs = ["Collected", "Created"];

const User = () => {
  const { address, isConnected } = useAccount();
  const [currentTab, setCurrentTab] = useState(Tabs[0]);
  const { open } = useWeb3Modal();
  const [nftData, setNftData] = useState<ApiNFTProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const FetchNTFs = async (address: string) => {
    try {
      const res = await nftService.getNFTsByWallet(address, {
        chain: "base sepolia",
        format: "decimal",
        limit: 20,
        media_items: false,
      });
      if (res) {
        setNftData(res.data.result.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      FetchNTFs(address);
    } else {
      open();
    }
  }, [currentTab, address]);

  const groupNFTsByTokenAddress = (
    nfts: ApiNFTProps[]
  ): { [key: string]: ApiNFTProps[] } => {
    return nfts.reduce((acc, nft) => {
      if (!acc[nft.token_address]) {
        acc[nft.token_address] = [];
      }
      acc[nft.token_address].push(nft);
      return acc;
    }, {} as { [key: string]: ApiNFTProps[] });
  };

  const groupedNFTs = groupNFTsByTokenAddress(nftData);

  const sortedGroupedNFTs = Object.entries(groupedNFTs).reduce(
    (acc, [token_address, nfts]) => {
      acc[token_address] = nfts.sort(
        (a, b) => parseInt(a.block_number) - parseInt(b.block_number)
      );
      return acc;
    },
    {} as { [key: string]: ApiNFTProps[] }
  );

  const filteredNFTs = Object.entries(sortedGroupedNFTs).reduce(
    (acc, [token_address, nfts]) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      if (
        token_address.toLowerCase().includes(lowerCaseQuery) ||
        nfts.some(
          (nft) =>
            nft.name.toLowerCase().includes(lowerCaseQuery) ||
            nft.symbol.toLowerCase().includes(lowerCaseQuery)
        )
      ) {
        acc[token_address] = nfts;
      }
      return acc;
    },
    {} as { [key: string]: ApiNFTProps[] }
  );

  return (
    <div className="flex w-full flex-col gap-8 pt-[70px]">
      <div className="h-[200px] border-b w-full overflow-hidden">
        <img
          src="/images/demo4.jpg"
          alt="bg"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center items-center gap-3 w-full -mt-[150px]">
        <div className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-lg p-1 border bg-white">
          <img
            src="/images/demo1.jpg"
            alt="NFT Image"
            className="object-cover w-full h-full rounded-full border"
          />
        </div>
        <div className="font-semibold text-[16px] leading-[16px] rounded-full py-2 px-3 border shadow tracking-wider">
          {address?.slice(0, 6)}...{address?.slice(-4, address.length)}
        </div>
      </div>

      <div className="flex flex-col gap-8 md:px-10 px-3">
        <div className="flex md:flex-row items-center gap-4 justify-between">
          <div className="flex flex-row gap-3">
            {Tabs.map((tab: string, index: number) => {
              return (
                <div
                  key={index}
                  className={`font-semibold text-[20px] px-3 py-2 ${
                    tab == currentTab && "bg-black text-white"
                  } rounded-xl cursor-pointer`}
                  onClick={() => setCurrentTab(tab)}
                >
                  {tab}
                </div>
              );
            })}
          </div>

          <input
            type="text"
            placeholder="Search by address, name, or symbol"
            className="w-full max-w-sm px-6 py-2 border rounded outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {Object.entries(filteredNFTs).map(([token_address, nfts]) => {
          const { name, symbol } = nfts[0]; // Extract name and symbol from the first NFT in the group
          return (
            <div key={token_address} className="w-full flex flex-col gap-2">
              <h2 className="text-xl font-bold">
                {name} ({symbol})
              </h2>
              <div className="flex flex-wrap gap-6 w-full">
                {nfts.map((nft: ApiNFTProps, index: number) => {
                  return (
                    <ItemCard
                      key={index}
                      uri={nft.token_uri}
                      name={nft.name}
                      symbol={nft.symbol}
                      tokenId={nft.token_id}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default User;
