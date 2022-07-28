import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Social Icons in the customizer', () => {
	it( 'social icon color should apply correctly', async () => {
		const socialIconColor = {
			'header-social-1-color': {
				desktop: 'rgb(215, 57, 57)',
				tablet: 'rgb(57, 119, 7)',
				mobile: 'rgb(232, 26, 127)',
			},
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',
					},
				},
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( socialIconColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-header-social-1-wrap .ast-social-color-type-custom svg' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom svg',
			property: 'fill',
		} ).cssValueToBe( `${ socialIconColor[ 'header-social-1-color' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom svg',
			property: 'fill',
		} ).cssValueToBe( `${ socialIconColor[ 'header-social-1-color' ].tablet }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-social-1-wrap .ast-social-color-type-custom svg',
			property: 'fill',
		} ).cssValueToBe( `${ socialIconColor[ 'header-social-1-color' ].mobile }` );
	} );
} );
