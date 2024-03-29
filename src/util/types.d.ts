import type { ComponentTypes } from "./Constants";

export interface MessageActionRow {
	components: Array<InteractionButton | URLButton | SelectMenu>;
	type: typeof ComponentTypes["ACTION_ROW"];
}

export interface ModalActionRow {
	components: Array<TextInput>;
	type: typeof ComponentTypes["ACTION_ROW"];
}

export interface ButtonBase {
	disabled?: boolean;
	emoji?: PartialEmoji;
	label?: string;
	type: typeof ComponentTypes["BUTTON"];
}

export interface InteractionButton extends ButtonBase {
	customID: string;
	style: InteractionButtonStyle;
}

export interface URLButton extends ButtonBase {
	url: string;
	style: typeof ButtonStyles["LINK"];
}

export interface PartialEmoji {
	id: string | null;
	name: string;
	animated?: boolean;
}

export interface SelectMenu {
	customID: string;
	disabled?: boolean;
	maxValues?: number;
	minValues?: number;
	options: Array<SelectMenuOption>;
	placeholder?: string;
	type: typeof ComponentTypes["SELECT_MENU"];
}

/** @see https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure */
export interface SelectMenuOption {
	/** the user-facing name of the option, max 100 characters */
	label: string;
	/** the developer-defined value of the option, max 100 characters */
	value: string;
	/** an additional description of the option, max 100 characters */
	description?: string;
	/** emoji to display with the label */
	emoji?: PartialEmoji;
	/** will render this option as selected by default */
	default?: boolean;
}

export interface TextInput {
	type: typeof ComponentTypes["TEXT_INPUT"];
	customID: string;
	style: TextInputStyle;
	label: string;
	minLength?: number;
	maxLength?: number;
	required?: boolean;
	value?: string;
	placeholder?: string;
}
