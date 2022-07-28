import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../../utils/set-browser-viewport';
import { publishPost } from '../../../../../../utils/publish-post';
describe( 'Off canvas menu item divider settings in the customizer', () => {
	it( 'item divider size and color for tablet should apply correctly', async () => {
		const offCanvas = {
			'header-mobile-menu-submenu-item-border': true,
			'header-mobile-menu-submenu-item-b-size': '7',
			'header-mobile-menu-submenu-item-b-color': 'rgb(10, 123, 10)',
		};
		await setCustomize( offCanvas );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test-1' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'page', title: 'test-2' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-hfb-header .ast-builder-menu-mobile .main-navigation .main-header-menu, .ast-hfb-header .ast-mobile-header-content .ast-builder-menu-mobile .main-navigation .main-header-menu' );
		await expect( {
			selector: '.ast-hfb-header .ast-builder-menu-mobile .main-navigation .main-header-menu, .ast-hfb-header .ast-mobile-header-content .ast-builder-menu-mobile .main-navigation .main-header-menu',
			property: 'border-top-width',
		} ).cssValueToBe( `${ offCanvas[ 'header-mobile-menu-submenu-item-b-size' ] }` + 'px' );

		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-hfb-header .ast-builder-menu-mobile .main-navigation .main-header-menu, .ast-hfb-header .ast-builder-menu-mobile .main-navigation .main-header-menu, .ast-hfb-header .ast-mobile-header-content .ast-builder-menu-mobile .main-navigation .main-header-menu',
			property: 'border-color',
		} ).cssValueToBe( `${ offCanvas[ 'header-mobile-menu-submenu-item-b-color' ] }` );
	} );

	it( 'item divider size and color for mobile should apply correctly', async () => {
		const offCanvas = {
			'header-mobile-menu-submenu-item-border': true,
			'header-mobile-menu-submenu-item-b-size': '6',
			'header-mobile-menu-submenu-item-b-color': 'rgb(255, 51, 51)',
		};
		await setCustomize( offCanvas );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test-1' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'page', title: 'test-2' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-hfb-header .ast-builder-menu-mobile .main-navigation .main-header-menu, .ast-hfb-header .ast-mobile-header-content .ast-builder-menu-mobile .main-navigation .main-header-menu' );
		await expect( {
			selector: '.ast-hfb-header .ast-builder-menu-mobile .main-navigation .main-header-menu, .ast-hfb-header .ast-mobile-header-content .ast-builder-menu-mobile .main-navigation .main-header-menu',
			property: 'border-top-width',
		} ).cssValueToBe( `${ offCanvas[ 'header-mobile-menu-submenu-item-b-size' ] }` + 'px' );

		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-hfb-header .ast-builder-menu-mobile .main-navigation .main-header-menu, .ast-hfb-header .ast-mobile-header-content .ast-builder-menu-mobile .main-navigation .main-header-menu',
			property: 'border-color',
		} ).cssValueToBe( `${ offCanvas[ 'header-mobile-menu-submenu-item-b-color' ] }` );
	} );
} );
