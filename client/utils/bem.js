/**
 * High-level utility for handling static BEM strings.
 *
 * @param {string} classes
 * @returns {string}
 */
export function fromString(classes) {
	return classes
		.replace(/((?:[A-Z]|is|has|u|js)[A-Za-z0-9:-]*?)\/(.*?)(?=\s+|$)/g, (_, prefix, modifiers) => {
			return modifiers
				.split('/')
				.map(modifier => {
					// Support responsive suffixes.
					if (modifier[0] === ':') {
						return prefix + modifier;
					}

					return `${prefix}--${modifier}`;
				})
				.reduce((acc, fullModifier) => `${acc} ${fullModifier}`, prefix);
		});
}

/**
 * Low-level utility for handling dynamic prefix/modifiers.
 *
 * @param {string} prefix
 * @param {string|string[]} modifiers
 * @returns {string}
 */
export function item(prefix, modifiers) {
	let normalizedModifiers = modifiers;

	if (normalizedModifiers && typeof normalizedModifiers === 'string') {
		normalizedModifiers = normalizedModifiers.split(/\s+/i);
	}

	if (!Array.isArray(normalizedModifiers)) {
		normalizedModifiers = [];
	}

	const stringifiedModifiers = normalizedModifiers
		.map(mod => `/${mod}`)
		.join('');

	return fromString(`${prefix}${stringifiedModifiers}`);
}

/**
 * High-level utility for handling BEM module with dynamic name/modifiers.
 *
 * @param {string} moduleName
 * @param {string|string[]} modifiers
 * @returns {string}
 */
export function module(moduleName, modifiers) {
	return item(moduleName, modifiers);
}

/**
 * High-level utility for handling BEM element with dynamic name/modifiers.
 *
 * @param {string} moduleName
 * @param {string} elementName
 * @param {string|string[]} modifiers
 * @returns {string}
 */
export function element(moduleName, elementName, modifiers) {
	return item(`${moduleName}-${elementName}`, modifiers);
}

export const bm = module;
export const be = element;
