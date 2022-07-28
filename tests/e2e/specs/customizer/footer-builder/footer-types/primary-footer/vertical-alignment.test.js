import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Primary footer vertical alignment setting in customizer', () => {
	it( 'verical alignment top should apply correctly', async () => {
		const verticalAlignment = {
			'footer-copyright-editor': 'Copyright [copyright] [current_year] [site_title] | Powered by [theme_author] Copyright [copyright] [current_year] [site_title] | Powered by [theme_author]',
			'hb-footer-column': 3,
			'hb-footer-vertical-alignment': 'flex-end',
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'social-icons-1',
					},
					primary_2: {
						0: 'copyright',
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
		await page.waitForSelector( '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row' );
		await expect( {
			selector: '.site-primary-footer-wrap[data-section="section-primary-footer-builder"] .ast-builder-grid-row',
			property: 'align-items',
		} ).cssValueToBe( `${ verticalAlignment[ 'hb-footer-vertical-alignment' ] }` );
	} );
} );
