import 'dotenv'
import axios from 'axios'
import { AdvancedNFTData, nftData } from './interfaces';
import { getBulkCoinData, getCoinData } from './coinbase'
//import express from 'express';
const Moralis = require('moralis/node');
const express = require('express');
//import Moralis from 'moralis/node';

const app = express();

app.listen(3069, () => console.log("Listening on port 3069"));

app.get('/wallet/nfts/:walletAddress/allData', async (req, res) => {
    const walletAddress = req.params.walletAddress;
    const nfts = await getNfts(walletAddress);
    const directNft = [];
    
    for ( const nft of (nfts.result) as nftData[] ) {
        if(nft.token_uri && nft.is_valid === 0) {

            const url = fixUrl(nft.token_uri);

            const response = await axios.get(url);
            const data = response.data as AdvancedNFTData;

            directNft.push(data)

        }
    }

    res.send({ rawData: nfts, data: directNft });
});

app.get('/wallet/nfts/:walletAddress/rawData', async (req, res) => {
    const walletAddress = req.params.walletAddress;

    try {
        const nfts = await getNfts(walletAddress);

        res.send({ rawData: nfts });

    } catch (e) {
        res.send({ error: (e as Error).message });
    }

})

app.get('/wallet/nfts/:walletAddress/nfts/:number?/', async (req, res) => {
    const walletAddress = req.params.walletAddress;
    const number = req.params.number;
    const nfts = await getNfts(walletAddress);
    const directNft = [];
    
    for ( const nft of (nfts.result) as nftData[] ) {
        if(nft.token_uri && nft.is_valid === 0) {

            const url = fixUrl(nft.token_uri);

            const response = await axios.get(url);
            const data = response.data as AdvancedNFTData;

            directNft.push(data)

        }
    }

    if(number) {
        return res.send({ nfts: directNft[number] });
    }

    return res.send({ nfts: directNft });
})

app.get('/wallet/nfts/:walletAddress/nfts/:number/attributes', async (req, res) => {
    const walletAddress = req.params.walletAddress;
    const number = req.params.number;
    const nfts = (await getNfts(walletAddress)).result as nftData[];
    
    const url = fixUrl(nfts[number].token_uri);
    const response = await axios.get(url);
    const data = response.data as AdvancedNFTData;

    return res.send({ attributes: data.attributes });
})

app.get('/wallet/nfts/:walletAddress/nfts/:number/description', async (req, res) => {
    const walletAddress = req.params.walletAddress;
    const number = req.params.number;
    const nfts = (await getNfts(walletAddress)).result as nftData[];

    const url = fixUrl(nfts[number].token_uri);
    const response = await axios.get(url);
    const data = response.data as AdvancedNFTData;

    return res.send({ attributes: data.description });
})

app.get('/wallet/nfts/:walletAddress/nfts/:number/image', async (req, res) => {
    const walletAddress = req.params.walletAddress;
    const number = req.params.number;
    const nfts = (await getNfts(walletAddress)).result as nftData[];


    const url = fixUrl(nfts[number].token_uri);
    const response = await axios.get(url);
    const data = response.data as AdvancedNFTData;

    res.send({ image: data.image });
})

app.get('/coins/:data/:currency/:coin', async (req, res) => {
    const currency = req.params.currency;
    const coin = req.params.coin;
    const data = req.params.data;

    if(coin == 'bulk') {
        const coinData = await getBulkCoinData(currency, data);
        res.send(coinData);
    } else {
        const coinData = await getCoinData(currency, coin, data);

        res.send({ coinData: coinData.data ? coinData.data.data : coinData.data, error: coinData.error });
    }
})
    
    
Moralis.start({ appId: "siiSmww5Kl7aF2BaZBCbfxSJTehhffnm0eSMjIok", serverUrl: "https://0useoa5rc0zj.usemoralis.com:2053/server" })

const getNfts = async (walletAddress: string) => {
    return await Moralis.Web3API.account.getNFTs({ chain: 'eth', address: walletAddress })
}

function fixUrl(url: string) {
    if(url.startsWith("ipfs")) {
        return "https://ipfs.io/ipfs/" + url.split("ipfs://ipfs/").slice(-1)[1];
    } else {
        return url+"?format=json";
    }
}



