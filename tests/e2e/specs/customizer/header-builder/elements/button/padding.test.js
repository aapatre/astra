import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Header builder button setting in customizer', () => {
	it( 'button padding should apply correctly', async () => {
		const buttonPadding = {
			'section-hb-button-1-padding': {
				desktop: {
					top: '80',
					right: '80',
					bottom: '80',
					left: '80',
				},
				tablet: {
					top: '60',
					right: '60',
					bottom: '60',
					left: '60',
				},
				mobile: {
					top: '40',
					right: '40',
					bottom: '40',
					left: '40',
				},
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'header-desktop-items': {
				above: {
					above_center: {
						0: 'button-1',
					},
				},
			},
			'header-mobile-items': {
				above: {
					above_center: {
						0: 'button-1',
					},
				},
			},
		};
		await setCustomize( buttonPadding );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await page.waitForSelector( '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button' );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'padding-top',
		} ).cssValueToBe( `${ buttonPadding[ 'section-hb-button-1-padding' ].desktop.top }${ buttonPadding[ 'section-hb-button-1-padding' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'padding-right',
		} ).cssValueToBe( `${ buttonPadding[ 'section-hb-button-1-padding' ].desktop.right }${ buttonPadding[ 'section-hb-button-1-padding' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ buttonPadding[ 'section-hb-button-1-padding' ].desktop.bottom }${ buttonPadding[ 'section-hb-button-1-padding' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'padding-left',
		} ).cssValueToBe( `${ buttonPadding[ 'section-hb-button-1-padding' ].desktop.left }${ buttonPadding[ 'section-hb-button-1-padding' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'padding-top',
		} ).cssValueToBe( `${ buttonPadding[ 'section-hb-button-1-padding' ].tablet.top }${ buttonPadding[ 'section-hb-button-1-padding' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'padding-right',
		} ).cssValueToBe( `${ buttonPadding[ 'section-hb-button-1-padding' ].tablet.right }${ buttonPadding[ 'section-hb-button-1-padding' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ buttonPadding[ 'section-hb-button-1-padding' ].tablet.bottom }${ buttonPadding[ 'section-hb-button-1-padding' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'padding-left',
		} ).cssValueToBe( `${ buttonPadding[ 'section-hb-button-1-padding' ].tablet.left }${ buttonPadding[ 'section-hb-button-1-padding' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'padding-top',
		} ).cssValueToBe( `${ buttonPadding[ 'section-hb-button-1-padding' ].mobile.top }${ buttonPadding[ 'section-hb-button-1-padding' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'padding-right',
		} ).cssValueToBe( `${ buttonPadding[ 'section-hb-button-1-padding' ].mobile.right }${ buttonPadding[ 'section-hb-button-1-padding' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ buttonPadding[ 'section-hb-button-1-padding' ].mobile.bottom }${ buttonPadding[ 'section-hb-button-1-padding' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'padding-left',
		} ).cssValueToBe( `${ buttonPadding[ 'section-hb-button-1-padding' ].mobile.left }${ buttonPadding[ 'section-hb-button-1-padding' ][ 'mobile-unit' ] }` );
	} );
} );
