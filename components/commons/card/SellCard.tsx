import { MdAddShoppingCart } from "react-icons/md";
import { useWriteContract } from "wagmi";
import market_abi from "../../../contract/market_abi.json";
import { SellItemType } from "@/types/global";

const SellCard = ({ data }: { data: SellItemType }) => {
  const { writeContract } = useWriteContract();

  const handleBuyItem = () => {
    writeContract({
      abi: market_abi,
      address: process.env.NEXT_PUBLIC_MARKET_ADDRESS as string,
      functionName: "buyListingItem",
      args: [data.token_id],
      value: data.price as bigint,
    });
  };
  return (
    <div className="flex flex-col gap-3 max-w-sm border shadow-xl rounded-lg overflow-hidden">
      <div className="w-[250px] h-[250px] overflow-hidden rounded-lg">
        <img
          src={data?.token_uri}
          alt="token"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="w-full p-2 gap-3 flex flex-col">
        <h2 className="font-bold text-[16px] leading-[16px] p-2 border rounded-md w-fit">
          #{data?.token_id}
        </h2>
        <h3 className="w-full">
          <span className="font-bold text-[14px] leading-[14px]">Owner</span>{" "}
          <span className="tracking-wider ">
            {data.seller?.slice(0, 6)}...
            {data.seller?.slice(-4, data.seller?.length)}
          </span>
        </h3>

        <h3 className=" font-bold text-[16px] leading-4">
          {data.price && parseInt(data.price.toString()) / 10 ** 18} ETH
        </h3>
      </div>

      <button
        onClick={handleBuyItem}
        className="p-3 w-full h-10 font-bold bg-blue-500 text-white text-[16px] leading-[16px] flex flex-row items-center gap-2 justify-center"
      >
        Buy <MdAddShoppingCart size={20} />
      </button>
    </div>
  );
};

export default SellCard;
