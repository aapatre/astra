import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { responsiveFontSize } from '../../../../../utils/responsive-utils';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Social icons show label in the customizer', () => {
	it( 'icon label font size should apply correctly', async () => {
		const labelFontSize = {
			'footer-social-1-label-toggle': '1',
			'font-size-section-fb-social-icons-1': {
				desktop: 40,
				tablet: 20,
				mobile: 15,
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'footer-desktop-items': {
				primary: {
					primary_2: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( labelFontSize );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.ast-footer-social-1-wrap' );
		await expect( {
			selector: '.ast-footer-social-1-wrap',
			property: 'font-size',
		} ).cssValueToBe( `${ labelFontSize[ 'font-size-section-fb-social-icons-1' ].desktop }${ labelFontSize[ 'font-size-section-fb-social-icons-1' ][ 'desktop-unit' ] }` );
		await page.waitForSelector( '.ast-footer-social-1-wrap' );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.ast-footer-social-1-wrap',
			property: 'font-size',
		} ).cssValueToBe( `${ await responsiveFontSize( labelFontSize[ 'font-size-section-fb-social-icons-1' ].tablet ) }${ labelFontSize[ 'font-size-section-fb-social-icons-1' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.ast-footer-social-1-wrap',
			property: 'font-size',
		} ).cssValueToBe( `${ await responsiveFontSize( labelFontSize[ 'font-size-section-fb-social-icons-1' ].mobile ) }${ labelFontSize[ 'font-size-section-fb-social-icons-1' ][ 'mobile-unit' ] }` );
	} );
} );
