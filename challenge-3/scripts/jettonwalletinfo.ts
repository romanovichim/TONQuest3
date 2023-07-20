import { TonClient } from 'ton';
import { Address, Cell } from 'ton-core';



// Data from mainnet
const toncenter = new TonClient({
	endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
});

//your jetton wallet Address
//const jettonWalletAddress = Address.parse('EQCi5w5TeyM2M2vqes7kPICQGGi80XXlehTTw-FsBPfrWVjs');

const jettonWalletAddress = Address.parse('EQCGAY_WHTIbpPnLCRbDpTDqW3Fm99qCJZZluW_mgtIwqGIx');

async function getJettonWalletData() {

	let { stack } = await toncenter.callGetMethod(
		jettonWalletAddress , 
		'get_wallet_data'
	);
	//(int balance, slice owner, slice jetton, cell jetton_wallet_code)
	let balance = stack.readBigNumber();
	let owner = stack.readAddress(); 
	let jetton = stack.readAddress();


	console.log('Jetton Wallet info, from get_wallet_data() method:')	
    console.log('Balance: ',(Number.parseFloat(balance.toString()) / 1000000000).toFixed(2))
    console.log('Owner: ', owner);
	console.log('Jetton Master adress:', jetton);
}

getJettonWalletData();
