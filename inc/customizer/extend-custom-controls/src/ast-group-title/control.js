import GroupTitleComponent from './ast-group-title.js';

export const astGroupTitleControl = wp.customize.astraControl.extend( {
	renderContent: function renderContent() {
		let control = this;
		ReactDOM.render( <GroupTitleComponent control={ control } />, control.container[0] );
	},
	ready: function() {

		'use strict';

		let device = jQuery('.wp-full-overlay-footer .devices button.active').attr('data-device')

		jQuery( '.customize-control-ast-group-title .ast-responsive-btns li' ).removeClass( 'active' );

		jQuery( '.customize-control-ast-group-title .ast-responsive-btns li.' + device ).addClass( 'active' );

		jQuery('.wp-full-overlay-footer .devices button').on('click', function() {
			let currentDevice = jQuery(this).attr('data-device');
			jQuery( '.customize-control-ast-group-title .ast-responsive-btns li' ).removeClass( 'active' );
			jQuery( '.customize-control-ast-group-title .ast-responsive-btns li.' + currentDevice ).addClass( 'active' );
		});

		this.container.find( '.ast-responsive-btns button' ).on( 'click', function( event ) {
			let respBtnDevice = jQuery(this).attr('data-device');
			if( 'desktop' == respBtnDevice ) {
				respBtnDevice = 'tablet';
			} else if( 'tablet' == respBtnDevice ) {
				respBtnDevice = 'mobile';
			} else {
				respBtnDevice = 'desktop';
			}
			jQuery( '.wp-full-overlay-footer .devices button[data-device="' + respBtnDevice + '"]' ).trigger( 'click' );
		});
	},
} );
