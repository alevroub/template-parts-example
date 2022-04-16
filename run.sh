#!/bin/zsh

build_directory=dist/

case $1 in
	'dev')
		deno run --no-check --unstable --allow-all --watch server/server.ts --mode development
	;;

	'dev_checks')
		deno run --unstable --allow-all --watch server/server.ts --mode development
	;;

	'start')
		deno run --unstable --allow-all server/server.ts --mode production
	;;

	'build')
		esbuild --bundle app/style/app.css --outdir=$build_directory --minify &&
		esbuild --bundle app/script/app.js --outdir=$build_directory --minify
	;;
esac