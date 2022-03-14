export async function index(request: any) {
	/* 
		fetch from external API, etc. 
		
		const response = await fetch('http://etc.com/');
		const data = await response.json();
	*/	

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
		}, 100);
	})
}