import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Below header background gradient setting in customizer', () => {
	it( 'background gradient should apply correctly', async () => {
		const belowHeaderBgGradient = {
			'header-desktop-items': {
				below: {
					below_left: {
						0: 'widget-1',
					},
				},
			},
			'header-mobile-items': {
				below: {
					below_left: {
						0: 'social-icons-1',
					},
				},
			},
			'hbb-header-bg-obj-responsive': {
				desktop: {
					'background-color': 'linear-gradient(135deg, rgb(236, 208, 206) 30%, rgb(239, 17, 65) 100%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				tablet: {
					'background-color': 'linear-gradient(135deg, rgb(242, 237, 237) 30%, rgb(14, 13, 13) 100%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				mobile: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 31%, rgb(155, 81, 224) 64%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
			},
		};
		await setCustomize( belowHeaderBgGradient );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-below-header-bar' );
		await expect( {
			selector: '.ast-below-header-bar',
			property: 'background-image',
		} ).cssValueToBe(
			`${ belowHeaderBgGradient[ 'hbb-header-bg-obj-responsive' ].desktop[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-below-header-bar' );
		await expect( {
			selector: '.ast-below-header-bar',
			property: 'background-image',
		} ).cssValueToBe(
			`${ belowHeaderBgGradient[ 'hbb-header-bg-obj-responsive' ].tablet[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '.ast-below-header-bar' );
		await expect( {
			selector: '.ast-below-header-bar',
			property: 'background-image',
		} ).cssValueToBe(
			`${ belowHeaderBgGradient[ 'hbb-header-bg-obj-responsive' ].mobile[ 'background-color' ] }`,
		);
	} );
} );
