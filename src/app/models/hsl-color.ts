export class HSLColor {
	hue: number;
	saturation: number;
	value: number;

	private constructor(hue: number, saturation: number, value: number) {
		this.hue = hue;
		this.saturation = saturation;
		this.value = value;
	}

	public toString(): string {
		return `hsl(${this.hue}deg, ${this.saturation}%, ${this.value}%)`;
	}

	static of(hue: number, saturation: number, value: number): HSLColor {
		return new HSLColor(hue, saturation, value);
	}
}
