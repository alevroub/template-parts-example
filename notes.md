- must have
	- code minification
		- alternately, a deployment script could minify specific files before uploading to server.
		  meaning the code could be minified using a non-node.js bundler
	- deployment script
	
- should have
	- a build step (using rollup) might still be necessary for 
		- code minification
		- moving files
		- compiling typescript
		- compiling (like .svelte) and replacing the server-side templating
	- a build step also means different paths for files in development/production

- could have
	- simple LRU cache for 1-second microcaching
	- example using cookie sessions

- won't have
	- node.js