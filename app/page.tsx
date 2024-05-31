"use client";

// Import Swiper styles
import { useReadContract } from "wagmi";
import Ranking from "@/components/ranking/page";
import Collection from "@/components/collection/page";
import Highlight from "@/components/highlight/page";
import { CollectionProps } from "@/types/global";

type NFTProps = {
  owner: string;
  price: BigInt;
  seller: string;
  sold: boolean;
  tokenId: BigInt;
};

export default function Home() {

  const collectionsData: CollectionProps[] = [
    {
      name: "Pixelmon",
      volume: 100,
      floorPrice: 0.1,
      image: "/images/demo1.jpg",
    },
    {
      name: "Interstellar",
      volume: 80,
      floorPrice: 0.01,
      image: "/images/demo2.jpg",
    },

    {
      name: "Onchain Blobs",
      volume: 100,
      floorPrice: 0.1,
      image: "/images/demo3.jpg",
    },
    {
      name: "Base Gods",
      volume: 80,
      floorPrice: 0.01,
      image: "/images/demo4.jpg",
    },

    {
      name: "Pixelmon",
      volume: 150,
      floorPrice: 0.1,
      image: "/images/demo1.jpg",
    },
    {
      name: "Interstellar",
      volume: 980,
      floorPrice: 0.01,
      image: "/images/demo2.jpg",
    },
  ];

  return (
    <main className="px-3 pt-[80px] flex flex-col justify-center z-[0] gap-3">
      <Highlight />
      <Ranking />
      <section className=" flex flex-col gap-8 w-full">
        <Collection title="Notable collections" collections={collectionsData} />
        <Collection
          title="Spotlight on Base Collections"
          collections={collectionsData.reverse()}
        />
      </section>
    </main>
  );
}
