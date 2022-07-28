import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Below footer border size setting in customizer', () => {
	it( 'top border size and color should apply correctly', async () => {
		const borderSizeColor = {
			'hbb-footer-separator': '60',
			'hbb-footer-top-border-color': 'rgba(227, 16, 195, 0.57)',
		};
		await setCustomize( borderSizeColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"]' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'border-top-width',
		} ).cssValueToBe( `${ borderSizeColor[ 'hbb-footer-separator' ] + 'px' }` );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"]',
			property: 'border-top-color',
		} ).cssValueToBe( `${ borderSizeColor[ 'hbb-footer-top-border-color' ] }` );
	} );
} );
