import ColorPaletteComponent from './color-palette.js';

export const colorPaletteControl = wp.customize.astraControl.extend( {
	renderContent: function renderContent() {
		let control = this;
		ReactDOM.render(  <ColorPaletteComponent control={ control }  customizer={ wp.customize }/>, control.container[0] );
	},
	ready : function() {
		'use strict';
		let control = this;
		control.registerToggleEvents();

		jQuery(document).mouseup(function(e){
			var container = jQuery(control.container);
			var colorWrap = container.find('.astra-color-picker-wrap');
			// If the target of the click isn't the container nor a descendant of the container.
			if (!colorWrap.is(e.target) && colorWrap.has(e.target).length === 0){
				container.find('.components-button.astra-color-icon-indicate.open').click();
			}
		});

		document.dispatchEvent( new CustomEvent( 'AstUpdatePaletteVariables', {} ) );
	},
	registerToggleEvents: function() {

		var control = this;

		/* Close popup when click outside anywhere outside of popup */
		jQuery( '.wp-full-overlay-sidebar-content, .wp-picker-container' ).click( function( e ) {
			if ( ! jQuery( e.target ).closest( '.ast-field-settings-modal' ).length ) {
				jQuery( '.ast-adv-toggle-icon.open' ).trigger( 'click' );
			}
		});
		control.container.on( 'click', '.ast-toggle-desc-wrap .ast-adv-toggle-icon', function( e ) {

			e.preventDefault();
			e.stopPropagation();

			var $this = jQuery(this);

			var parent_wrap = $this.closest( '.customize-control-ast-color-palette' );
			var is_loaded = parent_wrap.find( '.ast-field-settings-modal' );
			var parent_section = parent_wrap.parents('.control-section');

			if( $this.hasClass('open') ) {
				parent_wrap.find( '.ast-field-settings-modal' ).hide();
			} else {
				/* Close popup when another popup is clicked to open */
				var get_open_popup = parent_section.find('.ast-adv-toggle-icon.open');
				if( get_open_popup.length > 0 ) {
					get_open_popup.trigger('click');
				}
				if( is_loaded ) {
					parent_wrap.find( '.ast-field-settings-modal' ).show();
				}
			}

			$this.toggleClass('open');
		});

		control.container.on( "click", ".ast-toggle-desc-wrap > .customizer-text", function( e ) {

			e.preventDefault();
			e.stopPropagation();

			jQuery(this).find( '.ast-adv-toggle-icon' ).trigger('click');
		});
	},
} );
