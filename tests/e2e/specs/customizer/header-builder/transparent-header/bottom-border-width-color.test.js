import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Transparent header settings in the customizer', () => {
	it( 'bottom border size and color setting should apply correctly', async () => {
		const transparentHeaderBorder = {
			'transparent-header-enable': 1,
			'transparent-header-main-sep': '45',
			'transparent-header-disable-latest-posts-index': 0,
			'transparent-header-main-sep-color': 'rgb(230, 206, 206)',
		};
		await setCustomize( transparentHeaderBorder );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header #ast-desktop-header > [CLASS*="-header-wrap"]:nth-last-child(2) > [CLASS*="-header-bar"]' );
		await expect( {
			selector: '.ast-theme-transparent-header #ast-desktop-header > [CLASS*="-header-wrap"]:nth-last-child(2) > [CLASS*="-header-bar"]',
			property: 'border-bottom-width',
		} ).cssValueToBe( `${ transparentHeaderBorder[ 'transparent-header-main-sep' ] + 'px' }` );

		await expect( {
			selector: '.ast-theme-transparent-header #ast-desktop-header > [CLASS*="-header-wrap"]:nth-last-child(2) > [CLASS*="-header-bar"]',
			property: 'border-bottom-color',
		} ).cssValueToBe( `${ transparentHeaderBorder[ 'transparent-header-main-sep-color' ] }` );
	} );
} );
