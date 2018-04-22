run.prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

run.dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

test:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml -f docker-compose.dev.test.yml up

.PHONY: run.prod run.dev test

