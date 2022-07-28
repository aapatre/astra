import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'HTML 2 block settings in the customizer', () => {
	it( 'html2 link color for desktop should apply correctly', async () => {
		const htmlLinkColor = {
			'header-html-2': '<a href="https://wpastra.com/">HTML link color</a>',
			'header-html-2link-color': {
				desktop: 'rgb(12, 177, 115)',
				tablet: 'rgb(131, 12, 166)',
				mobile: 'rgb(156, 110, 11)',
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
		await setCustomize( htmlLinkColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-html-2 a' );
		await expect( {
			selector: '.ast-header-html-2 a',
			property: 'color',
		} ).cssValueToBe( `${ htmlLinkColor[ 'header-html-2link-color' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-html-2 a',
			property: 'color',
		} ).cssValueToBe( `${ htmlLinkColor[ 'header-html-2link-color' ].tablet }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-html-2 a',
			property: 'color',
		} ).cssValueToBe( `${ htmlLinkColor[ 'header-html-2link-color' ].mobile }` );
	} );
} );
