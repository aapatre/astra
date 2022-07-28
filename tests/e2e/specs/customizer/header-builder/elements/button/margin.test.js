import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Header builder button setting in customizer', () => {
	it( 'margin should apply correctly', async () => {
		const buttonMargin = {
			'section-hb-button-1-margin': {
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
		await setCustomize( buttonMargin );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await page.waitForSelector( '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button' );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'margin-top',
		} ).cssValueToBe( `${ buttonMargin[ 'section-hb-button-1-margin' ].desktop.top }${ buttonMargin[ 'section-hb-button-1-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'margin-right',
		} ).cssValueToBe( `${ buttonMargin[ 'section-hb-button-1-margin' ].desktop.right }${ buttonMargin[ 'section-hb-button-1-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ buttonMargin[ 'section-hb-button-1-margin' ].desktop.bottom }${ buttonMargin[ 'section-hb-button-1-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'margin-left',
		} ).cssValueToBe( `${ buttonMargin[ 'section-hb-button-1-margin' ].desktop.left }${ buttonMargin[ 'section-hb-button-1-margin' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'margin-top',
		} ).cssValueToBe( `${ buttonMargin[ 'section-hb-button-1-margin' ].tablet.top }${ buttonMargin[ 'section-hb-button-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'margin-right',
		} ).cssValueToBe( `${ buttonMargin[ 'section-hb-button-1-margin' ].tablet.right }${ buttonMargin[ 'section-hb-button-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ buttonMargin[ 'section-hb-button-1-margin' ].tablet.bottom }${ buttonMargin[ 'section-hb-button-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'margin-left',
		} ).cssValueToBe( `${ buttonMargin[ 'section-hb-button-1-margin' ].tablet.left }${ buttonMargin[ 'section-hb-button-1-margin' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'margin-top',
		} ).cssValueToBe( `${ buttonMargin[ 'section-hb-button-1-margin' ].mobile.top }${ buttonMargin[ 'section-hb-button-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'margin-right',
		} ).cssValueToBe( `${ buttonMargin[ 'section-hb-button-1-margin' ].mobile.right }${ buttonMargin[ 'section-hb-button-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ buttonMargin[ 'section-hb-button-1-margin' ].mobile.bottom }${ buttonMargin[ 'section-hb-button-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'margin-left',
		} ).cssValueToBe( `${ buttonMargin[ 'section-hb-button-1-margin' ].mobile.left }${ buttonMargin[ 'section-hb-button-1-margin' ][ 'mobile-unit' ] }` );
	} );
} );
