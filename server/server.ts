import { new_server } from 'https://server.boing.link';

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
