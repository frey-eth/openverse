import { ApiNFTProps } from "@/types/global";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import { useWriteContract } from "wagmi";
import nft_abi from "../../contract/nft_abi.json";
import market_abi from "../../contract/market_abi.json";
import { parseEther } from "viem";

type SellModalProps = {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  data: ApiNFTProps;
};

export default function SellModal({
  openModal,
  setOpenModal,
  data,
}: SellModalProps) {
  function close() {
    setOpenModal(false);
  }
  const [price, setPrice] = useState(0);
  const { writeContractAsync } = useWriteContract();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    await writeContractAsync({
      abi: nft_abi,
      address: process.env.NEXT_PUBLIC_NFT_ADDRESS as string,
      functionName: "approve",
      args: [process.env.NEXT_PUBLIC_MARKET_ADDRESS, data.token_id],
    });

    await writeContractAsync({
      abi: market_abi,
      address: process.env.NEXT_PUBLIC_MARKET_ADDRESS as string,
      functionName: "createListingItem",
      args: [parseInt(data.token_id), parseEther(price.toString())],
    });
    setLoading(false);
    close();
  };

  return (
    <>
      <Transition appear show={openModal}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-md rounded-xl bg-black bg-opacity-70 p-6 backdrop-blur-2xl">
                  <DialogTitle
                    as="h3"
                    className="text-base/7 font-medium text-white"
                  >
                    Sell Your NFT in Openverse Marketplace
                  </DialogTitle>
                  <p className="mt-2 text-sm/6 text-white/50 w-full flex flex-row items-center gap-2">
                    {data.token_address}{" "}
                    <FaRegCopy className=" cursor-pointer" />
                  </p>
                  <div className="flex flex-row w-full mt-2 gap-3">
                    <img
                      src={data.token_uri}
                      alt="your nft"
                      className="w-[200px] h-[200px] rounded-lg border-4 shadow-xl object-cover"
                    />
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col">
                        <label className="text-white/50">
                          Collection:{" "}
                          <span className="text-white text-[14px] font-bold">
                            {data.name}{" "}
                          </span>
                        </label>
                        <label className="text-white/50">
                          Token ID:
                          <span className="text-white text-[14px] font-bold">
                            {" "}
                            #{data.token_id}{" "}
                          </span>
                        </label>

                        <label className="text-white">Price</label>
                        <div className="flex flex-row gap-1">
                          <input
                            onChange={(e) =>
                              setPrice(parseFloat(e.target.value))
                            }
                            type="number"
                            className=" outline-none w-[100px] bg-transparent border rounded-lg text-white px-2"
                          />
                          <p className="text-white/50 font-bold">$ETH</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 w-full flex justify-end">
                    <Button
                      className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      {loading ? (
                        <div className="relative">
                          <div className="h-6 w-6 rounded-full border-t-2 border-b-2 border-gray-200"></div>
                          <div className="absolute top-0 left-0 h-6 w-6 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
                        </div>
                      ) : (
                        "Sell"
                      )}
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
