all: down build up test

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down --remove-orphans

test: build up
	docker-compose run --rm --no-deps  --entrypoint=sh api -c "/wait && yarn test"

unit-tests: build up
	docker-compose run --rm --no-deps  --entrypoint=yarn api test -- unit

integration-tests: build up
	docker-compose run --rm --no-deps  --entrypoint=sh api -c "/wait && yarn test -- integration"

e2e-tests: build up
	docker-compose run --rm --no-deps  --entrypoint=sh api -c "/wait && yarn test -- e2e"

