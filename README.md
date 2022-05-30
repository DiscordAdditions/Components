## Discord Additions - Components
Some helpful additions to make creating components easier.

Get started by using our main class, the `ComponentHelper`.
```ts
// const { ComponentHelper, (...) } = require("@discord-additions/components");
import {
	ComponentHelper,
	ButtonStyles,
	ButtonColors,
	TextInputStyles,
	Button,
	SelectMenu,
	TextInput,
	MessageActionRow,
	ModalActionRow
} from "@discord-additions/components";

// undefined can be used to skip uneeded parameters - don't use null!
const helper = new ComponentHelper();

// add an interaction button (styles 1-4)
// style, customID, label, emoji, disabled
helper.addInteractionButton(ButtonStyles.PRIMARY, "some-custom-id", "My Button Label", { id: null, name: "🐾" }, false);
/*
 we have both ButtonStyles & ButtonColors - List: 
PRIMARY   - BLURPLE
SECONDARY - GRAY
SUCCESS   - GREEN
DANGER    - RED
LINK      - URL
*/

// add a url button (style 5)
// url, label, emoji, disabled
helper.addURLButton("https://google.com", "Click Here", { id: "681748079778463796", name: "paws8", animated: false }, false);

// for emojis, we have a helper to convert full emoji strings, or code points into a partial emoji (this method is static)
// emoji, type (default/custom)
ComponentHelper.emojiToPartial("🐾", "default") // { id: null, name: "🐾", animated: false }
ComponentHelper.emojiToPartial("<:paws8:681748079778463796>", "custom") // { id: "681748079778463796", name: "paws8", animated: false }
ComponentHelper.emojiToPartial("<a:owoanim:768551122066472990>", "custom") // { id: "768551122066472990", name: "owoanim", animated: true }

// if the current row has a component in it already, this method will automatically create a new row and add the select menu in that row, the create another row for you to continue using in other methods
// add a select menu
// customID, options, placeholder, minValues, maxValues, disabled
helper.addSelectMenu("some-custom-id", [], "Some Placeholder Here", 1, 3, false);
// see https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure for options structure

// add a text input
// style, label, customID, placeholder, value, minLength, maxLength, required
helper.addTextInput(TextInputStyles.SHORT, "Some Label Here", "some-custom-id", "Some Placeholder Here", "Initial Value", 20, 100, true);
// currently SHORT & PARAGRAPH exist

// remove all currently present empty rows (this is already done while converting to JSON)
helper.removeEmptyRows();

// convert all of the added content into JSON, ready to be used as a components property in a message/modal
helper.toJSON();


// a few other things, if you want to add a new row at any time, just call..
helper.addRow();
// this also accepts an array of components, if you want to add them while creating the row

// if you want to construct the components yourself, you can add them via these methods
helper.addComponent(new Button(ButtonColors.RED, "some-custom-id"));
// add in bulk (these will be passed through addComponent one at a time, in order)
helper.addComponents([
	new Button(ButtonStyles.LINK, "https://google.com"),
	new SelectMenu("some-custom-id"),
	new TextInput(TextInputStyles.PARAGRAPH, "Some Label", "some-custom-id")
]);
// these classes all come with their own methods to change things about them, please refer to the code for a list of them. They are all well documented.

// if you want to limit the maxium amount of items we'll put in a row to a different number than 5, you can provide that in the ComponentHelper constructor, or call setRowLimit
const helper3 = new ComponentHelper(3);
helper3.setRowMax(2);
// for those of you out there wanting to break things - we don't validate numbers, break it all you want

// for typescript compatibility, you can cast to either MessageActionRow or ModalActionRow. toJSON accepts a generic parameter for this.
helper.toJSON<MessageActionRow>();
helper.toJSON<ModalActionRow>();

// you can also specify it when creating the helper.
const helperMessage = new ComponentHelper<MessageActionRow>();
const helperMessage = new ComponentHelper<ModalActionRow>();
```

## Install
```sh
npm i @discord-additions/components
```
