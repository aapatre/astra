import { createURL } from '@wordpress/e2e-test-utils';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { setCustomize } from '../../../../../utils/customize';
describe( 'Social icons in the customizer', () => {
	it( 'social icon margin for desktop should apply correctly', async () => {
		const socialIconMargin = {
			'section-hb-social-icons-1-margin': {
				desktop: {
					top: '80',
					right: '80',
					bottom: '80',
					left: '80',
				},
				tablet: {
					top: '60',
					right: '60',
					bottom: '60',
					left: '60',
				},
				mobile: {
					top: '40',
					right: '40',
					bottom: '40',
					left: '40',
				},
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',
					},
				},
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( socialIconMargin );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-social-1-wrap' );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].desktop.top }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].desktop.right }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].desktop.bottom }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].desktop.left }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].tablet.top }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].tablet.right }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].tablet.bottom }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].tablet.left }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].mobile.top }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].mobile.right }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].mobile.bottom }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-social-1-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ socialIconMargin[ 'section-hb-social-icons-1-margin' ].mobile.left }${ socialIconMargin[ 'section-hb-social-icons-1-margin' ][ 'mobile-unit' ] }` );
	} );
} );
