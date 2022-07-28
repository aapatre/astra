import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Transparent header settings in the customizer', () => {
	it( 'social icon text color setting should apply correctly', async () => {
		const socialIconTextColor = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 0,
			'header-social-1-label-toggle': 1,
			'transparent-header-social-icons-color': {
				desktop: 'rgb(6, 65, 113)',
				tablet: 'rgb(43, 103, 3)',
				mobile: 'rgb(142, 71, 7)',
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
		await setCustomize( socialIconTextColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element svg' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element svg',
			property: 'fill',
		} ).cssValueToBe( `${ socialIconTextColor[ 'transparent-header-social-icons-color' ].desktop }` );

		await page.waitForSelector( '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element .social-item-label' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element .social-item-label',
			property: 'color',
		} ).cssValueToBe( `${ socialIconTextColor[ 'transparent-header-social-icons-color' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element svg' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element svg',
			property: 'fill',
		} ).cssValueToBe( `${ socialIconTextColor[ 'transparent-header-social-icons-color' ].tablet }` );

		await page.waitForSelector( '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element .social-item-label' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element .social-item-label',
			property: 'color',
		} ).cssValueToBe( `${ socialIconTextColor[ 'transparent-header-social-icons-color' ].tablet }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element svg',
			property: 'fill',
		} ).cssValueToBe( `${ socialIconTextColor[ 'transparent-header-social-icons-color' ].mobile }` );

		await page.waitForSelector( '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element .social-item-label' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element .social-item-label',
			property: 'color',
		} ).cssValueToBe( `${ socialIconTextColor[ 'transparent-header-social-icons-color' ].mobile }` );
	} );

	it( 'social icon background color setting should apply correctly', async () => {
		const socialIconBgColor = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 0,
			'header-social-1-label-toggle': 1,
			'transparent-header-social-icons-bg-color': {
				desktop: 'rgb(206, 236, 200)',
				tablet: 'rgb(249, 214, 217)',
				mobile: 'rgb(213, 220, 252)',
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
		await setCustomize( socialIconBgColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe( `${ socialIconBgColor[ 'transparent-header-social-icons-bg-color' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe( `${ socialIconBgColor[ 'transparent-header-social-icons-bg-color' ].tablet }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe( `${ socialIconBgColor[ 'transparent-header-social-icons-bg-color' ].mobile }` );
	} );

	it( 'search icon color setting should apply correctly', async () => {
		const searchIconColor = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 0,
			'transparent-header-search-icon-color': 'rgb(169, 11, 113)',
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'search',
					},
				},
			},
		};
		await setCustomize( searchIconColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header .ast-header-search .ast-icon' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-search .ast-icon',
			property: 'color',
		} ).cssValueToBe( `${ searchIconColor[ 'transparent-header-search-icon-color' ] }` );
	} );
} );
