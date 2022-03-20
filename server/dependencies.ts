import * as abc from "https://deno.land/x/abc@v1.3.3/mod.ts";
import * as eta from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as path from "https://deno.land/std/path/mod.ts";
import { parse } from "https://deno.land/std/flags/mod.ts"

const process = parse(Deno.args);
const { Application } = abc;

export { Application as abc, eta, path, process };