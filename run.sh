#!/bin/zsh

case $1 in
	'')
		deno run --no-check --allow-net --allow-read --allow-write --watch server/server.ts --mode development
	;;
esac