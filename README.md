# CoreStack demo

## Requirements

Start CoreStack connected to Ropsten and Rinkeby

## Demo

## Step 1: Register contract

### Get list of already registered contract

```
yarn contract-registry get-catalog -e localhost:8081
```

### Compile demo contract

```
yarn truffle compile
```

### Register contract

```
yarn contract-registry add-contract -e localhost:8081 -f build/contracts/Counter.json -n Counter -t v0.1.0
```

## Step 2: Deploy contracts on Ropsten and Rinkeby

Update chain ID in `src/deploy.js` and run 

```
yarn deploy
```

## Step 3: Generate Wallet

Generate wallet on Ropsten

```
yarn wallet generate-wallet -e localhost:9092 -c 3 -v 10000000000000000
```

Generate wallet on Rinkeby

```
yarn wallet generate-wallet -e localhost:9092 -c 4 -v 10000000000000000
```

## Step 4: Send Transaction

```
yarn send
```