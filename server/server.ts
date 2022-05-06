import { new_server } from '../_lib/mod.ts';

import setup from './server.setup.ts';
import routes from './routes.ts';

const { server, router } = new_server(setup, routes);

server.route(router);
server.start();
