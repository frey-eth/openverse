import { useState } from "react";
import BrandImage from "@/images/demo2.jpg";
import Image from "next/image";
import { TiTick } from "react-icons/ti";

type TrendingItem = {
  name: string;
  floorPrice: number;
  volume: number;
};

const Ranking = () => {
  const [tab, setTab] = useState<"Trending" | "Top">("Trending");
  const tabs = ["Trending", "Top"];

  const data = [
    {
      name: "Azuki Manamoto",
      floorPrice: 0.0012,
      volume: 1291,
    },
    {
      name: "Aped Yah Club",
      floorPrice: 12,
      volume: 1291,
    },
    {
      name: "Bonk",
      floorPrice: 0.081,
      volume: 7319,
    },
    {
      name: "Bitcoin Original",
      floorPrice: 0.0012,
      volume: 101,
    },
    {
      name: "Ether Manamoto",
      floorPrice: 0.0012,
      volume: 191,
    },
  ];
  return (
    <div className="p-2 w-full">
      <div className="w-full flex flex-row justify-between h-10">
        <div className="flex flex-row items-center ">
          {tabs.map((t: any) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-sm font-semibold transition-all ${
                tab === t
                  ? " bg-slate-800 text-white"
                  : "bg-transparent text-black"
              } px-4 py-2 rounded`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap w-full">
        <div className="flex flex-col gap-1 px-4 py-2 lg:w-1/2 w-full">
          {/* Header */}
          <div className="grid grid-cols-10 gap-1 p-2 border-b text-xs text-slate-600 font-bold">
            <div className="col-span-1 ">Ranking</div>
            <div className="col-span-5 ">Name</div>
            <div className="col-span-2">Floor Price</div>
            <div className="col-span-2">Volume</div>
          </div>
          {/* Item */}
          {data.map((d: TrendingItem, i: number) => (
            <div className="grid grid-cols-10  gap-1 p-2 items-center font-bold">
              <div className="col-span-1 ">{i + 1}</div>
              <div className="col-span-5 flex flex-row items-center gap-1">
                <div className="w-[70px] h-[70px] rounded-lg overflow-hidden">
                  <Image src={BrandImage} alt="brand" objectFit="cover" />
                </div>
                <div className="overflow-hidden text-nowrap text-ellipsis">
                  {d.name}
                </div>
                <div className="w-4 h-4 rounded-full bg-blue-600">
                  <TiTick fill="white" />
                </div>
              </div>
              <div className="col-span-2">{d.floorPrice} ETH</div>
              <div className="col-span-2">{d.volume} ETH</div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1 px-4 py-2 lg:w-1/2 w-full">
          {/* Header */}
          <div className="grid grid-cols-10 gap-1 p-2 border-b text-xs text-slate-600 font-bold">
            <div className="col-span-1 ">Ranking</div>
            <div className="col-span-5 ">Name</div>
            <div className="col-span-2">Floor Price</div>
            <div className="col-span-2">Volume</div>
          </div>
          {/* Item */}
          {data.map((d: TrendingItem, i: number) => (
            <div className="grid grid-cols-10  gap-1 p-2 items-center font-bold">
              <div className="col-span-1 ">{i + 6}</div>
              <div className="col-span-5 flex flex-row items-center gap-1">
                <div className="w-[70px] h-[70px] rounded-lg overflow-hidden">
                  <Image src={BrandImage} alt="brand" objectFit="cover" />
                </div>
                <div className="overflow-hidden text-nowrap text-ellipsis">
                  {d.name}
                </div>
                <div className="w-4 h-4 rounded-full bg-blue-600">
                  <TiTick fill="white" />
                </div>
              </div>
              <div className="col-span-2">{d.floorPrice} ETH</div>
              <div className="col-span-2">{d.volume} ETH</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ranking;
