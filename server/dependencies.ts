import { Application, Router, Status, Context, Request, Response } from "https://deno.land/x/oak/mod.ts";
import { lookup as mimetype } from 'https://deno.land/x/media_types/mod.ts';
import { parse as parse_flags } from 'https://deno.land/std/flags/mod.ts';
import { debounce } from "https://deno.land/std/async/mod.ts";
import { render } from 'https://raw.githubusercontent.com/alevroub/nano-template-engine/main/mod.ts';

const process = parse_flags(Deno.args);
const oak_server = Application;
const oak_router = Router;
const http_status = Status;

export {
	Context,
	Request,
	Response,

	oak_server,
	oak_router,
	http_status,
	render,
	mimetype,
	process,
	debounce
};
