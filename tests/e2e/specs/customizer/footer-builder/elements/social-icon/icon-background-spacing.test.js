import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Social Icons in the customizer', () => {
	it( 'icon background spacing should apply correctly', async () => {
		const socialIconBackSpacing = {
			'footer-social-1-bg-space': '31px',
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( socialIconBackSpacing );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-footer-social-1-wrap .ast-builder-social-element' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element',
			property: 'padding',
		} ).cssValueToBe( `${ socialIconBackSpacing[ 'footer-social-1-bg-space' ] }`,
		);
	} );
} );
