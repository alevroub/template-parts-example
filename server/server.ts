import { init } from '../_lib/mod.ts';
import { setup } from './setup.ts';

const { server, router } = await init(setup);

server.route(router);
server.start();