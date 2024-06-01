import { ApiNFTProps } from "@/types/global";

const ItemCard = ({ data }: { data: ApiNFTProps }) => {
  return (
    <div className="flex flex-col rounded-lg shadow-md p-2 gap-3 cursor-pointer">
      <div className="w-[250px] h-[250px] rounded-md overflow-hidden">
        <img
          src={data.token_uri}
          alt="Your NFT"
          className="object-cover w-full h-full hover:scale-110 transition-transform duration-500 ease-in-out"
        />
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className=" font-bold text-[16px] leading-[16px]">
            #{data.token_id}
          </h1>
          <h2 className=" font-medium text-[16px] leading-[16px]">
            {data.name}{" "}
            <span className="font-bold uppercase">{data.symbol}</span>
          </h2>
        </div>
        <p className=" text-slate-700 text-[14px] leading-[14px] font-bold">
          {"Mint Price < 0.1 ETH"}{" "}
        </p>
      </div>
    </div>
  );
};
export default ItemCard;
