.PHONY: lint

lint:
	./node_modules/.bin/prettier --loglevel error 'server/**/*.js' --write
	./node_modules/.bin/prettier --loglevel error 'client/**/*.js' --write
	./node_modules/.bin/eslint ./client --fix
	./node_modules/.bin/eslint ./server --fix
