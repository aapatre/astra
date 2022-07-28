import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Above footer margin setting in customizer', () => {
	it( 'margin should apply correctly', async () => {
		const aboveFooterMargin = {
			'section-above-footer-builder-margin': {
				desktop: {
					top: '80',
					right: '80',
					bottom: '80',
					left: '80',
				},
				tablet: {
					top: '60',
					right: '60',
					bottom: '60',
					left: '60',
				},
				mobile: {
					top: '40',
					right: '40',
					bottom: '40',
					left: '40',
				},
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( aboveFooterMargin );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-above-footer-wrap[data-section="section-above-footer-builder"]' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'margin-top',
		} ).cssValueToBe( `${ aboveFooterMargin[ 'section-above-footer-builder-margin' ].desktop.top }${ aboveFooterMargin[ 'section-above-footer-builder-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'margin-right',
		} ).cssValueToBe( `${ aboveFooterMargin[ 'section-above-footer-builder-margin' ].desktop.right }${ aboveFooterMargin[ 'section-above-footer-builder-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ aboveFooterMargin[ 'section-above-footer-builder-margin' ].desktop.bottom }${ aboveFooterMargin[ 'section-above-footer-builder-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'margin-left',
		} ).cssValueToBe( `${ aboveFooterMargin[ 'section-above-footer-builder-margin' ].desktop.left }${ aboveFooterMargin[ 'section-above-footer-builder-margin' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'margin-top',
		} ).cssValueToBe( `${ aboveFooterMargin[ 'section-above-footer-builder-margin' ].tablet.top }${ aboveFooterMargin[ 'section-above-footer-builder-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'margin-right',
		} ).cssValueToBe( `${ aboveFooterMargin[ 'section-above-footer-builder-margin' ].tablet.right }${ aboveFooterMargin[ 'section-above-footer-builder-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ aboveFooterMargin[ 'section-above-footer-builder-margin' ].tablet.bottom }${ aboveFooterMargin[ 'section-above-footer-builder-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'margin-left',
		} ).cssValueToBe( `${ aboveFooterMargin[ 'section-above-footer-builder-margin' ].tablet.left }${ aboveFooterMargin[ 'section-above-footer-builder-margin' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'margin-top',
		} ).cssValueToBe( `${ aboveFooterMargin[ 'section-above-footer-builder-margin' ].mobile.top }${ aboveFooterMargin[ 'section-above-footer-builder-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'margin-right',
		} ).cssValueToBe( `${ aboveFooterMargin[ 'section-above-footer-builder-margin' ].mobile.right }${ aboveFooterMargin[ 'section-above-footer-builder-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ aboveFooterMargin[ 'section-above-footer-builder-margin' ].mobile.bottom }${ aboveFooterMargin[ 'section-above-footer-builder-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'margin-left',
		} ).cssValueToBe( `${ aboveFooterMargin[ 'section-above-footer-builder-margin' ].mobile.left }${ aboveFooterMargin[ 'section-above-footer-builder-margin' ][ 'mobile-unit' ] }` );
	} );
} );
