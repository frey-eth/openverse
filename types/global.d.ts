import { ApiNFTProps } from "@/types/global";
import { SellItemType } from "./global.d";
export type NFTItemProps = {
  title: string;
  image: string;
  price: number;
};

export type CollectionProps = {
  name: string;
  volume: number;
  floorPrice: number;
  image: string;
};

export type ApiNFTProps = {
  amount: string;
  token_id: string;
  token_address: string;
  contract_type: string;
  owner_of: string;
  last_metadata_sync: string;
  last_token_uri_sync: string;
  metadata: any;
  block_number: string;
  block_number_minted: string | null;
  name: string;
  symbol: string;
  token_hash: string;
  token_uri: string;
  minter_address: string | null;
  verified_collection: boolean;
  possible_spam: boolean;
  collection_logo: string | null;
  collection_banner_image: string | null;
};

export type GetAllByContractType = {
  active: boolean;
  price: BigInt;
  tokenId: BigInt;
  seller: string;
};

export type SellItemType = ApiNFTProps & {
  price?: BigInt;
  seller?: string;
};
