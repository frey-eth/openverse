"use client";
import Link from "next/link";
import { useState } from "react";
import { GiSpaceship } from "react-icons/gi";
import { GiFireDash } from "react-icons/gi";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { IoMenu } from "react-icons/io5";

const Header = () => {
  const [isCollectionOpen, SetCollectionOpen] = useState(false);
  const { address } = useAccount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const rightMenuItem = [
    {
      title: "Drops",
      url: "/",
    },
    {
      title: "Stats",
      url: "/",
    },
    {
      title: "Create",
      url: "/create",
    },
  ];

  const collectionsMenu = [
    { title: "All", url: "/" },
    { title: "Gaming", url: "/collections/gaming" },
    { title: "Art", url: "/collections/art" },
  ];

  const { open } = useWeb3Modal();

  return (
    <>
      <header className="sm:h-[72px] border-b fixed w-full items-center py-1 px-3 z-[100] backdrop-blur max-lg:hidden">
        <div className="h-full w-full flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-3">
            <Link href={"/"} className="flex flex-row items-center">
              <GiSpaceship className="text-[60px] text-cyan-500" />
              <h1 className="text-2xl font-bold ml-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-violet-500 pr-3 border-r">
                Openverse
              </h1>
            </Link>
            <div className="flex flex-row gap-3 text-black">
              {rightMenuItem.map((item, index) => (
                <Link
                  className="px-2 font-semibold text-[17px] hover:text-cyan-500 transition-all duration-300 ease-in-out"
                  href={item.url}
                  key={index}
                >
                  {item.title}
                </Link>
              ))}
              <div className="flex flex-col relative h-full">
                <div
                  className=" flex flex-row items-center font-semibold text-[17px] hover:text-cyan-500 transition-all duration-300 ease-in-out cursor-pointer "
                  onClick={() => SetCollectionOpen(!isCollectionOpen)}
                >
                  Collections <IoChevronDown />
                </div>
                {isCollectionOpen && (
                  <div className="absolute top-[30px] z-10 mt-2 w-48 rounded-md shadow-lg bg-white ">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {collectionsMenu.map((item, index) => (
                        <Link
                          href={item.url}
                          key={index}
                          onClick={() => SetCollectionOpen(false)}
                        >
                          <div
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            role="menuitem"
                          >
                            {item.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-1">
            <div className="flex flex-row rounded items-center justify-center bg-gray-200  py-2 px-3 gap-2">
              <FaSearch className="text-[20px]" />
              <input
                type="text"
                className="flex-1 min-w-[400px] outline-none bg-transparent "
                placeholder="Search"
              />
              <div className="border p-1 ">/</div>
            </div>
          </div>
          <div className="flex flex-row gap-3 items-center font-normal">
            <button
              onClick={() => open()}
              className="flex flex-row bg-slate-100 rounded-lg  text-[17px] p-2 items-center justify-center gap-2 font-semibold hover:text-red-500 transition-all duration-300 ease-in-out shadow"
            >
              <GiFireDash className="text-[24px] " />
              {address
                ? `${address.slice(0, 6)}...${address.slice(
                    -6,
                    address.length
                  )}`
                : "Login"}
            </button>

            <Link
              href={"/user"}
              className="flex h-full flex-row bg-slate-100 rounded-lg  p-2  items-center justify-center gap-2 shadow"
            >
              <FaRegCircleUser className="text-[24px]" />
            </Link>

            <button className="flex h-full flex-row bg-slate-100 rounded-lg  p-2  items-center justify-center gap-2 shadow">
              <MdOutlineShoppingCart className="text-[24px]" />
            </button>
          </div>
        </div>
      </header>

      <header className="lg:hidden fixed w-full justify-between flex flex-row items-center backdrop-blur px-3 py-2 border-b shadow z-[100]">
        <div className="flex flex-row items-center gap-3">
          <Link href={"/"} className="flex flex-row items-center">
            <GiSpaceship className="text-[40px] text-cyan-500" />
            <h1 className="text-xl font-bold ml-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-violet-500 pr-3 ">
              Openverse
            </h1>
          </Link>
        </div>
        <div className="flex flex-row items-center gap-3">
          <button className="" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <IoMenu className="text-[24px] " />
          </button>
        </div>

        {isMenuOpen && (
          <div className="absolute  top-[60px] right-0 w-full bg-white shadow-lg z-[1000]">
            <div className="flex flex-col gap-3 p-3 z-[1000]">
              {rightMenuItem.map((item, index) => (
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  className="px-2 font-semibold text-[17px] hover:text-cyan-500 transition-all duration-300 ease-in-out"
                  href={item.url}
                  key={index}
                >
                  {item.title}
                </Link>
              ))}
              <div className="flex flex-row justify-center items-center gap-2">
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  href={"/user"}
                  className="flex h-full flex-row bg-slate-100 rounded-lg  p-2  items-center justify-center gap-2 shadow"
                >
                  <FaRegCircleUser className="text-[24px]" />
                </Link>
                <button
                  onClick={() => open()}
                  className="flex flex-row bg-slate-100 rounded-lg  text-[17px] p-2 items-center justify-center gap-2 font-semibold hover:text-red-500 transition-all duration-300 ease-in-out shadow"
                >
                  <GiFireDash className="text-[24px] " />
                  {address
                    ? `${address.slice(0, 6)}...${address.slice(
                        -6,
                        address.length
                      )}`
                    : "Login"}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
