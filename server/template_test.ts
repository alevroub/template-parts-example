import { render } from './template.ts';

const TEST_CODE = `<body>
		<p>Welcome, {{user.name.first}}!</p>
		<p>Products:</p>
		<div>{{ product | stringify }}</div>
		<ul>
			{% for n in numbers %}
				{% for product in product_list %}
					<div>print {{ product.name }}</div>
					{% for price in product.prices %}
						<span>{{ price | price | lowercase }}</span>
					{% endfor %}
					<div>and {{ n }}</div>
				{% endfor %}
			{% endfor %}
		</ul>

		{% if a_boolean %}
			<div>IF</div>
		{% else %}
			<div>ELSE</div>
			<div>ELSE</div>

			{% if not a_boolean %}
				<div>ELSE IF</div>
			{% endif %}
		{% endif %}

		<div>{{ product.nonexistent }}</div>
	</body>
	{# this is a comment #}`;

const TEST_DATA = {
	user: {
		name: {
			first: 'Bob',
		},
	},

	number: 200,
	a_boolean: false,

	product: {
		name: 'PRODUCT',
	},

	numbers: [1, 2, 3],

	product_list: [
		{ name: 'banana', prices: [20, 88] },
		{ name: 'pear', prices: [55, 100] },
	],
};

const TEST_FILTERS = {
	price: (value: any) => `NOK ${value},–`,
	stringify: (value: any) => JSON.stringify(value),
};

console.time('COMP_TIME');
console.log(render(TEST_CODE, TEST_DATA, TEST_FILTERS))
console.timeEnd('COMP_TIME');