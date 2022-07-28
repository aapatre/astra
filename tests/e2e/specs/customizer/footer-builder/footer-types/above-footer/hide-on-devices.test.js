import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Above footer hide on devices setting in customizer', () => {
	it( 'should be hide on desktop mode', async () => {
		const hideOnDesktop = {
			'section-above-footer-builder-hide-desktop': 1,
			'footer-desktop-items': {
				above: {
					above_1: {
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
		await page.waitForSelector( '.site-above-footer-wrap[data-section="section-above-footer-builder"]' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'display',
		} ).cssValueToBe( `none` );
	} );

	it( 'should hide on tablet', async () => {
		const hideOnTablet = {
			'section-above-footer-builder-hide-tablet': 1,
			'footer-desktop-items': {
				above: {
					above_1: {
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
		await page.waitForSelector( '.ast-header-break-point .site-above-footer-wrap[data-section="section-above-footer-builder"]' );
		await expect( {
			selector: '.ast-header-break-point .site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'display',
		} ).cssValueToBe( `none` );
	} );

	it( 'should hide on mobile', async () => {
		const hideOnMobile = {
			'section-above-footer-builder-hide-mobile': 1,
			'footer-desktop-items': {
				above: {
					above_1: {
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
		await page.waitForSelector( '.ast-header-break-point .site-above-footer-wrap[data-section="section-above-footer-builder"]' );
		await expect( {
			selector: '.ast-header-break-point .site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'display',
		} ).cssValueToBe( `none` );
	} );
} );
