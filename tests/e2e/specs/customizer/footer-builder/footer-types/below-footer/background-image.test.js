import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Below footer backgeround image setting in customizer', () => {
	it( 'background image for desktop should apply correctly', async () => {
		const belowFooter = {
			'hbb-footer-bg-obj-responsive': {
				desktop: {
					'background-image': 'https://pd.w.org/2022/03/4276227843c5411a8.42886635-300x225.jpg',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				tablet: {
					'background-image': 'https://pd.w.org/2022/03/542622502f45e1481.07648228-225x300.jpg',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://pd.w.org/2022/03/97762248cf4dbc1f4.70553961-300x225.jpg',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
			},
		};
		await setCustomize( belowFooter );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ belowFooter[ 'hbb-footer-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ belowFooter[ 'hbb-footer-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ belowFooter[ 'hbb-footer-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }`,
		);
	} );
} );
