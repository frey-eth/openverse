"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MediaRenderer, useStorageUpload } from "@thirdweb-dev/react";
import { IoCloudUpload } from "react-icons/io5";
import toast from "react-hot-toast";
import { useWriteContract } from "wagmi";
import abi from "../../../contract/nft_abi.json";
import { parseEther } from "viem";

type CollectionContractType = {
  logo: FileList;
  name: string;
  symbol: string;
};

const MintNFT = () => {
  const { mutateAsync: upload } = useStorageUpload();
  const [nft, setNft] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNft(e.target.files[0]);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CollectionContractType>();

  const { writeContract, isLoading, isSuccess, isError } = useWriteContract();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to mint NFT");
    }
    if (isSuccess) {
      toast.success("You have mint an NFT");
    }
  }, [isLoading]);

  const onSubmit: SubmitHandler<CollectionContractType> = async (
    submitData
  ) => {
    console.log(submitData);
    try {
      if (!nft) {
        console.log("No image selected");
        return;
      }
      setLoading(true);
      const uri = await upload({ data: [nft] });
      if (uri[0]) {
        console.log("Uploaded image URI:", uri);
        writeContract({
          abi,
          address: process.env.NEXT_PUBLIC_NFT_ADDRESS as string,
          functionName: "mintNFT",
          args: [uri[0]],
          value: parseEther("0"),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full px-4 pt-20 flex justify-center items-center min-h-screen">
      <div className="flex max-md:flex-col-reverse flex-row gap-5 p-5 border rounded-lg max-md:w-full">
        <form
          className="flex flex-col gap-3 border rounded-md p-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-2xl font-bold">Openverse Collection</h3>

          <p>Mint your NFT by uploading an image and filling in the details.</p>
          <div className="flex sm:flex-row items-center justify-center">
            <label htmlFor="logo" className="cursor-pointer">
              <div className="w-[200px] h-[200px] rounded-md border border-collapse flex items-center justify-center overflow-hidden p-2  mt-2">
                {nft ? (
                  <img
                    src={URL.createObjectURL(nft)}
                    alt="NFT Image Preview"
                    className="object-cover w-full h-full rounded-sm"
                  />
                ) : (
                  <IoCloudUpload className="w-[100px] h-[100px]" />
                )}
              </div>
            </label>

            <input
              type="file"
              id="logo"
              accept="image/*"
              className="hidden"
              {...register("logo", { required: true })}
              onChange={handleImageChange}
            />
          </div>
          {errors.logo && (
            <p className="text-red-500 text-center">Image is required</p>
          )}
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="p-2 bg-black w-20 h-10 text-white rounded-md shadow-md flex items-center justify-center"
              disabled={loading}
            >
              {loading || isLoading ? (
                <div className="relative">
                  <div className="h-6 w-6 rounded-full border-t-2 border-b-2 border-gray-200"></div>
                  <div className="absolute top-0 left-0 h-6 w-6 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
                </div>
              ) : (
                "Mint"
              )}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center">
          <MediaRenderer
            src={
              "ipfs://QmPzz9dEgKLndv6dHpYh69Z8ecQb2fVA6o488wBADSB5hf/nft.gif"
            }
            alt="Openverse NFT"
            className="w-full rounded-md shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default MintNFT;
