# all: down build up test

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down --remove-orphans

test: build up
	docker-compose run --rm --no-deps  --entrypoint=sh api -c "/wait && yarn test"

# unit-tests:
# 	lein  midje architecture-patterns-with-clojure.unit.*

# e2e-tests: build up
# 	docker-compose run --rm --no-deps --entrypoint=lein api midje architecture-patterns-with-clojure.e2e.*

