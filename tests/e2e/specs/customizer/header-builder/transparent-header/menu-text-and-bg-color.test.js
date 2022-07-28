import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Transparent header settings in the customizer', () => {
	it( 'menu text color setting should apply correctly', async () => {
		const menuTextColor = {
			'transparent-header-enable': 1,
			'transparent-menu-color-responsive': {
				desktop: 'rgb(137, 4, 68)',
				tablet: 'rgb(2, 101, 4)',
				mobile: 'rgb(102, 54, 5)',
			},
		};
		await setCustomize( menuTextColor );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'text-color' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/text-color' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header .ast-builder-menu .main-header-menu .menu-link, .ast-theme-transparent-header [CLASS*="ast-builder-menu-"] .main-header-menu .menu-item > .menu-link, .ast-theme-transparent-header .main-header-menu .menu-link' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-builder-menu .main-header-menu .menu-link, .ast-theme-transparent-header [CLASS*="ast-builder-menu-"] .main-header-menu .menu-item > .menu-link, .ast-theme-transparent-header .main-header-menu .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ menuTextColor[ 'transparent-menu-color-responsive' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-theme-transparent-header .ast-builder-menu .main-header-menu .menu-link, .ast-theme-transparent-header [CLASS*="ast-builder-menu-"] .main-header-menu .menu-item > .menu-link, .ast-theme-transparent-header .main-header-menu .menu-link' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-builder-menu .main-header-menu .menu-link, .ast-theme-transparent-header [CLASS*="ast-builder-menu-"] .main-header-menu .menu-item > .menu-link, .ast-theme-transparent-header .main-header-menu .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ menuTextColor[ 'transparent-menu-color-responsive' ].tablet }` );

		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-theme-transparent-header .ast-builder-menu .main-header-menu .menu-item > .menu-link, .ast-theme-transparent-header .ast-builder-menu .main-header-menu .menu-link, .ast-theme-transparent-header .main-header-menu .menu-link' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-builder-menu .main-header-menu .menu-item > .menu-link, .ast-theme-transparent-header .ast-builder-menu .main-header-menu .menu-link, .ast-theme-transparent-header .main-header-menu .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ menuTextColor[ 'transparent-menu-color-responsive' ].mobile }` );
	} );

	it( 'menu background color setting should apply correctly', async () => {
		const menuBackgroundColor = {
			'transparent-header-enable': 1,
			'transparent-menu-bg-color-responsive': {
				desktop: 'rgb(239, 236, 224)',
				tablet: 'rgb(238, 223, 223)',
				mobile: 'rgb(213, 235, 234)',
			},
		};
		await setCustomize( menuBackgroundColor );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'background-color' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/background-color' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-theme-transparent-header .main-header-menu .menu-link' );
		await expect( {
			selector: '.ast-theme-transparent-header .main-header-menu .menu-link',
			property: 'background-color',
		} ).cssValueToBe( `${ menuBackgroundColor[ 'transparent-menu-bg-color-responsive' ].desktop }` );

		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-theme-transparent-header .main-header-menu .menu-link' );
		await expect( {
			selector: '.ast-theme-transparent-header .main-header-menu .menu-link',
			property: 'background-color',
		} ).cssValueToBe( `${ menuBackgroundColor[ 'transparent-menu-bg-color-responsive' ].tablet }` );

		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-theme-transparent-header .main-header-menu .menu-link',
			property: 'background-color',
		} ).cssValueToBe( `${ menuBackgroundColor[ 'transparent-menu-bg-color-responsive' ].mobile }` );
	} );
} );
