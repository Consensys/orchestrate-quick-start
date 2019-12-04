# PegaSys Orchestrate Quickstart

PegaSys Orchestrate a Quickstart of PegaSys Orchestrate Transaction Orchestration system.

During this quickstart you will

1. Start PegaSys Orchestrate locally using `docker-compose`
2. Manipulate Contract-Registry CLI
3. Manipulate Wallet-Generator CLI
4. Manipulate Orchestrate SDK

## Requirements

- Have `docker` and `docker-compose` installed
- Have `yarn` installed (we recommend using a version of `node>v10`)

## Demo

### Start Orchestrate

1. Start dependencies

Start dependencies

```
make deps
``` 

Then configure Kafka topics

```
make topics
```

2. Update Orchestrate configuration in `.env`

Follow the TODOs documented in `.env`

3. Start Orchestrate

Start orchestrate microservices by running

```
make orchestrate
```

*Note*: If running Orchestrate for the 1st you will first need to login on Orchestrate Docker registry.

```
docker login -u <username> -p <password> consensys-docker-pegasys-orchestrate.bintray.io
```

### Manipulate Orchestrate Contract-Registry CLI

1. Get catalog of contracts

```
yarn contract-registry get-catalog -e localhost:8080
```

2. Compile contract using Truffle

```
yarn truffle compile
```

3. Register contract artifacts

```
yarn contract-registry add-contract -e localhost:8080 -f build/contracts/Counter.json -n Counter -t v0.1.0
```

### Manipulate Orchestrate Wallet generator CLI

1. Generate wallet and get it prefunded on Ropsten

```
yarn wallet generate-wallet -e localhost:9092 -c 3 -v 10000000000000000
```

2. Generate wallet and get it prefunded Rinkeby

```
yarn wallet generate-wallet -e localhost:9092 -c 4 -v 10000000000000000
```

### Manipulate SDK

1. Deploy contracts on Ropsten and Rinkeby

Have a look to the script and possibly update chain ID in `src/deploy.js`.

Then you can run it by entering command

```
yarn deploy
```

2. Send a batch of transaction

Have a look to the script `src/send.js`

Then you can run it by entering command

```
yarn send
```
