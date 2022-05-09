import { Server } from 'http://boing.boing.link';

import config from './config.ts';
import routes from './routes.ts';

const { server, router } = Server(config, routes);

server.route(router);
server.start();
