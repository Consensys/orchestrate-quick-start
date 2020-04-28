<p align="center">
  <img src="static/orchestrate-logo.png" width="300px" alt="Orchestrate Logo"/>
</p>

PegaSys Orchestrate is a platform that enables enterprises to easily build secure and reliable applications on Ethereum blockchains.

It provides extensive features to connect to blockchain networks:

- Transaction management (transaction crafting, gas management, nonce management, transaction listening...)
- Account management with private key storage in Hashicorp Vault
- Smart Contract Registry
- Multi-chain & Multi-protocol (public or private)

For more information please refer to [PegaSys Orchestrate Official Documentation](https://docs.orchestrate.pegasys.tech/).

# Quick-Start

- [Requirements](#requirements)
- [Set-up and run Orchestrate](#set-up-and-run-orchestrate)
  - [Clone project](#clone-project)
  - [Login on Docker registry](#login-on-docker-registry)
  - [Run Orchestrate](#run-orchestrate)
  - [Install CLI](#install-cli)
- [Create a blockchain account](#create-a-blockchain-account)
  - [Create account](#create-account)
  - [List accounts stored in Hashicorp Vault](#list-accounts-stored-in-hashicorp-vault)
- [Connect a blockchain network](#connect-a-blockchain-network)
  - [Register blockchain network](#register-blockchain-network)
  - [Send JSON-RPC request through blockchain proxy](#send-json-rpc-request-through-blockchain-proxy)
- [Configure a Faucet](#configure-a-faucet)
  - [Create Faucet](#create-faucet)
  - [Send ETH to Faucet Account](#send-eth-to-faucet-account)
- [Register a Smart Contract](#register-a-smart-contract)
  - [Compile Smart Contract](#compile-smart-contract)
  - [Push artifacts to Smart Contract registry](#push-artifacts-to-smart-contract-registry)
  - [List Smart Contracts stored in registry](#list-smart-contracts-stored-in-registry)
  - [Get details about a Smart Contract](#get-details-about-a-smart-contract)
- [Send Transactions](#send-transactions)
  - [Create an account to send transactions](#create-an-account-to-send-transactions)
  - [Consume transaction receipts](#consume-transaction-receipts)
  - [Deploy a Smart Contract](#deploy-a-smart-contract)
  - [Send a transaction](#send-a-transaction)

During this quick-start you will manipulate:

- Orchestrate Command Line Interface
- Orchestrate REST API
- Orchestrate SDK

## Requirements

- Have [`docker>=18`](https://www.docker.com/) and [`docker-compose`](https://docs.docker.com/compose/install/) installed
- Have [`node>=10` and `npm`](https://nodejs.org/en/) installed

## Set-up and run Orchestrate

### Clone project

```bash
git clone https://github.com/PegaSysEng/orchestrate-quick-start.git
```

### Login on Docker registry

If you are running Orchestrate for the first time you need to login on Orchestrate Docker registry. If you do not have credentials, please contact support@pegasys.tech

```bash
docker login -u <username> -p <password or API key> consensys-docker-pegasys-orchestrate.bintray.io
```

### Run Orchestrate

Start

- Orchestrate external dependencies (Kafka, Redis, Postgres, Hashicorp Vault). See [docker-compose.yml](scripts/deps/docker-compose.yml)
- Orchestrate microservices. See [docker-compose.yml](docker-compose.yml)

by running

```bash
npm run up
```

<img src="static/make-up.png" width="900px" alt="Make up"/>

> **Note:** _If you want to stop Orchestrate you can run `make down` it will stop all container and remove all data volumes_

### Install CLI

```bash
npm install
```

Verify CLI is properly installed and list all commands by running:

```bash
npm run orchestrate help
```

To access details of each command:

```bash
npm run orchestrate [cmd] help
```

**Example:** `npm run orchestrate contracts help`

## Create a blockchain account

### Create account

Use Orchestrate CLI to generate an account and save it (it will be used as Faucet account)

```bash
npm run generate-account
```

<img src="static/generate-account.png" width="900px" alt="Generate Account"/>

### List accounts stored in Hashicorp Vault

```bash
npm run hashicorp-accounts
```

<img src="static/hashicorp-accounts.png" width="900px" alt="Hashicorp accounts"/>

You can run any hashicorp Vault CLI command (c.f. https://www.vaultproject.io/docs/commands/) by running

```bash
npm run hashicorp-vault -- <command>
```

For example

```bash
npm run hashicorp-vault -- token lookup
```

## Connect a blockchain network

### Register blockchain network

Use Orchestrate API to register a blockchain network, you should provide

- `name` for the network
- `urls` of, at least, one JSON-RPC endpoint of an Ethereum node in the network

Run next command and save chain unique identifier `uuid` for later usage

```bash
curl -X POST --data '{"name": "rinkeby", "urls":["https://rinkeby.infura.io/v3/<INFURA_PROJECT_ID>"]}' localhost:8081/chains
```

<img src="static/post-chain.png" width="900px" alt="Create Chain"/>

> **Note:** _We will connect to Rinkeby through [Infura](https://infura.io/) but you could connect to any Ethereum network using the same procedure. If you are not familiar with Infura you can refer to [Infura Get-Started](https://blog.infura.io/getting-started-with-infura-28e41844cc89/)_

### Send JSON-RPC request through blockchain proxy

Verify that chain JSON-RPC is properly proxied by Orchestrate

```bash
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest", false],"id":1}' localhost:8081/<CHAIN_UUID>
```

<img src="static/json-rpc-proxy.png" width="900px" alt="JSON-RPC Response"/>

## Configure a Faucet

> **Note:** _On non zero gas price networks (e.g. public networks such as Ethereum mainnet or Rinkeby), an Ethereum account must have a positive ETH balance to pay fees for its transactions to be mined. Orchestrate provides a Faucet that allows to automatically prefund accounts managed by Orchestrate_

### Create Faucet

Use Orchestrate API to configure a Faucet, you should provide

- `name` for the Faucet
- `creditorAccount` that will be used to credit other accounts
- `chainRule` chain unique unique identifier `uuid`
- Faucet configuration (c.f. [Orchestrate documentation](https://docs.orchestrate.pegasys.tech) for more details)

Run next command by setting placeholder to the account and chain uuid previously saved

```bash
curl -X POST --data '{"name":"rinkeby-faucet", "creditorAccount":"<FAUCET_ACCOUNT>","chainRule":"<CHAIN_UUID>","cooldown":"10s","amount":"60000000000000000","maxBalance":"100000000000000000"}' localhost:8081/faucets
```

<img src="static/post-faucet.png" width="900px" alt="Create Faucet"/>

### Send ETH to Faucet Account

> **Warning:** _In order to credit other addresses, Faucet account must be credited with some ETH_

The recommended approach is to credit Faucet Account by sending some ETH from one of your personnal Ethereum account using [MetaMask](https://metamask.io/) (1 ETH is enough). If not familiar with MetaMask you can refer to this [Medium post](https://medium.com/openberry/getting-started-with-metamask-b9ac23a10c83).

<img src="static/metamask-credit-faucet.png" width="400px" alt="Credit Faucet with MetaMask"/>

If you do not have any ETH, you can request some from an official Faucet (e.g. https://faucet.rinkeby.io/ if using Rinkeby network).

## Register a Smart Contract

### Compile Smart Contract

```bash
npm run compile
```

<img src="static/compile-contract.png" width="900px" alt="Compile contract"/>

> **Note:** _It uses [Truffle Suites](https://www.trufflesuite.com/) for compilation_

> **Note:** _This Quick Start provides you with a simple Solidity Smart Contract [Counter.sol](smart-contracts/Counter.sol) but you could use any Solidity Smart Contract_

### Push artifacts to Smart Contract registry

```bash
npm run register-contract
```

<img src="static/register-contract.png" width="900px" alt="Register contract"/>

### List Smart Contracts stored in registry

```bash
npm run get-catalog
```

<img src="static/get-catalog.png" width="900px" alt="Get catalog"/>

### Get details about a Smart Contract

```bash
npm run get-contract
```

<img src="static/get-contract.png" width="900px" alt="Get contract"/>

## Send Transactions

**Create `.env`**

First create a `.env` file at the root of the project by copying `.env.example`

### Create an account to send transactions

Generate a new account indicating name of the chain to be pre-funded on (Faucet will automatically credit the account after creation)

```bash
npm run generate-account --chain rinkeby
```

<img src="static/generate-account-faucet.png" width="900px" alt="Get catalog"/>

**Note:** _This account will be automatically funded by the Faucet service configured previously._

If using Rinkeby you can verify that the account has been properly pre-funded by the Faucet using Etherscan (following url: https://rinkeby.etherscan.io/address/<FROM_ACCOUNT> after replacing placeholder)

<img src="static/etherscan-account.png" width="600px" alt="Get catalog"/>

**Update `.env`**

Set `FROM_ACCOUNT` value in `.env` to the address created (it will be used to send transactions)\_

### Consume transaction receipts

> **Note:** _Orchestrate allows to manage blockchain transactions that are by nature asynchronous due to blockchain mining time. Orchestrate provides a consumer that allows to process transaction receipts as they are mined._

> **Note:** _Orchestrate uses Apache Kafka for asynchronous communications_

On a first terminal window start the consumer and leave terminal open without interupting consumer:

```bash
npm run consume
```

> **Reference script:** [consume.ts](src/consume/consume.ts)

<img src="static/npm-consume.png" width="900px" alt="Get catalog"/>

### Deploy a Smart Contract

On a second terminal window, run deploy command:

```bash
npm run deploy
```

> **Reference script:** [deploy.ts](src/deploy-contract/deploy.ts)

After a few seconds (depending on blocktime) you should see the transaction receipt appearing in the consumer terminal

<img src="static/npm-deploy.png" width="900px" alt="Get catalog"/>

If using Rinkeby you can verify that the account has been sent using Etherscan (following url: https://rinkeby.etherscan.io/address/<FROM_ACCOUNT> after replacing placeholder)

<img src="static/etherscan-deploy.png" width="600px" alt="Get catalog"/>

**Update `.env`**

Set `TO_ACCOUNT` value in `.env` with the address of the contract just deployed (you can find it in the receipt at `contractAddress`)

### Send a transaction

> **Important:** _Before moving forward make sure that `FROM_ACCOUNT` and `TO_ACCOUNT` in `.env` have been set_

On a second terminal window, run send-tx command:

```bash
npm run send-tx
```

> **Reference script:** [send-tx.ts](src/send-tx/send-tx.ts)

After a few seconds (depending on blocktime) you should see the transaction receipt appearing in the consumer terminal

<img src="static/npm-send-tx.png" width="900px" alt="Send Tx"/>

If using Rinkeby you can verify that the account has been sent using Etherscan (following url: https://rinkeby.etherscan.io/address/<FROM_ACCOUNT> after replacing placeholder)

<img src="static/etherscan-send-tx.png" width="600px" alt="Get catalog"/>
