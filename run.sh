#!/bin/zsh

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
		dir=frontend/assets/build/
		script=frontend/script/script.js
		style=frontend/style/style.css

		esbuild --bundle $script --outfile=${dir}app.js --minify &&
		esbuild --bundle $style --outfile=${dir}app.css --minify
	;;
esac