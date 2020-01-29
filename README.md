# PegaSys Orchestrate Quickstart

PegaSys Orchestrate a Quickstart of PegaSys Orchestrate Transaction Orchestration system.

During this quickstart you will

1. Start PegaSys Orchestrate locally using `docker-compose`
2. Manipulate Contract-Registry CLI
3. Manipulate Account-Generator CLI
4. Manipulate Orchestrate SDK
5. Inspect Ethereum Accounts stored in Hashicorp Vault

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
yarn contracts-catalog
```

2. Compile contract using Truffle

```
yarn truffle compile
```

3. Register contract artifacts

```
yarn contracts-add -f build/contracts/Counter.json -n Counter -t v0.1.0
```

### Manipulate Orchestrate Account generator CLI

1. Generate wallet and get it prefunded on Ropsten

```
yarn accounts-generate -c 3 -v 10000000000000000
```

2. Generate wallet and get it prefunded Rinkeby

```
yarn accounts-generate -c 4 -v 10000000000000000
```

### Manipulate SDK

1. Deploy contracts on Ropsten and Rinkeby

Have a look to script `src/deploy.js`

- Set `<FAUCET_ADDRESS>` placeholder
- Set `chainId` to `3` or `4` to deploy either on Ropsten or Rinkeby 

Then you can run script by entering command

```
yarn deploy
```

2. Send a batch of transaction

Have a look to the script `src/send.js`

- Set variables indicated with placeholder 

Then you can run it by entering command

```
yarn send
```

### Inspect Accounts stored in Hashicorp Vault

1. You can inspect Ethereum accounts that have been stored in Hashicorp Vault by running

```bash
make hashicorp-accounts
```

That will return list of addresses

```
Keys
----
0x05a34cE77Ea9fc49E4E5C7c4bC0E9aB2447AB6f0
0x67689FDDecD92938932B21D566D089cc45A62769
0x7E654d251Da770A068413677967F6d3Ea2FeA9E4
```

2. You can run any hashicorp Vault CLI command (c.f. https://www.vaultproject.io/docs/commands/) by running

```bash
make hashicorp-vault COMMAND="<command>"
```

For example

```bash
make hashicorp-vault COMMAND="token lookup"
Key                 Value
---                 -----
accessor            ZxDozUcdrwEFENpialO3AvWi
creation_time       1578672722
creation_ttl        0s
display_name        root
entity_id           n/a
expire_time         <nil>
explicit_max_ttl    0s
id                  s.LjlIldnulzUvUgZpVnrPy6Qb
meta                <nil>
num_uses            0
orphan              true
path                auth/token/root
policies            [root]
ttl                 0s
type                service
```