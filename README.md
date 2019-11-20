# PegaSys Orchestrate Quickstart

PegaSys Orchestrate a Quickstart of PegaSys Orchestrate Transaction Orchestration system.

During this quickstart you will

1. Start PegaSys Orchestrate locally using `docker-compose`
2. Manipulate Contract-Registry CLI
3. Manipulate Wallet-Generator CLI
4. Manipulate Orchestrate SDK

# Requirements

- Have `docker` and `docker-compose` installed
  
# Demo

## Start Orchestrate

### Start dependencies

```
make deps
``` 

### Start Orchestrate

```
make orchestrate
```

If running Orchestrate you will need to first login on GitLab registry in order to pull Orchestrate docker images

```
docker login -u <username> -p <gitlab-ssh-token> registry.gitlab.com/consensys/client/fr/core-stack/orchestrate
```

### Run e2e module

```
make run-e2e
```

## Install yarn project

In order to

```
yarn install
```

## Manipulate Contract-Registry CLI

### Get catalog of registered contracts

```
yarn contract-registry get-catalog -e localhost:8080
```

### Compile demo contract


```
yarn truffle compile
```

### Register contract

```
yarn contract-registry add-contract -e localhost:8080 -f build/contracts/Counter.json -n Counter -t v0.1.0
```

## Manipulate Wallet generator CLI

Generate wallet on Ropsten

```
yarn wallet generate-wallet -e localhost:9092 -c 3 -v 10000000000000000
```

Generate wallet on Rinkeby

```
yarn wallet generate-wallet -e localhost:9092 -c 4 -v 10000000000000000
```

## Manipulate SDK

### Deploy contracts on Ropsten and Rinkeby

Have a look to and possibly update chain ID in `src/deploy.js`.

Then you can run 

```
yarn deploy
```

### Send a batch of transaction

Have a look to and possibly update chain ID in `src/send.js`

Then you can run 

```
yarn send
```