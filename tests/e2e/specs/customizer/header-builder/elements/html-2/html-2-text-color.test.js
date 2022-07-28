import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'HTML 2 block settings in the customizer', () => {
	it( 'html2 text color for desktop should apply correctly', async () => {
		const htmlTextColor = {
			'header-html-2': 'Testing HTML2 text color',
			'header-html-2color': {
				desktop: 'rgb(166, 12, 190)',
				tablet: 'rgb(14, 136, 49)',
				mobile: 'rgb(213, 19, 81)',
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
		await setCustomize( htmlTextColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-html-2 .ast-builder-html-element' );
		await expect( {
			selector: '.ast-header-html-2 .ast-builder-html-element',
			property: 'color',
		} ).cssValueToBe( `${ htmlTextColor[ 'header-html-2color' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-html-2 .ast-builder-html-element',
			property: 'color',
		} ).cssValueToBe( `${ htmlTextColor[ 'header-html-2color' ].tablet }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-html-2 .ast-builder-html-element',
			property: 'color',
		} ).cssValueToBe( `${ htmlTextColor[ 'header-html-2color' ].mobile }` );
	} );
} );
