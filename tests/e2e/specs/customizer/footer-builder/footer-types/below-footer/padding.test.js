import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Below footer padding setting in customizer', () => {
	it( 'padding should apply correctly', async () => {
		const belowFooterPadding = {
			'section-below-footer-builder-padding': {
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
		};
		await setCustomize( belowFooterPadding );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'padding-top',
		} ).cssValueToBe( `${ belowFooterPadding[ 'section-below-footer-builder-padding' ].desktop.top }${ belowFooterPadding[ 'section-below-footer-builder-padding' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'padding-right',
		} ).cssValueToBe( `${ belowFooterPadding[ 'section-below-footer-builder-padding' ].desktop.right }${ belowFooterPadding[ 'section-below-footer-builder-padding' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ belowFooterPadding[ 'section-below-footer-builder-padding' ].desktop.bottom }${ belowFooterPadding[ 'section-below-footer-builder-padding' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'padding-left',
		} ).cssValueToBe( `${ belowFooterPadding[ 'section-below-footer-builder-padding' ].desktop.left }${ belowFooterPadding[ 'section-below-footer-builder-padding' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'padding-top',
		} ).cssValueToBe( `${ belowFooterPadding[ 'section-below-footer-builder-padding' ].tablet.top }${ belowFooterPadding[ 'section-below-footer-builder-padding' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'padding-right',
		} ).cssValueToBe( `${ belowFooterPadding[ 'section-below-footer-builder-padding' ].tablet.right }${ belowFooterPadding[ 'section-below-footer-builder-padding' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ belowFooterPadding[ 'section-below-footer-builder-padding' ].tablet.bottom }${ belowFooterPadding[ 'section-below-footer-builder-padding' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'padding-left',
		} ).cssValueToBe( `${ belowFooterPadding[ 'section-below-footer-builder-padding' ].tablet.left }${ belowFooterPadding[ 'section-below-footer-builder-padding' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'padding-top',
		} ).cssValueToBe( `${ belowFooterPadding[ 'section-below-footer-builder-padding' ].mobile.top }${ belowFooterPadding[ 'section-below-footer-builder-padding' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'padding-right',
		} ).cssValueToBe( `${ belowFooterPadding[ 'section-below-footer-builder-padding' ].mobile.right }${ belowFooterPadding[ 'section-below-footer-builder-padding' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ belowFooterPadding[ 'section-below-footer-builder-padding' ].mobile.bottom }${ belowFooterPadding[ 'section-below-footer-builder-padding' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'padding-left',
		} ).cssValueToBe( `${ belowFooterPadding[ 'section-below-footer-builder-padding' ].mobile.left }${ belowFooterPadding[ 'section-below-footer-builder-padding' ][ 'mobile-unit' ] }` );
	} );
} );
