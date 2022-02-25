import type { ComponentTypes } from "../util/Constants";

export type ComponentType = typeof ComponentTypes[keyof typeof ComponentTypes];
export default class Component<T extends ComponentType = ComponentType> {
	type: T;
	disabled = false;
	constructor(type: T) {
		this.type = type;
	}

	/**
	 * Disable this component
	 *
	 * @returns {this}
	 */
	disable() {
		this.disabled = true;
		return this;
	}

	/**
	 * Enable this component
	 *
	 * @returns {this}
	 */
	enable() {
		this.disabled = false;
		return this;
	}

	toJSON() { return {}; }
}
