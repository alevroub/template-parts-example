- must have
	- work with deno deploy. ABC framework is currently unsupported. consider using native serve and router.
		- https://deno.com/blog/a-whole-website-in-a-single-js-file
		- https://deno.com/deploy/docs/serve-static-assets
		- https://deno.com/deploy/docs/resources-frameworks
		- https://deno.land/x/mrmime
	- proper typescript implementation
	- different paths for files in development/production
	
- should have
	- simple LRU cache for 1-second microcaching

- could have
	- example using cookie sessions
	- a build step (using rollup) might still be necessary for
		- moving files
		- compiling svelte/vue and replacing the server-side templating

- won't have
	- node.js
