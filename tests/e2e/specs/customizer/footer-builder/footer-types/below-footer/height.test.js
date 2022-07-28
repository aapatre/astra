import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Below footer setting in customizer', () => {
	it( 'height should apply correctly', async () => {
		const belowFooterHeight = {
			'hbb-footer-height': '200',
		};
		await setCustomize( belowFooterHeight );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'min-height',
		} ).cssValueToBe( `${ belowFooterHeight[ 'hbb-footer-height' ] + 'px' }` );
	} );
} );
