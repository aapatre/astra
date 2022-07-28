import { createURL, setBrowserViewport } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Social Icons in the customizer', () => {
	it( 'icon size for desktop should apply correctly', async () => {
		const socialIconSize = {
			'footer-social-1-size': {
				desktop: '50',
				tablet: '40',
				mobile: '40',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialIconSize );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-footer-social-1-wrap .ast-builder-social-element svg' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element svg',
			property: 'width',
		} ).cssValueToBe( `${ socialIconSize[ 'footer-social-1-size' ].desktop + 'px' }` );

		await expect( {
			selector: '.ast-footer-social-1-wrap .footer-social-inner-wrap .ast-builder-social-element svg',
			property: 'height',
		} ).cssValueToBe( `${ socialIconSize[ 'footer-social-1-size' ].desktop + 'px' }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element svg',
			property: 'width',
		} ).cssValueToBe( `${ socialIconSize[ 'footer-social-1-size' ].tablet + 'px' }` );

		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element svg',
			property: 'height',
		} ).cssValueToBe( `${ socialIconSize[ 'footer-social-1-size' ].tablet + 'px' }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element svg',
			property: 'width',
		} ).cssValueToBe( `${ socialIconSize[ 'footer-social-1-size' ].mobile + 'px' }` );

		await expect( {
			selector: '.ast-footer-social-1-wrap .ast-builder-social-element svg',
			property: 'height',
		} ).cssValueToBe( `${ socialIconSize[ 'footer-social-1-size' ].mobile + 'px' }` );
	} );
} );
