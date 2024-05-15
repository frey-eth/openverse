"use client";
import React, { useRef, useState } from "react";
import { CiCircleAlert } from "react-icons/ci";
import { PiImageBrokenDuotone } from "react-icons/pi";
import { IoIosListBox } from "react-icons/io";
import { PiShootingStarThin } from "react-icons/pi";
import { FaPencil } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { SubmitHandler, useForm } from "react-hook-form";

type CollectionContractType = {
  logo: FileList;
  name: string;
  symbol: string;
};

const DeployContract = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const uploadRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CollectionContractType>();
  const onSubmit: SubmitHandler<CollectionContractType> = (data) => {
    console.log(data);
  };

  const handleImageUpload = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("logo", event.target?.files); // Set the file input value in react-hook-form
    }
  };

  const handleLogoClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("logo", event.dataTransfer.files); // Set the file input value in react-hook-form
    }
  };

  return (
    <div className="w-full px-4 pt-20 flex justify-center items-center h-screen">
      <div className="flex flex-row w-[900px] gap-3 p-5 border rounded-lg">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-2xl font-bold">
            First, you’ll need to deploy a contract
          </h3>
          <p>
            You’ll need to deploy an ERC-721 contract onto the blockchain before
            you can create a drop. What is a contract?
          </p>

          <div
            className="flex flex-col gap-2"
            onClick={handleLogoClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-row items-center gap-1 font-semibold">
              Logo Image
              <CiCircleAlert />
            </div>

            <div
              className={`flex cursor-pointer flex-row w-full p-4 items-center border gap-3 rounded-lg ${
                isDragging ? "border-blue-500" : "border-gray-300"
              }`}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover w-[100px] h-[100px] rounded-lg"
                />
              ) : (
                <div className="p-6 border border-dashed">
                  <input
                    {...register("logo")}
                    ref={uploadRef}
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <PiImageBrokenDuotone size={50} />
                </div>
              )}

              <div className="flex flex-col">
                <label htmlFor="imageUpload" className="cursor-pointer">
                  Drag and drop or click to upload
                </label>

                <p>
                  You may change this after deploying your contract. <br />{" "}
                  Recommended size: 350 x 350. File type: JPG, PNG, SVG, or GIF
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-row w-full gap-2">
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex flex-row items-center gap-1">
                Contract Name <CiCircleAlert />
              </div>

              <input
                {...register("name", { required: "Contract Name is required" })}
                type="text"
                placeholder="My Collection Name"
                className="w-full p-2 border rounded-md outline-none"
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-1">
                Token Symbol <CiCircleAlert />
              </div>

              <input
                {...register("symbol", {
                  required: "Token Symbol is required",
                })}
                type="text"
                placeholder="MCN"
                className="w-full p-2 border rounded-md outline-none"
              />
              {errors.symbol && (
                <span className="text-red-500">{errors.symbol.message}</span>
              )}
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button type="submit" className="rounded-md border p-2">
              Submit
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-3 bg-black bg-opacity-80 text-white p-4 rounded-lg">
          <h3 className="font-bold">
            After you deploy your contract you’ll be able to:
          </h3>
          <div className="flex flex-row items-start gap-2">
            <IoIosListBox size={30} />
            <div className="flex flex-col text-[16px] leading-[16px] gap-2">
              Manage collection settings
              <p>Edit collection details, earnings, and links.</p>
            </div>
          </div>
          <div className="flex flex-row items-start gap-2">
            <PiShootingStarThin size={30} />
            <div className="flex flex-col text-[16px] leading-[16px] gap-2">
              Set up your drop
              <p>Set up your mint schedule and presale stages.</p>
            </div>
          </div>
          <div className="flex flex-row items-start gap-2">
            <FaPencil size={30} />
            <div className="flex flex-col text-[16px] leading-[16px] font-medium gap-2">
              Prepare designs
              <p className="font-normal">
                Customize your pages and upload all assets.
              </p>
            </div>
          </div>

          <h3 className="font-bold">Your community:</h3>

          <div className="flex flex-row items-start gap-2">
            <IoEyeOutline size={30} />
            <div className="flex flex-col text-[16px] leading-[16px] font-medium gap-2">
              Can view
              <p className="font-normal">
                That you’ve deployed a contract onto the blockchain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeployContract;
