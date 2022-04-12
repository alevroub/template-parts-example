// import * as eta from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import { parse } from "https://deno.land/std/flags/mod.ts"
import { serve } from "https://deno.land/std/http/server.ts";
import { router } from "https://crux.land/router@0.0.5";
import { lookup as mimetype } from "https://deno.land/x/media_types/mod.ts";
import { render } from 'https://raw.githubusercontent.com/alevroub/nano-template-engine/main/mod.ts'

const process = parse(Deno.args);

export { serve, router, render, mimetype, path, process };