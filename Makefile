.PHONY: dev test

default: test

dev:
	sh ./scripts/stopDocker.sh
	@docker-compose build dev
	@docker-compose build database
	@docker-compose run -p 27017:27017 -d --name database database
	@docker exec -i database sh -c 'mongorestore -d myFonciaBdd ./myFonciaBdd'
	@docker-compose up dev

test:
	@sh ./scripts/stopDocker.sh
	@docker-compose build test
	@docker-compose build database
	@docker-compose run -p 27017:27017 -d --name database database
	@docker exec -i database sh -c 'mongorestore -d myFonciaBdd ./myFonciaBdd'
	@docker-compose run --rm test
	@sh ./scripts/stopDocker.sh

