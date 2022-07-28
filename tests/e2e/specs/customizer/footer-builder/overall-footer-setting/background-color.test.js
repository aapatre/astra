import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../utils/scroll-to-element';
describe( 'Footer builder backgeround color setting in customizer', () => {
	it( 'background color for desktop should apply correctly', async () => {
		const footerBuilder = {
			'section-footer-builder-layout-padding': 60,
			'footer-bg-obj-responsive': {
				desktop: {
					'background-color': 'rgb(210, 248, 249)',
				},
				tablet: {
					'background-color': 'rgb(208, 222, 146)',
				},
				mobile: {
					'background-color': 'rgb(227, 176, 132)',
				},
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'copyright',
					},
				},
			},
			'footer-mobile-items': {
				primary: {
					primary_2: {
						0: 'copyright',
					},
				},
			},
		};
		await setCustomize( footerBuilder );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-footer',
			property: 'background-color',
		} ).cssValueToBe( `${ footerBuilder[ 'footer-bg-obj-responsive' ].desktop[ 'background-color' ] }` );

		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-footer',
			property: 'background-color',
		} ).cssValueToBe( `${ footerBuilder[ 'footer-bg-obj-responsive' ].tablet[ 'background-color' ] }` );

		await page.waitForSelector( '.site-footer' );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-footer',
			property: 'background-color',
		} ).cssValueToBe( `${ footerBuilder[ 'footer-bg-obj-responsive' ].mobile[ 'background-color' ] }` );
	} );
} );
