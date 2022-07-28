import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Primary footer width setting in customizer', () => {
	it( 'full width should apply correctly', async () => {
		const primaryFooterWidth = {
			'hb-footer-layout-width': 'full',
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( primaryFooterWidth );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row',
			property: 'max-width',
		} ).cssValueToBe( `100%` );
	} );

	it( 'content width should apply correctly', async () => {
		const primaryFooterWidth = {
			'hb-footer-layout-width': 'content',
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( primaryFooterWidth );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row',
			property: 'max-width',
		} ).cssValueToBe( `1200px` );
	} );
} );
