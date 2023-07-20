import { Address, Cell, beginCell, contractAddress, toNano} from "ton-core";
import { TonClient } from "ton";
import qs from "qs";
import qrcode from "qrcode-terminal";

async function onchainScript() {
    //https://github.com/ton-blockchain/TEPs/blob/master/text/0074-jettons-standard.md
    //const address = Address.parse('EQCD6lITaOdUkIRibdZTda4gUHi20J1Go7yGkKARA3kCUv9X');
    const address = Address.parse('kQASJ_jb0Q2VDINksRn0jFupj-4oNJU_P9lD95jhW5CxWRG4');

    let transactionLink =
    'https://app.tonkeeper.com/transfer/' +
    address.toString({
        testOnly: true,
    }) +
    "?" +
    qs.stringify({
        text: "tonspeedrun3",
        amount: toNano("1.1").toString(10),
    });

    console.log("Transaction link:",transactionLink);


    qrcode.generate(transactionLink, {small: true }, (qr) => {
        console.log(qr);
    });


    console.log("Check txes");
    
    let scanAddr = 
    'https://testnet.tonscan.org/address/' +
    address.toString({
        testOnly: true,
    })

    console.log(scanAddr);
    
}

onchainScript();