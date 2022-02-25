import Component from "./Component";
import { ComponentTypes } from "../util/Constants";
import type { PartialEmoji, SelectMenuOption, SelectMenu as ISelectMenu } from "../util/types";

export default class SelectMenu extends Component<typeof ComponentTypes["SELECT_MENU"]> {
	customID: string;
	options: Array<SelectMenuOption> = [];
	placeholder?: string;
	minValues?: number;
	maxValues?: number;
	disabled = false;
	/**
	 * Create a new SelectMenu
	 *
	 * @see https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure
	 * @param {string} customID - the custom id of this select menu
	 */
	constructor(customID: string) {
		super(ComponentTypes.SELECT_MENU);
		this.customID = customID;
	}

	/**
	 * Set the custom_id of this select menu.
	 *
	 * @see https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure
	 * @param {string} customID - a developer-defined identifier for the button, max 100 characters
	 * @returns {SelectMenu}
	 */
	setCustomID(customID: string) {
		this.customID = customID;
		return this;
	}

	/**
	 * Set the placeholder of this select menu.
	 *
	 * @see https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure
	 * @param {string} placeholder - custom placeholder text if nothing is selected, max 100 characters
	 * @returns {SelectMenu}
	 */
	setPlaceholder(placeholder: string) {
		this.placeholder = placeholder;
		return this;
	}

	/**
	 * Set the minimum/maximum values of this select menu.
	 *
	 * @see https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-menu-structure
	 * @param {number} [min] - the minimum selected values
	 * @param {number} [max] - the maximum selected values
	 * @returns {SelectMenu}
	 */
	setValues(min?: number, max?: number) {
		if (min) this.minValues = min;
		if (max) this.maxValues = max;
		return this;
	}

	/**
	 * Add an option to this select menu
	 *
	 * @see https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure
	 * @param {string} label
	 * @param {string} value
	 * @param {string} [description]
	 * @param {object} [emoji] - the emoji to displayed with this option
	 * @param {(string | null)} [emoji.id] - the id of this emoji, null if built in
	 * @param {string} [emoji.name] - the name of this emoji, unicode if built in
	 * @param {boolean} [emoji.animated] - if the emoji is animated
	 * @param {boolean} [defaultSelection] - if this option should be the default selected option
	 * @returns {SelectMenu}
	 */
	addOption(label: string, value: string, description?: string, emoji?: PartialEmoji, defaultSelection?: boolean) {
		this.options.push({
			label,
			value,
			description,
			emoji,
			default: defaultSelection
		});
		return this;
	}

	/**
	 * Add options to this select menu in bulk
	 *
	 * @param {Array<SelectMenuOption>} options - the options to add
	 * @returns {SelectMenu}
	 */
	addOptions(...options: Array<SelectMenuOption>) {
		options.map(o => this.addOption(o.label, o.value, o.description, o.emoji, o.default));
		return this;
	}

	/**
	 * Clear all currently present options on this select menu.
	 *
	 * @returns {SelectMenu}
	 */
	clearOptions() {
		this.options = [];
		return this;
	}

	/** this method is meant to be for internal use only, don't use it, as it may break or change at a moments notice */
	load(customID?: string, options?: Array<SelectMenuOption>, placeholder?: string, minValues?: number, maxValues?: number, disabled?: boolean) {
		if (customID) this.setCustomID(customID);
		if (options && Array.isArray(options) && options.length > 0) {
			this.clearOptions();
			this.addOptions(...options);
		}
		if (placeholder) this.setPlaceholder(placeholder);
		if (minValues) this.setValues(minValues, undefined);
		if (maxValues) this.setValues(undefined, maxValues);
		if (typeof disabled !== "undefined") {
			if (disabled) this.disable();
			else this.enable();
		}
		return this;
	}

	/** converts this SelectMenu instance to raw json */
	override toJSON(): ISelectMenu {
		return {
			type:        this.type,
			custom_id:   this.customID,
			options:     this.options,
			placeholder: this.placeholder,
			min_values:  this.minValues,
			max_values:  this.maxValues,
			disabled:    this.disabled
		};
	}
}
