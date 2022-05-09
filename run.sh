#!/bin/zsh

build_directory=frontend/assets/

case $1 in
	'')
		deno run --no-check --allow-net --allow-read --allow-write --watch server/server.ts --mode development
	;;

	'check')
		deno run --allow-net --allow-read --allow-write --watch server/server.ts --mode development
	;;

	'cache')
		deno cache --reload --no-check server/server.ts
	;;

	'build')
		esbuild --bundle frontend/style/style.css --outdir=$build_directory --minify &&
		esbuild --bundle frontend/script/script.js --outdir=$build_directory --minify
	;;
esac