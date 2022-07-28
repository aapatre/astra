import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../../utils/set-browser-viewport';
import { publishPost } from '../../../../../../utils/publish-post';
describe( 'Off canvas menu link color settings in the customizer', () => {
	it( 'link color should apply corectly for after header', async () => {
		const offCanvasLinkColor = {
			'header-mobile-menu-color-responsive': {
				tablet: 'rgb(133, 10, 158)',
				mobile: 'rgb(6, 109, 16)',
			},
		};
		await setCustomize( offCanvasLinkColor );
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
		await page.waitForSelector( '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ offCanvasLinkColor[ 'header-mobile-menu-color-responsive' ].tablet }` );

		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ offCanvasLinkColor[ 'header-mobile-menu-color-responsive' ].mobile }` );
	} );

	it( 'active link color should apply corectly for after header', async () => {
		const offCanvasLinkColor = {
			'header-mobile-menu-a-color-responsive': {
				tablet: 'rgb(123, 6, 6)',
				mobile: 'rgb(130, 92, 3)',
			},
		};
		await setCustomize( offCanvasLinkColor );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test-1' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'page', title: 'test-2' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test-1' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-builder-menu-mobile .main-navigation .menu-item.current-menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item.current-menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ offCanvasLinkColor[ 'header-mobile-menu-a-color-responsive' ].tablet }` );

		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ offCanvasLinkColor[ 'header-mobile-menu-a-color-responsive' ].mobile }` );
	} );

	// eslint-disable-next-line eslint-comments/disable-enable-pair
	/* eslint-disable jest/no-commented-out-tests */
	// GitHub action E2E fail case
	// it( 'hover link color should apply corectly for after header', async () => {
	// 	const offCanvasLinkColor = {
	// 		'header-mobile-menu-h-color-responsive': {
	// 			tablet: 'rgb(174, 92, 25)',
	// 			mobile: 'rgb(99, 30, 163)',
	// 		},
	// 	};
	// 	await setCustomize( offCanvasLinkColor );
	// 	let ppStatus = false;
	// 	while ( false === ppStatus ) {
	// 		await createNewPost( { postType: 'page', title: 'test-1' } );
	// 		ppStatus = await publishPost();
	// 		await createNewPost( { postType: 'page', title: 'test-2' } );
	// 		ppStatus = await publishPost();
	// 	}
	// 	await page.goto( createURL( '/' ), {
	// 		waitUntil: 'networkidle0',
	// 	} );
	// 	await setBrowserViewport( 'medium' );
	// 	await page.click( '.main-header-menu-toggle' );
	// 	await page.waitForSelector( '.ast-builder-menu-mobile .main-navigation .menu-item:hover > .menu-link' );
	// 	await expect( {
	// 		selector: '.ast-builder-menu-mobile .main-navigation .menu-item:hover > .menu-link',
	// 		property: 'color',
	// 	} ).cssValueToBe( `${ offCanvasLinkColor[ 'header-mobile-menu-h-color-responsive' ].tablet }` );

	// 	await setBrowserViewport( 'small' );
	// 	await page.click( '.main-header-menu-toggle' );
	// 	await page.waitForSelector( '.ast-builder-menu-mobile .main-navigation .menu-item:hover > .menu-link' );
	// 	await expect( {
	// 		selector: '.ast-builder-menu-mobile .main-navigation .menu-item:hover > .menu-link',
	// 		property: 'color',
	// 	} ).cssValueToBe( `${ offCanvasLinkColor[ 'header-mobile-menu-h-color-responsive' ].mobile }` );
	// } );
} );
