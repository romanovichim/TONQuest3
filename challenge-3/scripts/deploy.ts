import { Address, Cell, StateInit, beginCell, contractAddress, storeStateInit, toNano } from "ton-core";
import { hex } from "../build/master.compiled.json";
import { walletHex } from "../build/wallet.compiled.json";
import qs from "qs";
import qrcode from "qrcode-terminal";

const OFF_CHAIN_CONTENT_PREFIX = 0x01;
const JETTON_WALLET_CODE = Cell.fromBoc(Buffer.from(walletHex,"hex"))[0];

function bufferToChunks(buff: Buffer, chunkSize: number) {
	const chunks: Buffer[] = [];
	while (buff.byteLength > 0) {
		chunks.push(buff.slice(0, chunkSize));
		buff = buff.slice(chunkSize);
	}
	return chunks;
}

export function makeSnakeCell(data: Buffer) {
	const chunks = bufferToChunks(data, 127);
	const rootCell = beginCell();
	let curCell = rootCell;

	for (let i = 0; i < chunks.length; i++) {
		const chunk = chunks[i];

		curCell.storeBuffer(chunk);

		if (chunks[i + 1]) {
			const nextCell = beginCell();
			curCell.storeRef(nextCell);
			curCell = nextCell;
		}
	}

	return rootCell.endCell();
}

export function encodeOffChainContent(content: string) {
	let data = Buffer.from(content);
	const offChainPrefix = Buffer.from([OFF_CHAIN_CONTENT_PREFIX]);
	data = Buffer.concat([offChainPrefix, data]);
	return makeSnakeCell(data);
}

function jettonMinterInitData(
  owner: Address,
  metadata: string
): Cell {
  return beginCell()
    .storeCoins(0)
    .storeAddress(owner)
    .storeRef(encodeOffChainContent(metadata))
    .storeRef(JETTON_WALLET_CODE)
    .endCell();
}


async function deployContract() {
    const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];

    const ownerAddress = Address.parse("kQCj2gVRdFS0qOZnUFXdMliONgSANYXfQUDMsjd8fbTW-aAI");
    const metadataStr = "EnterYourOwnJetton2"
    const dataCell = jettonMinterInitData(ownerAddress,metadataStr);   

    const stateInit: StateInit = {
        code: codeCell,
        data: dataCell,
    };

    const stateInitBuilder = beginCell();
    storeStateInit(stateInit)(stateInitBuilder);
    const stateInitCell = stateInitBuilder.endCell();

    const address = contractAddress(0, {
        code: codeCell,
        data: dataCell,
    });


    let deployLink =
        'https://app.tonkeeper.com/transfer/' +
        address.toString({
            testOnly: true,
        }) +
        "?" +
        qs.stringify({
            text: "Deploy contract by QR",
            amount: toNano("0.1").toString(10),
            init: stateInitCell.toBoc({idx: false}).toString("base64"),
        });

    

    qrcode.generate(deployLink, {small: true }, (qr) => {
        console.log(qr);
    });

    //https://testnet.tonscan.org/address/kQACwi82x8jaITAtniyEzho5_H1gamQ1xQ20As_1fboIfJ4h

    let scanAddr = 
        'https://testnet.tonscan.org/address/' +
        address.toString({
            testOnly: true,
        })
    
    console.log(scanAddr);

}

deployContract()

