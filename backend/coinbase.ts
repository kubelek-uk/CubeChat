import { Client, Price } from 'coinbase';
import { coinbaseData } from './interfaces';
import axios from 'axios';

const client = new Client({
    apiKey: '8TZM2XIKe9ZwKHT4',
    apiSecret: 'jjXL4FrvbnK95JOl56j6TXAjD692fRqL',
    strictSSL: false
})

//client.getCurrencies((err, res) => {
//    console.log(err?.message)
//
//    console.log(res?.data)

//})

export async function getCoinData(currency: string, coin: string, reqData: string): Promise<coinbaseData> {
    try {

        let data = await axios.get(`https://api.coinbase.com/v2/prices/${coin}-${currency}/${reqData}`)

        if(data.data) {
            return { data: (data.data) as Price, error: '' }
        }

    } catch (error) {
        return { data: null, error: error.message }
    }
}

const coins = [ 'BTC', 'ETH', 'LTC' ]

export async function getBulkCoinData(currency: string, reqData: string): Promise<any> {
    try {

        const allData = []

        for ( const coin of coins) {
            const data = await getCoinData(currency, coin, reqData)

            if(data.data) {

                allData.push(data.data.data)

            }

        }
        return allData


    } catch (error) {
        return { data: null, error: error.message }
    }
}


