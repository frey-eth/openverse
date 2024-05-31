"use client";
import CollectionImage from "@/images/demo1.jpg";
import CollectionImage2 from "@/images/demo2.jpg";
import { GiSpaceship } from "react-icons/gi";
import { CgMenuGridR } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import { IoImageSharp } from "react-icons/io5";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
const CreatePage = () => {
  return (
    <div className="flex flex-wrap w-full h-full pt-20 px-4  overflow-hidden">
      <div className="md:w-1/2 w-full h-[600px] text-black flex flex-col justify-end px-4 gap-4">
        <div className="text-3xl font-bold flex flex-row gap-1 items-center">
          <div className="w-fit h-fit rounded-full bg-black  shadow">
            <GiSpaceship className=" text-white" />
          </div>
          Create
        </div>
        <div className="flex flex-col w-full gap-2">
          <Link
            href={"create/deploy-contract"}
            className="flex flex-row items-center w-full rounded-lg bg-black bg-opacity-20 p-4"
          >
            <div className="flex flex-col gap-2 flex-1">
              <div className="font-bold text-xl flex flex-row items-center gap-1">
                <CgMenuGridR className=" text-black" />
                Drop a collection
              </div>
              <div className="flex flex-row items-center">
                <span className="text-md leading-md text-primary flex-1">
                  Launch your NFT collection for others to purchase. Your items
                  won't display until they've been minted.
                </span>
              </div>
            </div>
            <IoIosArrowForward className="text-[40px] cursor-pointer" />
          </Link>

          <Link
            href={"create/mint-nft"}
            className="flex flex-row items-center w-full rounded-lg bg-black bg-opacity-20 p-4"
          >
            <div className="flex flex-col gap-2 flex-1">
              <div className="font-bold text-xl flex flex-row items-center gap-1">
                <IoImageSharp className=" text-black" />
                Mint an NFT
              </div>
              <div className="flex flex-row items-center">
                <span className="text-md leading-md text-primary flex-1">
                  Creata a public collection and immediately mint NFTs directly
                  to your wallet to own or list for sale.
                </span>
              </div>
            </div>
            <IoIosArrowForward className="text-[40px] cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="md:w-1/2 w-full h-[600px] rounded-xl overflow-hidden shadow">
        <Swiper
          className="w-full h-full"
          scrollbar={{ draggable: true }}
          slidesPerView={1}
          autoplay={{ delay: 500 }}
          loop={true}
        >
          <SwiperSlide className="w-full h-full">
            <Image
              src={CollectionImage}
              alt="image"
              objectFit="cover"
              className="w-full h-full"
              fill
            />
          </SwiperSlide>

          <SwiperSlide className="w-full h-full">
            <Image
              src={CollectionImage2}
              alt="image"
              objectFit="cover"
              className="w-full h-full"
              fill
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default CreatePage;
