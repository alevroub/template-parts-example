import { new_server } from 'https://raw.githubusercontent.com/alevroub/nett/main/mod.ts';

const config = {};
const routes = [
	{
		path: '/',
		page: 'home.html',
	},
];

const { server, router } = new_server(config, routes);

server.route(router);
server.start();
