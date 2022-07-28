import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Primary footer inner column spacing setting in customizer', () => {
	it( 'spacing should apply correctly', async () => {
		const innerColumnSpacing = {
			'hb-footer-column': 2,
			'hb-inner-spacing':
			{
				desktop: '74',
				tablet: '54',
				mobile: '24',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'social-icons-1',
					},
					primary_2: {
						0: 'copyright',
					},
				},
			},
		};
		await setCustomize( innerColumnSpacing );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row',
			property: 'grid-column-gap',
		} ).cssValueToBe( `${ innerColumnSpacing[ 'hb-inner-spacing' ].desktop }${ innerColumnSpacing[ 'hb-inner-spacing' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row',
			property: 'grid-column-gap',
		} ).cssValueToBe( `${ innerColumnSpacing[ 'hb-inner-spacing' ].tablet }${ innerColumnSpacing[ 'hb-inner-spacing' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row',
			property: 'grid-column-gap',
		} ).cssValueToBe( `${ innerColumnSpacing[ 'hb-inner-spacing' ].mobile }${ innerColumnSpacing[ 'hb-inner-spacing' ][ 'mobile-unit' ] }` );
	} );
} );
