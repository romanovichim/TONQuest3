# TON Speedrun 

## 🚩 Challenge 3: Jetton Vending Machine

TBD
🌟 Сompile, test and deploy chatbot smart contract to the test network. 

💬 Meet other builders working in TON and get help in the [official dev chat](https://t.me/tondev_eng) or [TON learn tg](https://t.me/ton_learn)


# Checkpoint 0:  Install 

Required: 
* [Git](https://git-scm.com/downloads)
* [Node](https://nodejs.org/en/download/) (Use Version 18 LTS)
* [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

(⚠️ Don't install the linux package `yarn` make sure you install yarn with `npm i -g yarn` or even `sudo npm i -g yarn`!)

```sh
git clone TBD link
```
```sh
cd challenge-3
yarn install
yarn chain
```
---

# Checkpoint 1: Jetton Standard


---

# Checkpoint 2: Get Jetton Master Contract Data

As in the NFT standard from the first quest, Jetton contracts have mandatory GET methods. For the master contract, one of those methods is `get_jetton_data()` which returns data about the Jetton, let's try:

```sh
yarn bolt
```

You will get something like this:
![image](https://user-images.githubusercontent.com/18370291/254961827-c907b673-7331-4946-b931-78f220fee498.png)

That means:
`total_supply` - the total number of issues jettons
`mintable` - (-1/0) - flag which indicates whether number of jettons can increase 
`admin_address`- address of smart-contract which control Jetton 
`jetton_content` - cell - data in accordance to [Token Data Standard #64](https://github.com/ton-blockchain/TEPs/blob/master/text/0064-token-data-standard.md)

Well, now let's release our Jetton!

---

# Checkpoint 3: ICO variation

---

# Checkpoint 4: Compile

As in the previous quest, in order to use a smart contract, it must be compiled into a hexBoC format. First, we will compile the master contract, and then the wallet, the wallet will be needed to deploy the master contract:

```sh
yarn compilemaster
```

```sh
yarn compilewallet
```
---

# Checkpoint 6:  Deploy

Go to the deploy.ts file, in the line 62, change the const `ownerAddress` to your own, it will be stored in register c4, and only from this address it will be possible to execute commands assigned to administer the token.

![image](https://user-images.githubusercontent.com/18370291/254968050-0130250e-5bda-4e20-9643-0fc9b39f9223.png)

line 63 is for token metadata, you can put some link here, as this is an example, you can just write the phrase that you want to store in the master contract instead of metadata

We launch the deployment script and scan the QR code, then you already know))

```sh
yarn deploy
```

Be sure to save the link below the quar code, it contains the address of the master contract of your Jetton.

---

# Checkpoint 7:  Get your Master Contract Data

We go into the file and change the address at the top of the file on the line to the address of your master contract.

![image](https://user-images.githubusercontent.com/18370291/254981215-01803c51-6831-4f07-87d1-25fc97fd2436.png)

Launch!

```sh
yarn getjetton
```

If everything worked out, it's time to participate in ICO

---

# Checkpoint 8: Participate in ICO

To participate in the ISO, you just need to send a message to the smart contract, let's do this:

```sh
yarn send
```

What to do with the QR code you already know :) 
The question arises how to get the balance of our Jetton wallet.

---

# Checkpoint 9: Getting to the wallet

Using the master contract, we will receive a wallet token of our address. Get method `get_wallet_address()`:


```sh
yarn myjettonwallet
```

Copy the address, we will use it in the `jettonwalletinfo.ts` script:

![image](https://user-images.githubusercontent.com/18370291/254984237-0a17e470-bacc-435d-8c3b-4b589967d263.png)

In the 12th line you need to insert the address of your wallet token, and of course run the script:

```sh
yarn  jettonbalance
```

![image](https://user-images.githubusercontent.com/18370291/254985023-b11448a4-e35f-4056-a3dd-8d0e3c742a6f.png)

Enjoy the balance)

---


# ⚔️ Side Quests

TBD




 
