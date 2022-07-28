import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Below footer vertical alignment setting in customizer', () => {
	it( 'verical alignment top should apply correctly', async () => {
		const verticalAlignment = {
			'footer-copyright-editor': 'Copyright [copyright] [current_year] [site_title] | Powered by [theme_author] Copyright [copyright] [current_year] [site_title] | Powered by [theme_author]',
			'hbb-footer-column': 3,
			'hbb-footer-vertical-alignment': 'flex-end',
			'footer-desktop-items': {
				below: {
					below_1: {
						0: 'copyright',
					},
					below_2: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( verticalAlignment );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-below-footer-wrap[data-section="section-below-footer-builder"] .ast-builder-grid-row' );
		await expect( {
			selector: '.site-below-footer-wrap[data-section="section-below-footer-builder"] .ast-builder-grid-row',
			property: 'align-items',
		} ).cssValueToBe( `${ verticalAlignment[ 'hbb-footer-vertical-alignment' ] }` );
	} );
} );
