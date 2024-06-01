import axiosClient from "./axiosClient";

export const nftService = {
  getNFTsByWallet: (address: string, params: any) => {
    return axiosClient.get(`/${address}/nft`, { params });
  },
};
