import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../../utils/set-browser-viewport';
import { publishPost } from '../../../../../../utils/publish-post';
describe( 'Off canvas menu margin settings in the customizer', () => {
	it( 'margin should apply correctly', async () => {
		const offCanvasMargin = {
			'section-header-mobile-menu-margin': {
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
		await setCustomize( offCanvasMargin );
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
		await page.waitForSelector( '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-top',
		} ).cssValueToBe( `${ offCanvasMargin[ 'section-header-mobile-menu-margin' ].tablet.top }${ offCanvasMargin[ 'section-header-mobile-menu-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe( `${ offCanvasMargin[ 'section-header-mobile-menu-margin' ].tablet.right }${ offCanvasMargin[ 'section-header-mobile-menu-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ offCanvasMargin[ 'section-header-mobile-menu-margin' ].tablet.bottom }${ offCanvasMargin[ 'section-header-mobile-menu-margin' ][ 'tablet-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-left',
		} ).cssValueToBe( `${ offCanvasMargin[ 'section-header-mobile-menu-margin' ].tablet.left }${ offCanvasMargin[ 'section-header-mobile-menu-margin' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-top',
		} ).cssValueToBe( `${ offCanvasMargin[ 'section-header-mobile-menu-margin' ].mobile.top }${ offCanvasMargin[ 'section-header-mobile-menu-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-right',
		} ).cssValueToBe( `${ offCanvasMargin[ 'section-header-mobile-menu-margin' ].mobile.right }${ offCanvasMargin[ 'section-header-mobile-menu-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-bottom',
		} ).cssValueToBe( `${ offCanvasMargin[ 'section-header-mobile-menu-margin' ].mobile.bottom }${ offCanvasMargin[ 'section-header-mobile-menu-margin' ][ 'mobile-unit' ] }` );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-header-menu, .ast-header-break-point .ast-builder-menu-mobile .main-header-menu',
			property: 'margin-left',
		} ).cssValueToBe( `${ offCanvasMargin[ 'section-header-mobile-menu-margin' ].mobile.left }${ offCanvasMargin[ 'section-header-mobile-menu-margin' ][ 'mobile-unit' ] }` );
	} );
} );
