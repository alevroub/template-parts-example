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
esac