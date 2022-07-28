import ButtonLinkComponent from "./ast-button-link.js";

export const astButtonLinkControl = wp.customize.astraControl.extend({
	renderContent: function renderContent() {
		let control = this;
		ReactDOM.render(
			<ButtonLinkComponent control={control} />,
			control.container[0]
		);
	},
});
