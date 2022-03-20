#!/bin/zsh

build_dir=dist/

case $1 in
	'run')
		deno run --no-check --unstable --allow-all server/server.ts
	;;

	'build')
		esbuild --bundle app/style/app.css --outdir=$build_dir --minify &&
		esbuild --bundle app/script/app.js --outdir=$build_dir --minify
	;;
esac