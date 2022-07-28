import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'primary header backgeround image setting in customizer', () => {
	it( 'background image for desktop should apply correctly', async () => {
		const primaryHeaderBgImage = {
			'hb-header-bg-obj-responsive': {
				desktop: {
					'background-image': 'https://pd.w.org/2022/03/4376228e3cf277f20.99704501-300x225.jpeg',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				tablet: {
					'background-image': 'https://pd.w.org/2022/03/4136228f92e073825.69069021-rotated.jpg',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://pd.w.org/2022/03/7856227840a9d3925.38199890-300x225.jpg',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
			},
		};
		await setCustomize( primaryHeaderBgImage );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-primary-header-bar' );
		await expect( {
			selector: '.ast-primary-header-bar',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ primaryHeaderBgImage[ 'hb-header-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-primary-header-bar',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ primaryHeaderBgImage[ 'hb-header-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-primary-header-bar',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ primaryHeaderBgImage[ 'hb-header-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }`,
		);
	} );
} );
