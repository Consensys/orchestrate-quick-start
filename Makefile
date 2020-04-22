VAULT_TOKEN :=

.PHONY: all

ifneq ($(NODE),)
NODE_COMPOSE_CONFIG = -f scripts/deps/docker-compose-$(NODE).yml
endif

orchestrate:
	@docker-compose up -d $(CMD_RUN)

stop-orchestrate:
	@docker-compose stop $(CMD_RUN)

down-orchestrate:
	@docker-compose down --volumes --timeout 0

deps:
	@docker-compose -f scripts/deps/docker-compose.yml $(NODE_COMPOSE_CONFIG) up -d

down-deps:
	@docker-compose -f scripts/deps/docker-compose.yml $(NODE_COMPOSE_CONFIG) down --volumes --timeout 0

up: deps orchestrate

down: down-orchestrate down-deps

hashicorp-accounts:
	@bash scripts/deps/config/hashicorp/vault.sh kv list secret/default

hashicorp-token-lookup:
	@bash scripts/deps/config/hashicorp/vault.sh token lookup

hashicorp-vault:
	@bash scripts/deps/config/hashicorp/vault.sh $(COMMAND)
