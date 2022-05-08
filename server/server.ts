import { Server } from 'http://boing.boing.link';

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
