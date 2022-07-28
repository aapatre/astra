import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { responsiveFontSize } from '../../../../../utils/responsive-utils';
describe( 'Header builder button setting in customizer', () => {
	it( 'button font should apply correctly', async () => {
		const buttonFont = {
			'header-button1-font-family': 'Aubrey, display',
			'header-button1-font-weight': 400,
			'header-button1-text-transform': 'uppercase',
			'header-button1-line-height': '2',
			'header-button1-letter-spacing': 10,
			'header-button1-font-size': {
				desktop: 25,
				tablet: 20,
				mobile: 15,
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
		await setCustomize( buttonFont );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button' );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'font-family',
		} ).cssValueToBe( `${ buttonFont[ 'header-button1-font-family' ] }` );

		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'font-weight',
		} ).cssValueToBe( `${ buttonFont[ 'header-button1-font-weight' ] }` );

		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'text-transform',
		} ).cssValueToBe( `${ buttonFont[ 'header-button1-text-transform' ] }` );

		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'line-height',
		} ).cssValueToBe( `${ buttonFont[ 'header-button1-line-height' ] * buttonFont[ 'header-button1-font-size' ].desktop }` + 'px' );

		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'letter-spacing',
		} ).cssValueToBe( `${ buttonFont[ 'header-button1-letter-spacing' ] + 'px' }` );

		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'font-size',
		} ).cssValueToBe( `${ buttonFont[ 'header-button1-font-size' ].desktop }${ buttonFont[ 'header-button1-font-size' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'font-size',
		} ).cssValueToBe( `${ await responsiveFontSize( buttonFont[ 'header-button1-font-size' ].tablet,
		) }${ buttonFont[ 'header-button1-font-size' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-button-1[data-section*="section-hb-button-"] .ast-builder-button-wrap .ast-custom-button',
			property: 'font-size',
		} ).cssValueToBe( `${ await responsiveFontSize( buttonFont[ 'header-button1-font-size' ].mobile,
		) }${ buttonFont[ 'header-button1-font-size' ][ 'mobile-unit' ] }` );
	} );
} );
