# Init Vault
curl --request POST --data '{"secret_shares": 1, "secret_threshold": 1}' ${VAULT_ADDR}/v1/sys/init > init.json

# UNSEAL the vault
export VAULT_UNSEAL_KEY=$(cat init.json | jq .keys | jq .[0])
curl --request POST --data '{"key": '${VAULT_UNSEAL_KEY}'}' ${VAULT_ADDR}/v1/sys/unseal

# Set the ROOT_TOKEN as environment variable
token=$(cat init.json | jq .root_token | tr -d '"')

# Enable secret engine
curl --header "X-Vault-Token: ${token}" --request POST \
        --data '{"type": "kv-v2", "config": {"force_no_cache": true} }' \
    ${VAULT_ADDR}/v1/sys/mounts/secret

rm init.json

# # Create a token
# curl --header "X-Vault-Token: ${ROOT_TOKEN}" \
#      --request POST \
#      --data '{"ttl": "718h", "renewable": true, "no_parent": true, "policies": ["root"]}' \
#     ${VAULT_ADDR}/v1/auth/token/create > token.json

# token=$(cat token.json | jq .auth | jq .client_token | tr -d '"')

# Store root Token in a file (/vault/token should be shared volume with the tx-signer)
mkdir -p /vault/token
touch /vault/token/.vault-token
echo $token > /vault/token/.vault-token

# rm token.json