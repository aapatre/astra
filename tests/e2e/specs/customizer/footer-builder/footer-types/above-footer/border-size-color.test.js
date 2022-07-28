import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Above footer border size and color setting in customizer', () => {
	it( 'top border size and color should apply correctly', async () => {
		const borderSizeColor = {
			'hba-footer-separator': '55',
			'hba-footer-top-border-color': 'rgb(203, 237, 170)',
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( borderSizeColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-above-footer-wrap[data-section="section-above-footer-builder"]' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'border-top-width',
		} ).cssValueToBe( `${ borderSizeColor[ 'hba-footer-separator' ] + 'px' }` );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"]',
			property: 'border-top-color',
		} ).cssValueToBe( `${ borderSizeColor[ 'hba-footer-top-border-color' ] }` );
	} );
} );
