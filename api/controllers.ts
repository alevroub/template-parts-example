export async function index(request: any) {
	/* 
		fetch from external API, etc. 
		
		const response = await fetch('http://etc.com/');
		const data = await response.json();
	*/	

	async function fake_fetch() {
		return new Promise((resolve) => {
			const delay = 200;

			setTimeout(() => {
				resolve({
					_id: 'hj43lk523kl4',
					title: 'Data from server',
					slug: { current: 'data-from-server' }
				})
			}, delay);
		})
	}

	const data = await fake_fetch();
	const head = {
		title: data.title,
		lang: 'no',
	}

	return { head, data }
}