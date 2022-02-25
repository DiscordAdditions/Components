export const ButtonColors = {
	/** PRIMARY - 1 */
	BLURPLE: 1,
	/** SECONDARY - 2 */
	GREY:    2,
	/** SUCCESS - 3 */
	GREEN:   3,
	/** DANGER - 4 */
	RED:     4,
	/** LINK - 5 */
	URL:     5
} as const;

export const ButtonStyles = {
	PRIMARY:   1,
	SECONDARY: 2,
	SUCCESS:   3,
	DANGER:    4,
	LINK:      5
} as const;

export const ComponentTypes = {
	ACTION_ROW:  1,
	BUTTON:      2,
	SELECT_MENU: 3,
	TEXT_INPUT:  4
} as const;

export const TextInputStyles = {
	SHORT:     1,
	PARAGRAPH: 2
} as const;
