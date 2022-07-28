import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { responsiveFontSize } from '../../../../../utils/responsive-utils';
describe( 'HTML 2 block settings in the customizer', () => {
	it( 'html2 font size should apply correctly', async () => {
		const htmlFontSize = {
			'header-html-2': '<a href="https://wpastra.com/">HTML font size</a>',
			'font-size-section-hb-html-2': {
				desktop: '60',
				tablet: '40',
				mobile: '20',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'html-2',
					},
				},
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'html-2',
					},
				},
			},
		};
		await setCustomize( htmlFontSize );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-html-2 .ast-builder-html-element' );
		await expect( {
			selector: '.ast-header-html-2 .ast-builder-html-element',
			property: 'font-size',
		} ).cssValueToBe( `${ htmlFontSize[ 'font-size-section-hb-html-2' ].desktop }${ htmlFontSize[ 'font-size-section-hb-html-2' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-html-2 .ast-builder-html-element',
			property: 'font-size',
		} ).cssValueToBe( `${ await responsiveFontSize( htmlFontSize[ 'font-size-section-hb-html-2' ].tablet ) }${ htmlFontSize[ 'font-size-section-hb-html-2' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-html-2 .ast-builder-html-element',
			property: 'font-size',
		} ).cssValueToBe( `${ await responsiveFontSize( htmlFontSize[ 'font-size-section-hb-html-2' ].mobile ) }${ htmlFontSize[ 'font-size-section-hb-html-2' ][ 'mobile-unit' ] }` );
	} );
} );
