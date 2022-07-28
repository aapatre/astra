import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Above footer backgeround image setting in customizer', () => {
	it( 'background image for desktop should apply correctly', async () => {
		const aboveFooterBgImage = {
			'hba-footer-bg-obj-responsive': {
				desktop: {
					'background-image': 'https://pd.w.org/2022/03/3146230b053848c21.81950886-300x200.jpeg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				tablet: {
					'background-image': 'https://pd.w.org/2022/03/6462309002a5de46.79671062-300x200.jpg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://pd.w.org/2022/03/361622a6f3c4e5ad0.29454670-225x300.jpg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
			},
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( aboveFooterBgImage );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-above-footer-wrap[data-section="section-above-footer-builder"]' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'background-image',
		} ).cssValueToBe( `url("${ aboveFooterBgImage[ 'hba-footer-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }` );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'background-image',
		} ).cssValueToBe( `url("${ aboveFooterBgImage[ 'hba-footer-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }` );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'background-image',
		} ).cssValueToBe( `url("${ aboveFooterBgImage[ 'hba-footer-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }` );
	} );
} );
