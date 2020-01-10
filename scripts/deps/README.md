# Deps

Start dependencies for Orchestrate

## About Hashicorp Vault

# Read Ethereum Addresses

1. Retrieve Token

In order to access Vault data you need its token for authentication.

To retrieve it you can run:
```bash
docker run --rm -v deps_vault-token:/token alpine:latest more /token/.vault-token
```

It should return the token (e.g. `s.0Gd3vcAMsGGOJJkrCbacw3Ks`)

2. Access addresses

Once token is extracted you can read addresses saved in Vault by running

```
dco -f scripts/deps/docker-compose.yml exec -e VAULT_TOKEN="s.0Gd3vcAMsGGOJJkrCbacw3Ks" vault vault kv list -address=http://vault:8200 secret/default
```
