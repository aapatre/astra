import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
describe( 'Social Icons in the customizer', () => {
	it( 'social icon radius should apply correctly', async () => {
		const socialiconRadius = {
			'header-social-1-radius': '50px',
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialiconRadius );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element' );

		await expect( {
			selector: '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element',
			property: 'border-radius',
		} ).cssValueToBe( `${ socialiconRadius[ 'header-social-1-radius' ] }`,
		);
	} );
} );
