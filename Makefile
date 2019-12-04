.PHONY: all

run-e2e:
	@docker-compose up e2e

# Help
help: ## Display this help screen
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# Create kafka topics
topics:
	@bash scripts/kafka/initTopics.sh

orchestrate:
	@docker-compose up -d $(CMD_RUN)

stop-orchestrate:
	@docker-compose stop $(CMD_RUN)

down-orchestrate:
	@docker-compose down --volumes --timeout 0

deps:
	@docker-compose -f scripts/deps/docker-compose.yml up -d

down-deps:
	@docker-compose -f scripts/deps/docker-compose.yml down --volumes --timeout 0

up: deps orchestrate

down: down-orchestrate down-deps
