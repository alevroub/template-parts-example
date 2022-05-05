#!/bin/zsh

build_directory=frontend/assets/

case $1 in
	'')
		deno run --no-check --allow-net --allow-read --allow-write --watch server/server.ts --mode development
	;;

	'check')
		deno run --allow-net --allow-read --allow-write --watch server/server.ts --mode development
	;;

	'build')
		esbuild --bundle app/style/app.css --outdir=$build_directory --minify &&
		esbuild --bundle app/script/app.js --outdir=$build_directory --minify
	;;
esac