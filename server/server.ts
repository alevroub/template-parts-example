import { new_server } from 'https://raw.githubusercontent.com/alevroub/nett/main/mod.ts';

import config from './config.ts';
import routes from './routes.ts';

const { server, router } = new_server(config, routes);

server.route(router);
server.start();
