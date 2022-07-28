import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Header builder settings in the customizer', () => {
	it( 'full width settings should be applied correctly', async () => {
		const headerWidth = {
			'hb-header-main-layout-width': 'full',
		};
		await setCustomize( headerWidth );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#masthead .ast-container' );
		await expect( {
			selector: '#masthead .ast-container',
			property: 'max-width',
		} ).cssValueToBe( `100%` );
	} );

	it( 'content width settings should be applied correctly', async () => {
		const headerWidth = {
			'hb-header-main-layout-width': 'content',
		};
		await setCustomize( headerWidth );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-container' );
		await expect( {
			selector: '.ast-container',
			property: 'max-width',
		} ).cssValueToBe( `1240px` );
	} );
} );
