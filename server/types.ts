export type RouteController = (request: Request, params: Record<string, string>) => {
	meta: object,
	data: any
};

export type Route = {
	path: string
	page: string
	controller: RouteController
}