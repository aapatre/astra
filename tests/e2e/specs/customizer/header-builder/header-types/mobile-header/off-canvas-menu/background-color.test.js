import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../../utils/set-browser-viewport';
import { publishPost } from '../../../../../../utils/publish-post';
describe( 'Off canvas menu background color settings in the customizer', () => {
	it( 'background color should apply correctly', async () => {
		const offCanvasBgColor = {
			'header-mobile-menu-bg-obj-responsive': {
				desktop: {
					'background-color': '',
					'background-repeat': 'repeat',
					'background-position': 'center center',
					'background-size': 'auto',
					'background-attachment': 'scroll',
					'background-type': 'color',
				},
				tablet: {
					'background-color': 'rgb(246, 235, 249)',
					'background-repeat': 'repeat',
					'background-position': 'center center',
					'background-size': 'auto',
					'background-attachment': 'scroll',
					'background-type': 'color',
				},
				mobile: {
					'background-color': 'rgb(243, 243, 185)',
					'background-repeat': 'repeat',
					'background-position': 'center center',
					'background-size': 'auto',
					'background-attachment': 'scroll',
					'background-type': 'color',
				},
			},
		};
		await setCustomize( offCanvasBgColor );
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
		await page.waitForSelector( '.ast-builder-menu-mobile .main-navigation .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe( `${ offCanvasBgColor[ 'header-mobile-menu-bg-obj-responsive' ].tablet[ 'background-color' ] }` );

		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-builder-menu-mobile .main-navigation .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe( `${ offCanvasBgColor[ 'header-mobile-menu-bg-obj-responsive' ].mobile[ 'background-color' ] }` );
	} );
} );
