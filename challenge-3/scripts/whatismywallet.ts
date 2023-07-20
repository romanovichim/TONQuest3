import { TonClient } from 'ton';
import { Address, Cell, beginCell } from 'ton-core';



// Data from mainnet
const toncenter = new TonClient({
	endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
});

// enter your Collection address
//const jettonAddress = Address.parse('EQCD6lITaOdUkIRibdZTda4gUHi20J1Go7yGkKARA3kCUv9X');
const jettonAddress = Address.parse('kQASJ_jb0Q2VDINksRn0jFupj-4oNJU_P9lD95jhW5CxWRG4');

// enter your Ton Wallet address
const walletAddress = Address.parse('EQCj2gVRdFS0qOZnUFXdMliONgSANYXfQUDMsjd8fbTW-RuC');


async function getJettonWallet() {

	let { stack } = await toncenter.callGetMethod(
		jettonAddress, 
		"get_wallet_address",
            [
                {
                    type: "slice",
                    cell: beginCell().storeAddress(walletAddress).endCell(),
                },
            ]
	);
	const jettonWalletAddress = stack.readAddress();

	console.log('Your jetton wallet:')	
	console.log('Addr: ', jettonWalletAddress.toString());
            //EQCi5w5TeyM2M2vqes7kPICQGGi80XXlehTTw-FsBPfrWVjs
}

getJettonWallet();


