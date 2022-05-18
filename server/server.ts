import { Server } from 'https://raw.githubusercontent.com/alevroub/template-parts/main/mod.ts';

import config from './config.ts';
import routes from './routes.ts';

const { server, router } = Server(config, routes);

server.route(router);
server.start();
