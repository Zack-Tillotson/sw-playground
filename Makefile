clean:
	rm -rf public/

dev:
	npx webpack-dev-server

compile-init:
	mkdir app

compile-static:
	cp -r static/ public/

compile-webpack:
	npx webpack

compile: clean compile-static compile-webpack
