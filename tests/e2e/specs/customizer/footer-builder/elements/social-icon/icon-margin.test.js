import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
describe( 'social icons in the customizer', () => {
	it( 'icon margin for desktop should apply correctly', async () => {
		const socialIconMargin = {
			'section-fb-social-icons-1-margin': {
				desktop: {
					top: '60',
					right: '60',
					bottom: '60',
					left: '60',
				},
				tablet: {
					top: '40',
					right: '40',
					bottom: '40',
					left: '40',
				},
				mobile: {
					top: '20',
					right: '20',
					bottom: '20',
					left: '20',
				},
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
		await setCustomize( socialIconMargin );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-footer-social-1-wrap' );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.ast-footer-social-1-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-fb-social-icons-1-margin' ].desktop.top }${ socialIconMargin[ 'section-fb-social-icons-1-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-footer-social-1-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-fb-social-icons-1-margin' ].desktop.right }${ socialIconMargin[ 'section-fb-social-icons-1-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-footer-social-1-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-fb-social-icons-1-margin' ].desktop.bottom }${ socialIconMargin[ 'section-fb-social-icons-1-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-footer-social-1-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-fb-social-icons-1-margin' ].desktop.left }${ socialIconMargin[ 'section-fb-social-icons-1-margin' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.ast-footer-social-1-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-fb-social-icons-1-margin' ].tablet.top }${ socialIconMargin[ 'section-fb-social-icons-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-footer-social-1-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-fb-social-icons-1-margin' ].tablet.right }${ socialIconMargin[ 'section-fb-social-icons-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-footer-social-1-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-fb-social-icons-1-margin' ].tablet.bottom }${ socialIconMargin[ 'section-fb-social-icons-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-footer-social-1-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-fb-social-icons-1-margin' ].tablet.left }${ socialIconMargin[ 'section-fb-social-icons-1-margin' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.ast-footer-social-1-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-fb-social-icons-1-margin' ].mobile.top }${ socialIconMargin[ 'section-fb-social-icons-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-footer-social-1-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-fb-social-icons-1-margin' ].mobile.right }${ socialIconMargin[ 'section-fb-social-icons-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-footer-social-1-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-fb-social-icons-1-margin' ].mobile.bottom }${ socialIconMargin[ 'section-fb-social-icons-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-footer-social-1-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-fb-social-icons-1-margin' ].mobile.left }${ socialIconMargin[ 'section-fb-social-icons-1-margin' ][ 'mobile-unit' ] }` );
	} );
} );
