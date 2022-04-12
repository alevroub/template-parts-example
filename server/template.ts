// Copyright (c) 2022 Alejandro V. Rojas. All rights reserved. MIT license.

/**
 * v0.0.1
 *
 * Nano Template Engine – a very very very very simple template engine.
 * This template engine does not perform any JS evaluations at runtime.
 * It was made mostly for playing around with simple prototypes deployed
 * with Deno Deploy, which does not allow eval() for now. It does not try
 * to reinvent the wheel in terms of syntax and neither does it guide
 * you through it. Below is a summary of language features. This is most
 * likely not the best engine to get started with if you've never used
 * a template engine before. However if you've worked with Twig or similar
 * engines it should look very familiar. Still, be gentle.
 *
 * FEATURES
 * 	>> loops / nested loops
 * 	>> if / if not / else
 * 	>> filters
 * 	>> comments
 * 	>> include files
 *
 * EXAMPLE
 * 	{% include "header.html" %}
 * 	{# a comment in between #}
 * 	{% for user in users %}
 * 		{% if user.fullname %}
 *		 		<div>{{ user.fullname | title_case }}</div>
 * 		{% else %}
 * 			<div>{{ user.name }}</div>
 * 		{% endif %}
 * 	{% endfor %}
 *
 * USAGE
 * 	template = 	<div>{{ user.name | shout }}<div>
 * 	data 		=	{ user: { name: "Alejandro" } }
 * 	filters 	= 	{ shout: value => `${value}!` }
 * 	options  =  {}
 *
 * 	render(template, data, filters, options) --> <div>Alejandro!</div>
 *
 * OPTIONS
 * 	show_comments : boolean = false		// whether it will include comments in output
 * 	include_path  : string  = ''			// path to prepend to include file blocks
 *
 */

export type NanoEngineFilters = {
	[key: string]: (value: any) => string;
};

export type NanoEngineOptions = {
	show_comments?: boolean;
	include_path?: string;
};

export function render(
	template: string,
	data: object,
	filters: NanoEngineFilters,
	options?: NanoEngineOptions
): string {
	return compile(parse(template), data, filters, options);
}

function parse(input: string): string[] {
	const token_regex = new RegExp('({%.*?%})|({{.*?}})|({#.*?#})', 'g');
	const tokens: string[] = input.split(token_regex).filter(v => v);

	const block_buffer: { start: number; depth: number; tokens: string[] } = { start: -1, depth: 0, tokens: [] };
	const parsed_output: string[] = [];

	for (let position = 0; position < tokens.length; position++) {
		const token = tokens[position];
		const statement = token.slice(2, -2).trim();

		if (token.startsWith('{%') && !statement.startsWith('include')) {
			const [ keyword ] = statement.split(' ');

			block_buffer.tokens.push(token);

			if (keyword.startsWith('for') || keyword.startsWith('if')) {
				if (block_buffer.depth === 0) {
					block_buffer.start = position;
				}

				block_buffer.depth += 1;
			}

			if (keyword.startsWith('end')) {
				block_buffer.depth -= 1;

				if (block_buffer.depth === 0) {
					parsed_output.push(block_buffer.tokens.join(''));

					block_buffer.tokens = [];
					block_buffer.start = -1;
				}
			}
		} else {
			if (block_buffer.tokens.length > 0) {
				block_buffer.tokens.push(token);
			} else {
				parsed_output.push(token);
			}
		}
	}

	return parsed_output;
}

function compile(
	input_parsed: string[],
	input_data: object,
	input_filters: NanoEngineFilters,
	input_options?: NanoEngineOptions
): string {
	const compiled_output: string[] = [];
	const compile_options: NanoEngineOptions = Object.assign({
		include_path: '',
		show_comments: false
	}, input_options);

	function append_to_output(output_code: string): void {
		compiled_output.push(output_code);
	}

	function get_value_from_input_data(variable_name: string): any {
		const variable_name_dot_separated = variable_name.split('.');
		const variable_value = variable_name_dot_separated.reduce((parent: any, variable: string) => {
			return parent[variable] !== undefined ? parent[variable] : '';
		}, input_data);

		return variable_value;
	}

	function compile_comment(token: string): void {
		if (compile_options.show_comments === true) {
			const comment = token.replace('{#', '<!--').replace('#}', '-->');
			append_to_output(comment);
		}
	}

	function compile_expression(token: string): void {
		const statement = token.slice(2, -2).trim();

		if (statement.includes('|')) {
			const [variable, ...filters] = statement.split('|').map(v => v.trim());
			const variable_value = get_value_from_input_data(variable);
			const filtered_value = filters.reduce((processed_value, filter) => {
				return input_filters[filter] !== undefined ? input_filters[filter](processed_value) : processed_value;
			}, variable_value);

			append_to_output(filtered_value.toString());
		} else {
			const variable_value = get_value_from_input_data(statement);
			append_to_output(variable_value.toString());
		}
	}

	function compile_block(token: string): void {
		const block_content_regex = new RegExp('({%.*?%})', 'g');
		const block_content = token.split(block_content_regex).slice(1, -1);
		const statement = block_content[0].slice(2, -2).trim();

		if (statement.startsWith('for')) {
			const [_, for_variable, __, for_iterator] = statement.split(' ');

			const loop_content = block_content.slice(1, -1);
			const loop_iterator = get_value_from_input_data(for_iterator);

			for (const data of loop_iterator) {
				append_to_output(render(loop_content.join(''), { ...input_data, [for_variable]: data }, input_filters));
			}
		}

		if (statement.startsWith('if')) {
			const statement_parts = statement.split(' ');
			const is_not_statement = statement_parts.length === 3 && statement_parts[1] === 'not';
			const if_value = get_value_from_input_data(is_not_statement ? statement_parts[2] : statement_parts[1]);
			const if_condition = is_not_statement ? !if_value : if_value;
			const else_position = block_content.indexOf('{% else %}');
			const if_block = block_content.slice(1, else_position);
			const else_block = else_position > -1 ? block_content.slice(else_position + 1, -1) : null;

			if (if_condition) {
				append_to_output(render(if_block.join(''), input_data, input_filters));
			} else {
				if (else_block) {
					append_to_output(render(else_block.join(''), input_data, input_filters));
				}
			}
		}

		if (statement.startsWith('include')) {
			const [_, filename] = statement.split(' ');
			const filepath = compile_options.include_path + filename.slice(1, -1);
			const source_file = Deno.readTextFileSync(filepath);

			append_to_output(render(source_file, input_data, input_filters));
		}
	}

	for (const token of input_parsed) {
		switch (true) {
			case token.startsWith('{#'):
				compile_comment(token);
				break;
			case token.startsWith('{{'):
				compile_expression(token);
				break;
			case token.startsWith('{%'):
				compile_block(token);
				break;
			default:
				append_to_output(token);
		}
	}

	return compiled_output.join('');
}
