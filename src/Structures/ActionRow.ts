import type Button from "./Button";
import type SelectMenu from "./SelectMenu";
import type TextInput from "./TextInput";
import { ComponentTypes } from "../util/Constants";
import type {
	MessageActionRow,
	ModalActionRow,
	InteractionButton,
	URLButton,
	SelectMenu as ISelectMenu,
	TextInput as ITextInput
} from "../util/types";

export default class ActionRow {
	type = ComponentTypes.ACTION_ROW;
	private components: Array<Button | SelectMenu | TextInput> = [];
	addComponent(component: ActionRow["components"][number]) {
		this.components.push(component);
		return this;
	}

	addComponents(...components: Array<ActionRow["components"][number]>) {
		components.forEach(c => this.addComponent(c));
		return this;
	}

	get size() { return this.components.length; }
	getComponents() { return Array.from(this.components); }
	isEmpty() { return this.size === 0; }

	toJSON(): MessageActionRow | ModalActionRow {
		return {
			type:       this.type,
			components: this.components.map(c => c.toJSON()) as Array<InteractionButton | URLButton | ISelectMenu> | Array<ITextInput>
		} as MessageActionRow | ModalActionRow;
	}
}
