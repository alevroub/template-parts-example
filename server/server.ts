import { Server } from 'https://raw.githubusercontent.com/alevroub/template-parts/main/mod.ts';

const config = {};
const routes = [
	{
		path: '/',
		page: 'home.html',
	},
];

const { server, router } = Server(config, routes);

server.route(router);
server.start();
