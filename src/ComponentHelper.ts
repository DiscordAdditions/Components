import ActionRow from "./Structures/ActionRow";
import Button from "./Structures/Button";
import type { InteractionButtonStyle } from "./Structures/Button";
import SelectMenu from "./Structures/SelectMenu";
import TextInput from "./Structures/TextInput";
import { ButtonStyles, ComponentTypes } from "./util/Constants";
import type { TextInputStyle } from "./Structures/TextInput";
import type { MessageActionRow, ModalActionRow, PartialEmoji, SelectMenuOption } from "./util/types";

type RowMax = 1 | 2 | 3 | 4 | 5;
type ValidComponents = Button | SelectMenu | TextInput;
export default class ComponentHelper<T extends MessageActionRow | ModalActionRow = MessageActionRow | ModalActionRow> {
	rowMax: RowMax = 5;
	private rows: Array<ActionRow> = [];
	private currentIndex = -1;
	constructor(rowMax?: RowMax) {
		if (rowMax) this.rowMax = rowMax;
	}

	setRowMax(rowMax: RowMax) {
		this.rowMax = rowMax;
		return this;
	}

	private getCurrentRow() {
		return (this.rows[this.currentIndex] || (this.rows[this.currentIndex] = new ActionRow()));
	}

	/**
	 * Star a new action row
	 *
	 * @param {Array<ValidComponents>} [components=[]] - the components to start this new row with
	 * @returns {this}
	 */
	addRow(components: Array<ValidComponents> = []) {
		this.currentIndex++;
		this.rows.push(new ActionRow().addComponents(...components));
		return this;
	}

	/**
	 * Add a component to the current row, or a new row depending on certain conditions
	 *
	 * @param {ValidComponents} component - the component to add
	 * @returns {this}
	 */
	addComponent(component: ValidComponents) {
		const cur = this.getCurrentRow();
		if (component.type === ComponentTypes.SELECT_MENU) {
			if (cur.isEmpty()) {
				cur.addComponent(component);
				this.addRow();
				return this;
			} else {
				this.addRow([component]).addRow();
				return this;
			}
		}
		if (cur.size >= this.rowMax) return this.addRow([component]);
		else {
			cur.addComponent(component);
			return this;
		}
	}

	/**
	 * bulk add several components
	 *
	 * @param {Array<ValidComponents>} components - the components to add
	 * @returns {this}
	 */
	addComponents(...components: Array<ValidComponents>) {
		components.map(c => this.addComponent(c));
		return this;
	}

	/**
	 * Add an interaction button to the current row
	 *
	 * @param {InteractionButtonStyle} style - the style of the button (see [this](https://discord.com/developers/docs/interactions/message-components#button-object-button-styles))
	 * @param {string} customID - a developer-defined identifier for the button, max 100 characters
	 * @param {string} [label] - text that appears on the button, max 80 characters
	 * @param {PartialEmoji} [emoji] - an emoji that appears on the button
	 * @param {boolean} [disabled] - whether the button is disabled
	 * @returns {this}
	 */
	addInteractionButton(style: InteractionButtonStyle, customID: string, label?: string, emoji?: PartialEmoji, disabled?: boolean) {
		this.addComponent(new Button(style, customID).load(style, customID, label, emoji, disabled));
		return this;
	}

	/**
	 * Add a url button to the current row
	 *
	 * @param {string} url - the url to open when clicked
	 * @param {string} label - 	text that appears on the button, max 80 characters
	 * @param {PartialEmoji} [emoji] - an emoji that appears on the button
	 * @param {boolean} [disabled] - whether the button is disabled
	 * @returns {this}
	 */
	addURLButton(url: string, label?: string, emoji?: PartialEmoji, disabled?: boolean) {
		this.addComponent(new Button(ButtonStyles.LINK, url).load(ButtonStyles.LINK, url, label, emoji, disabled));
		return this;
	}

	get addLinkButton() { return this.addURLButton.bind(this); }

	/**
	 * Add a select menu (to the current row, if empty - else as a new row)
	 *
	 * @param {string} customID - a developer-defined identifier for the button, max 100 characters
	 * @param {Array<SelectMenuOption>} options - the choices in the select, max 25
	 * @param {string} [placeholder] - custom placeholder text if nothing is selected, max 100 characters
	 * @param {number} [minValues] - the minimum number of items that must be chosen; default 1, min 0, max 25
	 * @param {number} [maxValues] - the maximum number of items that can be chosen; default 1, max 25
	 * @param {boolean} [disabled] - disable the select, default false
	 * @returns {this}
	 */
	addSelectMenu(customID: string, options: Array<SelectMenuOption>, placeholder?: string, minValues?: number, maxValues?: number, disabled?: boolean) {
		this.addComponent(new SelectMenu(customID).load(customID, options, placeholder, minValues, maxValues, disabled));
		return this;
	}

	/**
	 * Add a text input to the current row
	 *
	 * @param {TextInputStyle} style - the style of the text input (see [this](https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-styles))
	 * @param {string} label - 	the label for this component
	 * @param {string} customID - a developer-defined identifier for the input, max 100 characters
	 * @param {string} [placeholder] - custom placeholder text if the input is empty, max 100 characters
	 * @param {string} [value] - a pre-filled value for this component, max 4000 characters
	 * @param {number} [minLength] - the minimum input length for a text input, min 0, max 4000
	 * @param {number} [maxLength] - the maximum input length for a text input, min 1, max 4000
	 * @param {boolean} [required] - whether this component is required to be filled, default true
	 * @returns
	 */
	addTextInput(style: TextInputStyle, label: string, customID: string, placeholder?: string, value?: string, minLength?: number, maxLength?: number, required?: boolean) {
		this.addComponent(new TextInput(style, label, customID).load(style, label, customID, placeholder, value, minLength, maxLength, required));
		return this;
	}

	/**
	 * remove all of the rows that are empty
	 *
	 * @returns {this}
	 */
	removeEmptyRows() {
		this.rows.forEach((row, index) => {
			if (row.size === 0) this.rows.splice(index, 1);
		});
		this.currentIndex = this.rows.length - 1;

		return this;
	}

	/** convert the current contents to JSON */
	toJSON() { return this.removeEmptyRows().rows.map(row => row.toJSON()) as Array<T>; }

	/**
	 * Convert an emoji to a partial
	 *
	 * @param {string} emoji - the unicode point of the emoji if default, else the fully qualified emoji
	 * @param {("default" | "custom")} type - default if built in (unicode), custom otherwise
	 * @returns {PartialEmoji}
	 * @example emojiToPartial("🐾", "default")
	 * @example emojiToPartial("<:paws8:681748079778463796>", "custom")
	 */
	static emojiToPartial(emoji: string, type: "default" | "custom"): PartialEmoji {
		if (type === "default") return {
			id:       null,
			name:     emoji,
			animated: false
		};
		else {
			const [, anim, name, id] = /^<?(a)?:(.*):([\d]{15,21})>?$/.exec(emoji) ?? [];
			if (!name || !id) return this.emojiToPartial(emoji, "default");
			return {
				id,
				name,
				animated: anim === "a"
			};
		}
	}
}
