import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../../utils/set-browser-viewport';
import { publishPost } from '../../../../../../utils/publish-post';
describe( 'Off canvas menu spacing settings in the customizer', () => {
	it( 'spacing should apply corectly for after header', async () => {
		const offCanvasSpacing = {
			'header-mobile-menu-menu-spacing': {
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
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( offCanvasSpacing );
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
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ offCanvasSpacing[ 'header-mobile-menu-menu-spacing' ].tablet.top }${ offCanvasSpacing[ 'header-mobile-menu-menu-spacing' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-right',
		} ).cssValueToBe( `${ offCanvasSpacing[ 'header-mobile-menu-menu-spacing' ].tablet.right }${ offCanvasSpacing[ 'header-mobile-menu-menu-spacing' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ offCanvasSpacing[ 'header-mobile-menu-menu-spacing' ].tablet.bottom }${ offCanvasSpacing[ 'header-mobile-menu-menu-spacing' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-left',
		} ).cssValueToBe( `${ offCanvasSpacing[ 'header-mobile-menu-menu-spacing' ].tablet.left }${ offCanvasSpacing[ 'header-mobile-menu-menu-spacing' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-top',
		} ).cssValueToBe( `${ offCanvasSpacing[ 'header-mobile-menu-menu-spacing' ].mobile.top }${ offCanvasSpacing[ 'header-mobile-menu-menu-spacing' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-right',
		} ).cssValueToBe( `${ offCanvasSpacing[ 'header-mobile-menu-menu-spacing' ].mobile.right }${ offCanvasSpacing[ 'header-mobile-menu-menu-spacing' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-bottom',
		} ).cssValueToBe( `${ offCanvasSpacing[ 'header-mobile-menu-menu-spacing' ].mobile.bottom }${ offCanvasSpacing[ 'header-mobile-menu-menu-spacing' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu .menu-item > .menu-link',
			property: 'padding-left',
		} ).cssValueToBe( `${ offCanvasSpacing[ 'header-mobile-menu-menu-spacing' ].mobile.left }${ offCanvasSpacing[ 'header-mobile-menu-menu-spacing' ][ 'mobile-unit' ] }` );
	} );
} );
