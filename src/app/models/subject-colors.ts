import {HSLColor} from './hsl-color';

export class SubjectColor {
	color: HSLColor;
	text: string;
}

export class SubjectColors {
	public static readonly ORANGE: SubjectColor = {
		color: HSLColor.of(16,82,56),
		text: "orange"
	};

	public static readonly DARK_BLUE: SubjectColor = {
		color: HSLColor.of(231,26,34),
		text: "dunkelblau"
	};

	public static readonly BLACK: SubjectColor = {
		color: HSLColor.of(266,28,5),
		text: "schwarz"
	}

	public static readonly WHITE: SubjectColor = {
		color: HSLColor.of(0,0,100),
		text: "weiß"
	}

	public static readonly YELLOW: SubjectColor = {
		color: HSLColor.of(49,90,62),
		text: "gelb"
	}

	public static readonly LIGHT_GREEN: SubjectColor = {
		color: HSLColor.of(133,44,51),
		text: "hellgrün"
	}

	public static readonly DARK_GREEN: SubjectColor = {
		color: HSLColor.of(126,72,29),
		text: "dunkelgrün"
	}

	public static readonly PURPLE: SubjectColor = {
		color: HSLColor.of(278,47,30),
		text: "lila"
	}

	public static readonly LIGHT_BLUE: SubjectColor = {
		color: HSLColor.of(197,78,64),
		text: "hellblau"
	}

	public static readonly DARK_GRAY: SubjectColor = {
		color: HSLColor.of(254,6,41),
		text: "dunkelgrau"
	}
}
