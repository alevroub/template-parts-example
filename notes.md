- must have
	- different paths for files in development/production
	
- should have
	- a build step (using rollup) might still be necessary for 
		- moving files
		- compiling typescript
		- compiling (like .svelte) and replacing the server-side templating

- could have
	- simple LRU cache for 1-second microcaching
	- example using cookie sessions

- won't have
	- node.js
