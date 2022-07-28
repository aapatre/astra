import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Primary footer padding setting in customizer', () => {
	it( 'padding should apply correctly', async () => {
		const primaryFooterPadding = {
			'section-primary-footer-builder-padding': {
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
				primary: {
					primary_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( primaryFooterPadding );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'padding-top',
		} ).cssValueToBe( `${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ].desktop.top }${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'padding-right',
		} ).cssValueToBe( `${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ].desktop.right }${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ].desktop.bottom }${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'padding-left',
		} ).cssValueToBe( `${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ].desktop.left }${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'padding-top',
		} ).cssValueToBe( `${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ].tablet.top }${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'padding-right',
		} ).cssValueToBe( `${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ].tablet.right }${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ].tablet.bottom }${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'padding-left',
		} ).cssValueToBe( `${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ].tablet.left }${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'padding-top',
		} ).cssValueToBe( `${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ].mobile.top }${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'padding-right',
		} ).cssValueToBe( `${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ].mobile.right }${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ].mobile.bottom }${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'padding-left',
		} ).cssValueToBe( `${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ].mobile.left }${ primaryFooterPadding[ 'section-primary-footer-builder-padding' ][ 'mobile-unit' ] }` );
	} );
} );
