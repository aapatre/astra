import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Transparent header settings in the customizer', () => {
	it( 'account icon color setting should apply correctly', async () => {
		const accountIconColor = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 0,
			'transparent-account-icon-color': 'rgb(96, 6, 124)',
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
		await page.waitForSelector( '.ast-theme-transparent-header .ast-header-account-wrap .ast-header-account-type-icon .ahfb-svg-iconset svg path:not(.ast-hf-account-unfill), .ast-theme-transparent-header .ast-header-account-wrap .ast-header-account-type-icon .ahfb-svg-iconset svg circle' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-account-wrap .ast-header-account-type-icon .ahfb-svg-iconset svg path:not(.ast-hf-account-unfill), .ast-theme-transparent-header .ast-header-account-wrap .ast-header-account-type-icon .ahfb-svg-iconset svg circle',
			property: 'fill',
		} ).cssValueToBe( `${ accountIconColor[ 'transparent-account-icon-color' ] }` );
	} );

	it( 'account text color setting should apply correctly', async () => {
		const accountTextColor = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 0,
			'transparent-account-type-text-color': 'rgb(18, 87, 5)',
			'header-account-login-style': 'text',
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'account',
					},
				},
			},
		};
		await setCustomize( accountTextColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header .ast-header-account-wrap .ast-header-account-text' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-account-wrap .ast-header-account-text',
			property: 'color',
		} ).cssValueToBe( `${ accountTextColor[ 'transparent-account-type-text-color' ] }` );
	} );
} );
