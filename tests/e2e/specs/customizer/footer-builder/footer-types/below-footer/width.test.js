import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Below footer width setting in customizer', () => {
	it( 'full width should apply correctly', async () => {
		const belowFooterWidth = {
			'hbb-footer-layout-width': 'full',
		};
		await setCustomize( belowFooterWidth );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"] .ast-builder-grid-row' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"] .ast-builder-grid-row',
			property: 'max-width',
		} ).cssValueToBe( `100%` );
	} );

	it( 'content width should apply correctly', async () => {
		const belowFooterWidth = {
			'hbb-footer-layout-width': 'content',
		};
		await setCustomize( belowFooterWidth );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"] .ast-builder-grid-row' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"] .ast-builder-grid-row',
			property: 'max-width',
		} ).cssValueToBe( `1200px` );
	} );
} );
