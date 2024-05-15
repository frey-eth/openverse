import { NFTItemProps } from "@/types/global";
import Image from "next/image";
import { TiTick } from "react-icons/ti";

const HeaderCard = ({ title, image, price }: NFTItemProps) => {
  return (
    <>
      <div className="w-full h-full overflow-hidden rounded-lg relative shadow-inner">
        <Image
          src={image}
          alt="NFT"
          objectFit="cover"
          fill
          className=" hover:scale-110 transition-transform"
        />
        <div className="absolute bottom-0 flex flex-col w-full p-2 text-white bg-gradient-to-t from-black to-transparent ">
          <h3 className="font-bold flex flex-row items-center gap-2">
            {title}
            <div className="w-4 h-4 rounded-full bg-blue-600">
              <TiTick />
            </div>
          </h3>
          <p>{price} ETH</p>
        </div>
      </div>
    </>
  );
};

export default HeaderCard;
