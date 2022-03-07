import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Primary footer backgeround image setting in customizer', () => {
	it( 'background image for desktop should apply correctly', async () => {
		const primaryFooter = {
			'hb-footer-bg-obj-responsive': {
				desktop: {
					'background-image': 'https://pxhere.com/en/photo/613364',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				tablet: {
					'background-image': 'https://pxhere.com/en/photo/707755',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://pxhere.com/en/photo/5204',
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
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( primaryFooter );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'background-image',
		} ).cssValueToBe( `url("${ primaryFooter[ 'hb-footer-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }` );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'background-image',
		} ).cssValueToBe( `url("${ primaryFooter[ 'hb-footer-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }` );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'background-image',
		} ).cssValueToBe( `url("${ primaryFooter[ 'hb-footer-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }` );
	} );
} );
