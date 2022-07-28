import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'social icons in the customizer', () => {
	it( 'icon radius should apply correctly', async () => {
		const socialIconRadius = {
			'footer-social-1-radius': '41',
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( socialIconRadius );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-footer-social-1-wrap .ast-builder-social-element' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element',
			property: 'border-radius',
		} ).cssValueToBe( `${ socialIconRadius[ 'footer-social-1-radius' ] + 'px' }` );
	} );
} );
