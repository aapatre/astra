import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Above footer padding setting in customizer', () => {
	it( 'padding should apply correctly', async () => {
		const aboveFooterPadding = {
			'section-above-footer-builder-padding': {
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
		await setCustomize( aboveFooterPadding );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-above-footer-wrap[data-section="section-above-footer-builder"]' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-top',
		} ).cssValueToBe( `${ aboveFooterPadding[ 'section-above-footer-builder-padding' ].desktop.top }${ aboveFooterPadding[ 'section-above-footer-builder-padding' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-right',
		} ).cssValueToBe( `${ aboveFooterPadding[ 'section-above-footer-builder-padding' ].desktop.right }${ aboveFooterPadding[ 'section-above-footer-builder-padding' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ aboveFooterPadding[ 'section-above-footer-builder-padding' ].desktop.bottom }${ aboveFooterPadding[ 'section-above-footer-builder-padding' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-left',
		} ).cssValueToBe( `${ aboveFooterPadding[ 'section-above-footer-builder-padding' ].desktop.left }${ aboveFooterPadding[ 'section-above-footer-builder-padding' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-top',
		} ).cssValueToBe( `${ aboveFooterPadding[ 'section-above-footer-builder-padding' ].tablet.top }${ aboveFooterPadding[ 'section-above-footer-builder-padding' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-right',
		} ).cssValueToBe( `${ aboveFooterPadding[ 'section-above-footer-builder-padding' ].tablet.right }${ aboveFooterPadding[ 'section-above-footer-builder-padding' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ aboveFooterPadding[ 'section-above-footer-builder-padding' ].tablet.bottom }${ aboveFooterPadding[ 'section-above-footer-builder-padding' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-left',
		} ).cssValueToBe( `${ aboveFooterPadding[ 'section-above-footer-builder-padding' ].tablet.left }${ aboveFooterPadding[ 'section-above-footer-builder-padding' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-top',
		} ).cssValueToBe( `${ aboveFooterPadding[ 'section-above-footer-builder-padding' ].mobile.top }${ aboveFooterPadding[ 'section-above-footer-builder-padding' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-right',
		} ).cssValueToBe( `${ aboveFooterPadding[ 'section-above-footer-builder-padding' ].mobile.right }${ aboveFooterPadding[ 'section-above-footer-builder-padding' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ aboveFooterPadding[ 'section-above-footer-builder-padding' ].mobile.bottom }${ aboveFooterPadding[ 'section-above-footer-builder-padding' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'padding-left',
		} ).cssValueToBe( `${ aboveFooterPadding[ 'section-above-footer-builder-padding' ].mobile.left }${ aboveFooterPadding[ 'section-above-footer-builder-padding' ][ 'mobile-unit' ] }` );
	} );
} );
