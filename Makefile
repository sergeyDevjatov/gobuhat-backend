docker-compose-up = docker-compose -f docker-compose.yml $(1) up --build

run.prod:
	$(call docker-compose-up,-f docker-compose.prod.yml)

run.dev:
	$(call docker-compose-up,-f docker-compose.dev.yml)

test:
	$(call docker-compose-up,-f docker-compose.dev.yml -f docker-compose.dev.test.yml)

.PHONY: run.prod run.dev test

