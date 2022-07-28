import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
describe( 'Account icons in the customizer', () => {
	it( 'account icon color should apply correctly', async () => {
		const accountIconColor = {
			'header-account-icon-color': 'rgb(120, 22, 162)',
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'account',
					},
				},
			},
		};
		await setCustomize( accountIconColor );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-account-wrap .ast-header-account-type-icon .ahfb-svg-iconset svg path:not( .ast-hf-account-unfill ), .ast-header-account-wrap .ast-header-account-type-icon .ahfb-svg-iconset svg circle' );
		await expect( {
			selector: '.ast-header-account-wrap .ast-header-account-type-icon .ahfb-svg-iconset svg path:not( .ast-hf-account-unfill ), .ast-header-account-wrap .ast-header-account-type-icon .ahfb-svg-iconset svg circle',
			property: 'fill',
		} ).cssValueToBe( `${ accountIconColor[ 'header-account-icon-color' ] }` );
	} );
} );
