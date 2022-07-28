import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Above footer width setting in customizer', () => {
	it( 'full width should apply correctly', async () => {
		const aboveFooterWidth = {
			'hba-footer-layout-width': 'full',
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( aboveFooterWidth );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-above-footer-wrap[data-section="section-above-footer-builder"] .ast-builder-grid-row' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"] .ast-builder-grid-row',
			property: 'max-width',
		} ).cssValueToBe( `100%` );
	} );

	it( 'content width should apply correctly', async () => {
		const aboveFooterWidth = {
			'hba-footer-layout-width': 'content',
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( aboveFooterWidth );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-above-footer-wrap[data-section="section-above-footer-builder"] .ast-builder-grid-row' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"] .ast-builder-grid-row',
			property: 'max-width',
		} ).cssValueToBe( `1200px` );
	} );
} );
