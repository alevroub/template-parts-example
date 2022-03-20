const $select = (selector) => document.querySelector(selector);
const $$select = (selector) => document.querySelectorAll(selector);
const $on = (selector, event, handler) => document.querySelector(selector).addEventListener(event, handler);
const $$on = (selector, event, handler) => document.querySelectorAll(selector).addEventListener(event, handler);
const $window = (event, handler) => window.addEventListener(event, handler);

function header_component() {
	let navigation_visible = false;

	function toggle_navigation(event) {
		navigation_visible = !navigation_visible;
	}

	function hide_navigation() {
		navigation_visible = false;
	}

	function render() {
		$select('nav').dataset.visible = navigation_visible;
	}

	$on('.header__menu', 'click', event => {
		toggle_navigation();
		render();
	});

	return {
		toggle_navigation,
		hide_navigation,
		render
	}
}

const header = header_component();

setTimeout(() => {
	header.hide_navigation();
	header.render();
}, 5000);