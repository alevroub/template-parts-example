import * as eta from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import { parse } from "https://deno.land/std/flags/mod.ts"
import { serve } from "https://deno.land/std/http/server.ts";
import { router } from "https://crux.land/router@0.0.5";

const process = parse(Deno.args);

export { serve, router, eta, path, process };