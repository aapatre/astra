import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Above footer background color settings in the customizer', () => {
	it( 'background color should apply correctly', async () => {
		const backgroundColor = {
			'hba-footer-bg-obj-responsive': {
				desktop: {
					'background-color': 'rgb(242, 189, 189)',
				},
				tablet: {
					'background-color': 'rgb(207, 232, 157)',
				},
				mobile: {
					'background-color': 'rgb(206, 204, 240)',
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
		await setCustomize( backgroundColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-above-footer-wrap[data-section="section-above-footer-builder"]' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'background-color',
		} ).cssValueToBe( `${ backgroundColor[ 'hba-footer-bg-obj-responsive' ].desktop[ 'background-color' ] }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'background-color',
		} ).cssValueToBe( `${ backgroundColor[ 'hba-footer-bg-obj-responsive' ].tablet[ 'background-color' ] }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'background-color',
		} ).cssValueToBe( `${ backgroundColor[ 'hba-footer-bg-obj-responsive' ].mobile[ 'background-color' ] }` );
	} );
} );
