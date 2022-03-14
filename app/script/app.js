document.addEventListener('click', event => {
	const clicked = rule => event.target.closest(rule);

	if (clicked('header')) {
		console.log('clicked the header');
	}
});
