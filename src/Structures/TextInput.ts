import Component from "./Component";
import type { TextInputStyles } from "../util/Constants";
import { ComponentTypes } from "../util/Constants";
import type { TextInput as ITextInput } from "../util/types";

export type TextInputStyle = typeof TextInputStyles[keyof typeof TextInputStyles];
export default class TextInput extends Component<typeof ComponentTypes["TEXT_INPUT"]> {
	customID: string;
	style: TextInputStyle;
	label: string;
	minLength?: number;
	maxLength?: number;
	required?: boolean;
	value?: string;
	placeholder?: string;
	constructor(style: TextInputStyle, label: string, customID: string) {
		super(ComponentTypes.TEXT_INPUT);
		this.style = style;
		this.label = label;
		this.customID = customID;
	}

	/**
	 * Set the style of this text input
	 *
	 * * 1 - short
	 * * 2 - paragraph
	 *
	 * @see https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-styles
	 * @param {TextInputStyle} style - the style of this text input
	 * @returns {TextInput}
	 */
	setStyle(style: TextInputStyle) {
		this.style = style;
		return this;
	}

	/**
	 * Set the custom id of this text input
	 *
	 * @see https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure
	 * @param {string} customID - a developer-defined identifier for the input, max 100 characters
	 * @returns {TextInput}
	 */
	setCustomID(customID: string) {
		this.customID = customID;
		return this;
	}

	/**
	 * Set the label of this text input
	 *
	 * @see https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure
	 * @param {string} label - the label to display on this text input
	 * @returns {TextInput}
	 */
	setLabel(label: string) {
		this.label = label;
		return this;
	}

	/**
	 * Set the placeholder of this text input
	 *
	 * @see https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure
	 * @param {string} placeholder - custom placeholder text if nothing is selected, max 100 characters
	 * @returns {TextInput}
	 */
	setPlaceholder(placeholder: string) {
		this.placeholder = placeholder;
		return this;
	}

	/**
	 * Set the minimum/maximum length of this text input.
	 *
	 * @see https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure
	 * @param {number} [min] - the minimum length
	 * @param {number} [max] - the maximum length
	 * @returns {TextInput}
	 */
	setLength(min?: number, max?: number) {
		if (min) this.minLength = min;
		if (max) this.maxLength = max;
		return this;
	}

	/**
	 * Make this text input required.
	 *
	 * @see https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure
	 * @param {boolean} [required=true] - if this text input should be required or not - default true, setOptional also exists.
	 * @returns {TextInput}
	 */
	setRequired(required = true) {
		this.required = required;
		return this;
	}

	/**
	 * Make this text input optional.
	 *
	 * @see https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure
	 * @returns {TextInput}
	 */
	setOptional() {
		this.required = false;
		return this;
	}

	/**
	 * Set the initial value of this text input
	 *
	 * @see https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure
	 * @param {string} value - a pre-filled value for this component, max 4000 characters
	 * @returns {TextInput}
	 */
	setValue(value: string) {
		this.value = value;
		return this;
	}

	/** this method is meant to be for internal use only, don't use it, as it may break or change at a moments notice */
	load(style?: TextInputStyle, label?: string, customID?: string, placeholder?: string, value?: string, minLength?: number, maxLength?: number, required?: boolean) {
		if (style) this.setStyle(style);
		if (label) this.setLabel(label);
		if (customID) this.setCustomID(customID);
		if (placeholder) this.setPlaceholder(placeholder);
		if (value) this.setValue(value);
		if (minLength) this.setLength(minLength, undefined);
		if (maxLength) this.setLength(undefined, maxLength);
		if (typeof required !== "undefined") this.setRequired(required);
		return this;
	}

	override toJSON(): ITextInput {
		return {
			type:        this.type,
			custom_id:   this.customID,
			style:       this.style,
			label:       this.label,
			min_length:  this.minLength,
			max_length:  this.maxLength,
			required:    this.required,
			value:       this.value,
			placeholder: this.placeholder
		};
	}
}
