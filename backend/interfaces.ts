import { Price } from "coinbase";

export interface nftData {
    token_address: string; //token address
    token_id: string; //token id (unique number of the nft in the collection)
    block_number_minted: string; //block number when the nft was minted
    owner_of: string; //address of the owner of the nft
    block_number: string //block number when the nft was transferred
    amount: string; //amount of the nft
    contract_type: string; //contract type
    name: string; //name of the nft collection
    symbol: string; //symbol of the nft
    token_uri: string; //uri of the nft

    metadata: string | null; //metadata of the nft

    synced_at: string; //timestamp when the nft was synced (collected)
    is_valid: number; //is the nft valid
    //* syncing: number;
    //* frozen: number; //is the nft frozen

}

export interface AdvancedNFTData {
    name: string // actual name of the nft
    description: string // description of the nft
    image: string // image of the nft
    //* external_url: string; // external url of the nft
    attributes: [
        { 
            trait_type: string, value: string
        }
    ]; // traits of the nft
} 

export interface coinbaseData {
    data: Price | null;
    error: string;
}