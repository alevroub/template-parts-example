import { Context, Request, Response } from './dependencies.ts';

export {
	Context,
	Request as ContextRequest,
	Response as ContextResponse
};

export type RouteController = (context: Context) => Promise<{
	data: any;
	meta: Record<string, string>;
}>;

export type Route = {
	path: string;
	page: string;
	controller: RouteController;
};
