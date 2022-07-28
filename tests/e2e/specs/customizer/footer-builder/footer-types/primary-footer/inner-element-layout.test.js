import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Primary footer inner element layout setting in customizer', () => {
	it( 'inline layout should apply correctly', async () => {
		const innerElementLayout = {
			'hb-stack': {
				desktop: 'inline',
				tablet: 'inline',
				mobile: 'inline',
			},
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'html-2',
						1: 'social-icons-1',
						2: 'html-1',
					},
				},
			},
		};
		await setCustomize( innerElementLayout );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"].ast-footer-row-inline .site-footer-section' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"].ast-footer-row-inline .site-footer-section',
			property: 'display',
		} ).cssValueToBe( `flex` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"].ast-footer-row-tablet-inline .site-footer-section' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"].ast-footer-row-tablet-inline .site-footer-section',
			property: 'display',
		} ).cssValueToBe( `flex` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"].ast-footer-row-mobile-inline .site-footer-section' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"].ast-footer-row-mobile-inline .site-footer-section',
			property: 'display',
		} ).cssValueToBe( `flex` );
	} );

	it( 'stack layout should apply correctly', async () => {
		const innerElementLayout = {
			'hb-stack': {
				desktop: 'stack',
				tablet: 'stack',
				mobile: 'stack',
			},
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'html-2',
						1: 'social-icons-1',
						2: 'html-1',
					},
				},
			},
		};
		await setCustomize( innerElementLayout );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"].ast-footer-row-stack .site-footer-section' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"].ast-footer-row-stack .site-footer-section',
			property: 'display',
		} ).cssValueToBe( `block` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"].ast-footer-row-tablet-stack .site-footer-section' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"].ast-footer-row-tablet-stack .site-footer-section',
			property: 'display',
		} ).cssValueToBe( `block` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"].ast-footer-row-mobile-stack .site-footer-section' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"].ast-footer-row-mobile-stack .site-footer-section',
			property: 'display',
		} ).cssValueToBe( `block` );
	} );
} );
