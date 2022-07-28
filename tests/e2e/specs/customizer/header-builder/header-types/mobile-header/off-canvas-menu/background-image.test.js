import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../../utils/set-browser-viewport';
import { publishPost } from '../../../../../../utils/publish-post';
describe( 'Off canvas menu background image setting in customizer', () => {
	it( 'background image should apply correctly', async () => {
		const offCanvasMenuBgImage = {
			'header-mobile-menu-bg-obj-responsive': {
				tablet: {
					'background-image': 'https://pd.w.org/2022/03/359622bb65ece8859.46427938-300x200.jpeg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://pd.w.org/2022/03/359622bb65ece8859.46427938-300x200.jpeg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
			},
		};
		await setCustomize( offCanvasMenuBgImage );
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
			property: 'background-image',
		} ).cssValueToBe( 'url("' + `${ offCanvasMenuBgImage[ 'header-mobile-menu-bg-obj-responsive' ].tablet[ 'background-image' ] }` + '")' );

		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( 'url("' + `${ offCanvasMenuBgImage[ 'header-mobile-menu-bg-obj-responsive' ].mobile[ 'background-image' ] }` + '")' );
	} );
} );
