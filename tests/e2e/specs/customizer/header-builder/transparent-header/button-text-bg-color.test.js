import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Transparent header settings in the customizer', () => {
	it( 'button text color setting should apply correctly', async () => {
		const buttonTextColor = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 0,
			'transparent-header-button-text-color': 'rgb(255, 255, 255)',
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'button-1',
					},
				},
			},
		};
		await setCustomize( buttonTextColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header [CLASS*="ast-header-button-"] .ast-custom-button' );
		await expect( {
			selector: '.ast-theme-transparent-header [CLASS*="ast-header-button-"] .ast-custom-button',
			property: 'color',
		} ).cssValueToBe( `${ buttonTextColor[ 'transparent-header-button-text-color' ] }` );
	} );

	it( 'button background color setting should apply correctly', async () => {
		const buttonBackgroundColor = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 0,
			'transparent-header-button-bg-color': 'rgb(0, 0, 0)',
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'button-1',
					},
				},
			},
		};
		await setCustomize( buttonBackgroundColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header [CLASS*="ast-header-button-"] .ast-custom-button' );
		await expect( {
			selector: '.ast-theme-transparent-header [CLASS*="ast-header-button-"] .ast-custom-button',
			property: 'background-color',
		} ).cssValueToBe( `${ buttonBackgroundColor[ 'transparent-header-button-bg-color' ] }` );
	} );
} );
