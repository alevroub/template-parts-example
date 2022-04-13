const template_main: string = await Deno.readTextFile('frontend/app/template.html');
const template_pages: Record<string, string> = {};

for await (const page of Deno.readDir('frontend/pages')) {
	template_pages[page.name] = await Deno.readTextFile(`frontend/pages/${page.name}`);
}

export { template_main, template_pages };