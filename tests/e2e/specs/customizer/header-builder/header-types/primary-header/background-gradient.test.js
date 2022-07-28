import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'primary header background gradient setting in customizer', () => {
	it( 'background gradient should apply correctly', async () => {
		const primaryHeader = {
			'hb-header-bg-obj-responsive': {
				desktop: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 0%, rgb(194, 194, 194) 48%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				tablet: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 0%, rgb(215, 224, 81) 85%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				mobile: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 0%, rgb(138, 235, 201) 55%, rgb(155, 81, 224) 100%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
			},
		};
		await setCustomize( primaryHeader );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		await expect( {
			selector: '.ast-primary-header-bar',
			property: 'background-image',
		} ).cssValueToBe( `${ primaryHeader[ 'hb-header-bg-obj-responsive' ].desktop[ 'background-color' ] }` );

		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-primary-header-bar.ast-primary-header' );
		await expect( {
			selector: '.ast-primary-header-bar.ast-primary-header',
			property: 'background-image',
		} ).cssValueToBe( `${ primaryHeader[ 'hb-header-bg-obj-responsive' ].tablet[ 'background-color' ] }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-primary-header-bar.ast-primary-header',
			property: 'background-image',
		} ).cssValueToBe( `${ primaryHeader[ 'hb-header-bg-obj-responsive' ].mobile[ 'background-color' ] }` );
	} );
} );
