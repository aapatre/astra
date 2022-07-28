import MenuSelectComponent from './ast-menu-select.js';

export const astMenuSelect = wp.customize.astraControl.extend( {
	renderContent: function renderContent() {
		let control = this;
		ReactDOM.render( <MenuSelectComponent control={ control } />, control.container[0] );
	}
} );
