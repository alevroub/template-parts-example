function cors(next) {
	return context => {
		const { request, response } = context;
		const origin = request.headers.get('origin');

		if (origin && config.allowed_origins.includes(origin)) {
			return next(context);
		} else {
			response.status = 403;
			response.body = 'Forbidden';
		}
	};
}

export { cors }