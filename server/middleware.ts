export function cors(next) {
	return context => {
		const { request, response } = context;
		const origin = request.headers.get('origin');
		const origins_allowed = [config.origin, ...config.origins_allowed]

		if (origin && origins_allowed.includes(origin)) {
			return next(context);
		} else {
			response.status = 403;
			response.body = 'Forbidden';
		}
	};
}