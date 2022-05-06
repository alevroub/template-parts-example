import { new_server } from '../_lib/mod.ts';
import setup from '../setup.server.ts';

const { server, router } = await new_server(setup);

server.route(router);
server.start();