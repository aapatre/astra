import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Below footer inner column spacing setting in customizer', () => {
	it( 'spacing should apply correctly', async () => {
		const innerColumnSpacing = {
			'hbb-footer-column': 2,
			'hbb-inner-spacing':
			{
				desktop: '74',
				tablet: '32',
				mobile: '80',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'footer-desktop-items': {
				below: {
					below_1: {
						0: 'copyright',
					},
					below_2: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( innerColumnSpacing );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"] .ast-builder-grid-row' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"] .ast-builder-grid-row',
			property: 'grid-column-gap',
		} ).cssValueToBe( `${ innerColumnSpacing[ 'hbb-inner-spacing' ].desktop }${ innerColumnSpacing[ 'hbb-inner-spacing' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"] .ast-builder-grid-row',
			property: 'grid-column-gap',
		} ).cssValueToBe( `${ innerColumnSpacing[ 'hbb-inner-spacing' ].tablet }${ innerColumnSpacing[ 'hbb-inner-spacing' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"] .ast-builder-grid-row',
			property: 'grid-column-gap',
		} ).cssValueToBe( `${ innerColumnSpacing[ 'hbb-inner-spacing' ].mobile }${ innerColumnSpacing[ 'hbb-inner-spacing' ][ 'mobile-unit' ] }` );
	} );
} );
