import { createURL } from '@wordpress/e2e-test-utils';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { setCustomize } from '../../../../../utils/customize';
describe( 'Account icons in the customizer', () => {
	it( 'account icon margin for should apply correctly', async () => {
		const accountIconMargin = {
			'header-account-margin': {
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
						0: 'account',
					},
				},
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'account',
					},
				},
			},
		};
		await setCustomize( accountIconMargin );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-header-account-wrap' );
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ accountIconMargin[ 'header-account-margin' ].desktop.top }${ accountIconMargin[ 'header-account-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ accountIconMargin[ 'header-account-margin' ].desktop.right }${ accountIconMargin[ 'header-account-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ accountIconMargin[ 'header-account-margin' ].desktop.bottom }${ accountIconMargin[ 'header-account-margin' ][ 'desktop-unit' ] }` );
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ accountIconMargin[ 'header-account-margin' ].desktop.left }${ accountIconMargin[ 'header-account-margin' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ accountIconMargin[ 'header-account-margin' ].tablet.top }${ accountIconMargin[ 'header-account-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ accountIconMargin[ 'header-account-margin' ].tablet.right }${ accountIconMargin[ 'header-account-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ accountIconMargin[ 'header-account-margin' ].tablet.bottom }${ accountIconMargin[ 'header-account-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ accountIconMargin[ 'header-account-margin' ].tablet.left }${ accountIconMargin[ 'header-account-margin' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await page.waitForSelector( '.ast-header-account-wrap' );
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-top',
		} ).cssValueToBe( `${ accountIconMargin[ 'header-account-margin' ].mobile.top }${ accountIconMargin[ 'header-account-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-right',
		} ).cssValueToBe( `${ accountIconMargin[ 'header-account-margin' ].mobile.right }${ accountIconMargin[ 'header-account-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ accountIconMargin[ 'header-account-margin' ].mobile.bottom }${ accountIconMargin[ 'header-account-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-header-account-wrap',
			property: 'margin-left',
		} ).cssValueToBe( `${ accountIconMargin[ 'header-account-margin' ].mobile.left }${ accountIconMargin[ 'header-account-margin' ][ 'mobile-unit' ] }` );
	} );
} );

