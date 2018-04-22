docker-compose = docker-compose -f docker-compose.yml $(1)
test-files := -f docker-compose.dev.yml -f docker-compose.dev.test.yml

run.prod:
	$(call docker-compose,-f docker-compose.prod.yml up --build)

run.dev:
	$(call docker-compose,-f docker-compose.dev.yml up --build)

test.watch:
	$(call docker-compose,-f docker-compose.dev.yml -f docker-compose.dev.test.watch.yml run --rm gobuhat-backend)

test:
	$(call docker-compose, $(test-files) build gobuhat-backend)
	$(call docker-compose, $(test-files) run --rm gobuhat-backend)

.PHONY: run.prod run.dev test.watch test

