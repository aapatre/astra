import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Primary footer hide on devices setting in customizer', () => {
	it( 'should be hide on desktop', async () => {
		const hideOnDesktop = {
			'section-primary-footer-builder-hide-desktop': 1,
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( hideOnDesktop );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'display',
		} ).cssValueToBe( `none` );
	} );

	it( 'should be hide on tablet', async () => {
		const hideOnTablet = {
			'section-primary-footer-builder-hide-tablet': 1,
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( hideOnTablet );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-header-break-point .site-primary-footer-wrap[data-section="section-primary-footer-builder"]' );
		await expect( {
			selector: '.ast-header-break-point .site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'display',
		} ).cssValueToBe( `none` );
	} );

	it( 'should be hide on mobile', async () => {
		const hideOnMobile = {
			'section-primary-footer-builder-hide-mobile': 1,
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( hideOnMobile );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-header-break-point .site-primary-footer-wrap[data-section="section-primary-footer-builder"]' );
		await expect( {
			selector: '.ast-header-break-point .site-primary-footer-wrap[data-section="section-primary-footer-builder"]',
			property: 'display',
		} ).cssValueToBe( `none` );
	} );
} );
