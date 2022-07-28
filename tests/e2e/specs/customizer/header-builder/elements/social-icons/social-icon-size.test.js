import { createURL, setBrowserViewport } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
describe( 'Social Icons in the customizer', () => {
	it( 'social icon size for desktop should apply correctly', async () => {
		const socialIconSize = {
			'header-social-1-size': {
				desktop: '80px',
			},
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( socialIconSize );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-header-social-1-wrap .ast-builder-social-element svg' );

		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element svg',
			property: 'width',
		} ).cssValueToBe( `${ socialIconSize[ 'header-social-1-size' ].desktop }` );

		await expect( {
			selector: '.ast-header-social-1-wrap .ast-builder-social-element svg',
			property: 'height',
		} ).cssValueToBe( `${ socialIconSize[ 'header-social-1-size' ].desktop }` );
	} );
	it( 'social icon size for tablet should apply correctly', async () => {
		const socialIconSize = {
			'header-social-1-size': {
				tablet: '30px',
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialIconSize );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element svg' );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element svg',
			property: 'width',
		} ).cssValueToBe( `${ socialIconSize[ 'header-social-1-size' ].tablet }` );

		await expect( {
			selector: '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element svg',
			property: 'height',
		} ).cssValueToBe( `${ socialIconSize[ 'header-social-1-size' ].tablet }` );
	} );
	it( 'social icon size for mobile should apply correctly', async () => {
		const socialIconSize = {
			'header-social-1-size': {
				mobile: '17px',
			},
			'header-mobile-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialIconSize );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element svg' );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element svg',
			property: 'width',
		} ).cssValueToBe( `${ socialIconSize[ 'header-social-1-size' ].mobile }` );

		await expect( {
			selector: '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element svg',
			property: 'height',
		} ).cssValueToBe( `${ socialIconSize[ 'header-social-1-size' ].mobile }` );
	} );
} );
