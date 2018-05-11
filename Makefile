docker-compose = docker-compose -f docker/docker-compose.yml $(1)
test-files := -f docker/docker-compose.dev.yml -f docker/docker-compose.dev.test.yml

run.prod:
	$(call docker/docker-compose,-f docker/docker-compose.prod.yml up --build)

run.dev:
	$(call docker/docker-compose,-f docker/docker-compose.dev.yml up --build)

test.watch:
	$(call docker/docker-compose,-f docker/docker-compose.dev.yml -f docker/docker-compose.dev.test.watch.yml run --rm gobuhat-backend)

test:
	$(call docker/docker-compose, $(test-files) build gobuhat-backend)
	$(call docker/docker-compose, $(test-files) run --rm gobuhat-backend)

.PHONY: run.prod run.dev test.watch test

