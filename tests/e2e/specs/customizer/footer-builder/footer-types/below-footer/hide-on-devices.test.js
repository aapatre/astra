import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Below footer hide on devices setting in customizer', () => {
	it( 'below footer should hide on desktop', async () => {
		const hideOnDesktop = {
			'section-below-footer-builder-hide-desktop': 1,
		};
		await setCustomize( hideOnDesktop );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'display',
		} ).cssValueToBe( `none` );
	} );

	it( 'below footer should hide on tablet', async () => {
		const hideOnTablet = {
			'section-below-footer-builder-hide-tablet': 1,
		};
		await setCustomize( hideOnTablet );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-header-break-point .site-below-footer-wrap[data-section="section-below-footer-builder"]' );
		await expect( {
			selector: '.ast-header-break-point .site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'display',
		} ).cssValueToBe( `none` );
	} );

	it( 'below footer should hide on mobile', async () => {
		const hideOnMobile = {
			'section-below-footer-builder-hide-mobile': 1,
		};
		await setCustomize( hideOnMobile );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-header-break-point .site-below-footer-wrap[data-section="section-below-footer-builder"]' );
		await expect( {
			selector: '.ast-header-break-point .site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'display',
		} ).cssValueToBe( `none` );
	} );
} );
