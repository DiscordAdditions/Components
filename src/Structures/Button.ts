import Component from "./Component";
import { ButtonStyles, ComponentTypes } from "../util/Constants";
import type { InteractionButton, URLButton, PartialEmoji } from "../util/types";

export type ButtonStyle = typeof ButtonStyles[keyof typeof ButtonStyles];
export type InteractionButtonStyle = Exclude<ButtonStyle, typeof ButtonStyles["LINK"]>;
export default class Button extends Component<typeof ComponentTypes["BUTTON"]> {
	style: ButtonStyle;
	customID?: string;
	url?: string;
	label?: string;
	emoji?: PartialEmoji;
	/**
	 * Create a new Button
	 *
	 * @see https://discord.com/developers/docs/interactions/message-components#button-object-button-structure
	 * @param {ButtonStyle} style - the style of this button - 1, blurple - 2, grey - 3, green - 4, red - 5, link
	 * @param {string} urlOrCustomID - the url of this button if style 5, else the custom id of this button
	 */
	constructor(style: ButtonStyle, urlOrCustomID: string) {
		super(ComponentTypes.BUTTON);
		this.style = style;
		if (style === ButtonStyles.LINK) this.url = urlOrCustomID;
		else this.customID = urlOrCustomID;
	}

	/**
	 * Set the style of this button
	 *
	 * * 1 - blurple
	 * * 2 - grey
	 * * 3 - green
	 * * 4 - red
	 * * 5 - link
	 *
	 * @see https://discord.com/developers/docs/interactions/message-components#button-object-button-styles
	 * @param {ButtonStyle} style - the style of this button
	 * @returns {Button}
	 */
	setStyle(style: ButtonStyle) {
		this.style = style;
		return this;
	}

	/**
	 * Set the custom id of this button (styles 1-4)
	 *
	 * @see https://discord.com/developers/docs/interactions/message-components#button-object-button-structure
	 * @param {string} customID - a developer-defined identifier for the button, max 100 characters
	 * @returns {Button}
	 */
	setCustomID(customID: string) {
		this.customID = customID;
		return this;
	}

	/**
	 * Set the custom id of this button (style 5)
	 *
	 * @see https://discord.com/developers/docs/interactions/message-components#button-object-button-structure
	 * @param {string} url - the url to open when this button is clicked
	 * @returns {Button}
	 */
	setURL(url: string) {
		this.url = url;
		return this;
	}

	/**
	 * Set the label of this button
	 *
	 * @see https://discord.com/developers/docs/interactions/message-components#button-object-button-structure
	 * @param {string} label - the label to display on this button
	 * @returns {Button}
	 */
	setLabel(label: string) {
		this.label = label;
		return this;
	}

	/**
	 * Set the emoji of this buttom
	 *
	 * @param {string} emoji - the emoji to display on this button
	 * @returns {Button}
	 */
	setEmoji(emoji: PartialEmoji) {
		this.emoji = emoji;
		return this;
	}

	/** this method is meant to be for internal use only, don't use it, as it may break or change at a moments notice */
	load(style?: ButtonStyle, urlOrCustomID?: string, label?: string, emoji?: PartialEmoji, disabled?: boolean) {
		if (style) this.setStyle(style);
		if (urlOrCustomID) {
			if (this.style === ButtonStyles.LINK) this.url = urlOrCustomID;
			else this.customID = urlOrCustomID;
		}
		if (label) this.setLabel(label);
		if (emoji) this.setEmoji(emoji);
		if (typeof disabled !== "undefined") {
			if (disabled) this.disable();
			else this.enable();
		}

		return this;
	}

	override toJSON(): InteractionButton | URLButton {
		const obj = {
			type:     this.type,
			style:    this.style,
			label:    this.label,
			emoji:    this.emoji,
			disabled: this.disabled
		} as InteractionButton | URLButton;
		if (this.style === ButtonStyles.LINK) {
			(obj as URLButton).url = this.url!;
			return obj;
		} else {
			(obj as InteractionButton).custom_id = this.customID!;
			return obj;
		}

	}
}
