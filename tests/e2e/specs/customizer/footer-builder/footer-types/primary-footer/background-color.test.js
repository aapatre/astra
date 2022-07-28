import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Primary footer background color settings in the customizer', () => {
	it( 'background color should apply correctly', async () => {
		const backgroundColor = {
			'hb-footer-bg-obj-responsive': {
				desktop: {
					'background-color': 'rgb(224, 218, 185)',
				},
				tablet: {
					'background-color': 'rgb(194, 237, 239)',
				},
				mobile: {
					'background-color': 'rgb(225, 197, 232)',
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
		await setCustomize( backgroundColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'background-color',
		} ).cssValueToBe( `${ backgroundColor[ 'hb-footer-bg-obj-responsive' ].desktop[ 'background-color' ] }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'background-color',
		} ).cssValueToBe( `${ backgroundColor[ 'hb-footer-bg-obj-responsive' ].tablet[ 'background-color' ] }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'background-color',
		} ).cssValueToBe( `${ backgroundColor[ 'hb-footer-bg-obj-responsive' ].mobile[ 'background-color' ] }` );
	} );
} );
