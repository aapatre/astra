import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'Social icons hide on devices in the customizer', () => {
	it( 'social icon hide on desktop should apply correctly', async () => {
		const hideOnDesktop = {
			'section-fb-social-icons-1-hide-desktop': 1,
			'footer-desktop-items': {
				primary: {
					primary_2: {
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
		await page.waitForSelector( '.ast-builder-layout-element[data-section="section-fb-social-icons-1"]' );
		await expect( {
			selector: '.ast-builder-layout-element[data-section="section-fb-social-icons-1"]',
			property: 'display',
		} ).cssValueToBe( `none` );
	} );

	it( 'social icon hide on tablet should apply correctly', async () => {
		const hideOnTablet = {
			'section-fb-social-icons-1-hide-tablet': 1,
			'footer-desktop-items': {
				primary: {
					primary_2: {
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
		await page.waitForSelector( '.ast-header-break-point .ast-builder-layout-element[data-section="section-fb-social-icons-1"]' );
		await expect( {
			selector: '.ast-header-break-point .ast-builder-layout-element[data-section="section-fb-social-icons-1"]',
			property: 'display',
		} ).cssValueToBe( `none` );
	} );

	it( 'social icon hide on mobile should apply correctly', async () => {
		const hideOnMobile = {
			'section-fb-social-icons-1-hide-mobile': 1,
			'footer-desktop-items': {
				primary: {
					primary_2: {
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
		await page.waitForSelector( '.ast-header-break-point .ast-builder-layout-element[data-section="section-fb-social-icons-1"]' );
		await expect( {
			selector: '.ast-header-break-point .ast-builder-layout-element[data-section="section-fb-social-icons-1"]',
			property: 'display',
		} ).cssValueToBe( `none` );
	} );
} );
