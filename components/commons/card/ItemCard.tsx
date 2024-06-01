type ItemCardProps = {
  uri: string;
  name: string;
  symbol: string;
  tokenId: string;
};

const ItemCard = ({ uri, name, symbol, tokenId }: ItemCardProps) => {
  return (
    <div className="flex flex-col rounded-lg shadow-md p-2 gap-3 cursor-pointer">
      <div className="w-[250px] h-[250px] rounded-md overflow-hidden">
        <img
          src={uri}
          alt="Your NFT"
          className="object-cover w-full h-full hover:scale-110 transition-transform duration-500 ease-in-out"
        />
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className=" font-bold text-[16px] leading-[16px]">#{tokenId}</h1>
          <h2 className=" font-medium text-[16px] leading-[16px]">
            {name} <span className="font-bold uppercase">{symbol}</span>
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
