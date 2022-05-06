import { new_server } from 'https://raw.githubusercontent.com/alevroub/nett/main/mod.ts';

import setup from './server.setup.ts';
import routes from './routes.ts';

const { server, router } = new_server(setup, routes);

server.route(router);
server.start();
