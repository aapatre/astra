import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Transparent header settings in the customizer', () => {
	it( 'background overlay color setting should apply correctly', async () => {
		const backgroundOverlay = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 0,
			'transparent-header-bg-color-responsive': {
				desktop: 'rgb(227, 244, 222)',
				tablet: 'rgb(212, 234, 247)',
				mobile: 'rgb(253, 251, 220)',
			},
		};
		await setCustomize( backgroundOverlay );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header .main-header-bar' );
		await expect( {
			selector: '.ast-theme-transparent-header .main-header-bar',
			property: 'background-color',
		} ).cssValueToBe( `${ backgroundOverlay[ 'transparent-header-bg-color-responsive' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-theme-transparent-header.ast-header-break-point .main-header-bar-wrap .main-header-bar' );
		await expect( {
			selector: '.ast-theme-transparent-header.ast-header-break-point .main-header-bar-wrap .main-header-bar',
			property: 'background-color',
		} ).cssValueToBe( `${ backgroundOverlay[ 'transparent-header-bg-color-responsive' ].tablet }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-theme-transparent-header.ast-header-break-point .main-header-bar-wrap .main-header-bar',
			property: 'background-color',
		} ).cssValueToBe( `${ backgroundOverlay[ 'transparent-header-bg-color-responsive' ].mobile }` );
	} );

	it( 'site title color setting should apply correctly', async () => {
		const siteTitleColor = {
			'transparent-header-enable': 1,
			'transparent-header-disable-latest-posts-index': 0,
			'transparent-header-color-site-title-responsive': {
				desktop: 'rgb(92, 11, 130)',
				tablet: 'rgb(101, 37, 7)',
				mobile: 'rgb(42, 78, 6)',
			},
		};
		await setCustomize( siteTitleColor );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header .site-title a' );
		await expect( {
			selector: '.ast-theme-transparent-header .site-title a',
			property: 'color',
		} ).cssValueToBe( `${ siteTitleColor[ 'transparent-header-color-site-title-responsive' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await page.waitForSelector( '.ast-theme-transparent-header .ast-builder-layout-element .ast-site-identity .site-title a' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-builder-layout-element .ast-site-identity .site-title a',
			property: 'color',
		} ).cssValueToBe( `${ siteTitleColor[ 'transparent-header-color-site-title-responsive' ].tablet }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-builder-layout-element .ast-site-identity .site-title a',
			property: 'color',
		} ).cssValueToBe( `${ siteTitleColor[ 'transparent-header-color-site-title-responsive' ].mobile }` );
	} );
} );
