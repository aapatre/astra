import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Transparent header settings in the customizer', () => {
	it( 'html text color setting should apply correctly', async () => {
		const htmlTextColor = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 0,
			'transparent-header-html-text-color': 'rgb(11, 91, 41)',
			'header-html-1': 'Testing transparent header HTML text color',
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'html-1',
					},
				},
			},
		};
		await setCustomize( htmlTextColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header [CLASS*="ast-header-html-"] .ast-builder-html-element' );
		await expect( {
			selector: '.ast-theme-transparent-header [CLASS*="ast-header-html-"] .ast-builder-html-element',
			property: 'color',
		} ).cssValueToBe( `${ htmlTextColor[ 'transparent-header-html-text-color' ] }` );
	} );

	it( 'html link color setting should apply correctly', async () => {
		const htmlLinkColor = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 0,
			'transparent-header-html-link-color': 'rgb(94, 1, 165)',
			'header-html-1': '<a href="https://wpastra.com/docs/">Testing transparent header HTML link color</a>',
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'html-1',
					},
				},
			},
		};
		await setCustomize( htmlLinkColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header [CLASS*="ast-header-html-"] .ast-builder-html-element a' );
		await expect( {
			selector: '.ast-theme-transparent-header [CLASS*="ast-header-html-"] .ast-builder-html-element a',
			property: 'color',
		} ).cssValueToBe( `${ htmlLinkColor[ 'transparent-header-html-link-color' ] }` );
	} );
} );
