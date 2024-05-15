import { CollectionProps } from "@/types/global";
import { TiTick } from "react-icons/ti";

const TrendingCard = (data: CollectionProps) => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden rounded-lg text-base font-bold ">
      <div className="h-2/3 w-full ">
        <img
          src={data.image}
          alt="nft-collection"
          className=" object-cover w-full h-full hover:scale-105 transition-transform"
        />
      </div>
      <div className="h-1/3 text-white p-2 bg-black bg-opacity-80 w-full flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 ">
          {data.name}
          <div className="w-4 h-4 rounded-full bg-blue-600">
            <TiTick />
          </div>
        </div>

        <div className="w-full flex flex-row gap-10">
          <div className="flex flex-col">
            <div className=" font-normal">Floor</div>
            {`< ${data.floorPrice} ETH`}
          </div>

          <div className="flex flex-col">
            <div className=" font-normal">Total Volume</div>
            {`< ${data.volume} ETH`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
