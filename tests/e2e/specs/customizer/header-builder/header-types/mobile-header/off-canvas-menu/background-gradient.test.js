import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../../utils/set-browser-viewport';
import { publishPost } from '../../../../../../utils/publish-post';
describe( 'Off canvas menu background gradient setting in customizer', () => {
	it( 'background gradient should apply correctly', async () => {
		const offCanvasMenuGradient = {
			'header-mobile-menu-bg-obj-responsive': {
				tablet: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 0%, rgb(255, 255, 255) 13%, rgb(155, 81, 224) 47%, rgb(188, 208, 146) 62%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				mobile: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 0%, rgb(223, 196, 233) 66%, rgb(12, 10, 10) 93%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
			},
		};
		await setCustomize( offCanvasMenuGradient );
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
		} ).cssValueToBe( `${ offCanvasMenuGradient[ 'header-mobile-menu-bg-obj-responsive' ].tablet[ 'background-color' ] }` );

		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( `${ offCanvasMenuGradient[ 'header-mobile-menu-bg-obj-responsive' ].mobile[ 'background-color' ] }` );
	} );
} );
