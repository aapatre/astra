import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Footer builder background image setting in customizer', () => {
	it( 'background image should apply correctly', async () => {
		const footerBuilderBgImage = {
			'section-footer-builder-layout-padding': 60,
			'footer-bg-obj-responsive': {
				desktop: {
					'background-image': 'https://pd.w.org/2022/04/2626264f36443b827.24646863-220x300.jpg',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				tablet: {
					'background-image': 'https://pd.w.org/2022/04/2966264f298b6e007.81903590-300x200.jpg',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://pd.w.org/2022/04/276262a8d1470467.39785232-300x200.jpeg',

					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
			},
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'copyright',
					},
				},
			},
			'footer-mobile-items': {
				primary: {
					primary_1: {
						0: 'copyright',
					},
				},
			},
		};
		await setCustomize( footerBuilderBgImage );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-footer',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ footerBuilderBgImage[ 'footer-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-footer',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ footerBuilderBgImage[ 'footer-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-footer',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ footerBuilderBgImage[ 'footer-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }`,
		);
	} );
} );
