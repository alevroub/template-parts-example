export async function index_controller(request: any) {
	const return_object: any = {
		head: {
			title: 'Data from server',
			lang: 'no'
		},

		data: {
			_id: 'hj43lk523kl4',
			slug: {
				current: 'data-from-server'
			}
		}
	}
	
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(return_object)
		}, 10);
	})
}