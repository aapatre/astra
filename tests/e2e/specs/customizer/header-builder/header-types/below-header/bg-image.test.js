import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Below header background image setting in customizer', () => {
	it( 'background image should apply correctly', async () => {
		const belowHeaderBgImage = {
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
					'background-image': 'https://pd.w.org/2022/03/9596222e354290608.12861121-300x225.jpg',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				tablet: {
					'background-image': 'https://pd.w.org/2022/03/767621e1bf3b36b53.20274594-300x300.jpeg',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://pd.w.org/2022/03/850621d87c7c75fb1.47714339-225x300.jpeg',

					'background-repeat': 'no-repeat',
					'background-position': 'right top',
					'background-size': 'cover',
					'background-attachment]': 'fixed',
					'background-type': 'image',
				},
			},
		};
		await setCustomize( belowHeaderBgImage );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-below-header.ast-below-header-bar' );
		await expect( {
			selector: '.ast-below-header.ast-below-header-bar',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ belowHeaderBgImage[ 'hbb-header-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'medium' );
		await page.waitFor( 2000 );
		await page.waitForSelector( '.ast-below-header.ast-below-header-bar' );
		await expect( {
			selector: '.ast-below-header.ast-below-header-bar',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ belowHeaderBgImage[ 'hbb-header-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }`,
		);
		await page.waitFor( 2000 );
		await setBrowserViewport( 'small' );
		await page.waitForSelector( '.ast-below-header.ast-below-header-bar' );
		await page.waitFor( 2000 );
		await expect( {
			selector: '.ast-below-header.ast-below-header-bar',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ belowHeaderBgImage[ 'hbb-header-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }`,
		);
	} );
} );
