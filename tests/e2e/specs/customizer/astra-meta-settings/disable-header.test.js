import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../utils/publish-post';
import { setCustomize } from '../../../utils/customize';
describe( 'Disable Header meta setting', () => {
	it( 'disabling Header should work properly', async () => {
		const astraMetaSetting = {
			'ast-global-header-display': 'disabled',
			'header-desktop-items': {
				primary: {
					primary_center: {
						1: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( astraMetaSetting );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test' } );
			await page.click( '[aria-label="Astra Settings"]' );
			await page.click( '#astra_settings_meta_box > div:nth-child(3) > h2 > button' );
			await page.evaluate( () => {
				[ ...document.querySelectorAll( '.ast-sidebar-layout-meta-wrap .components-toggle-control__label' ) ].find( ( element ) => element.textContent === 'Disable Header' ).click();
			} );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#main' );
		const siteFooter = await page.$eval( '#main', ( element ) => element.getAttribute( '#ast-desktop-header' ) );
		await expect( siteFooter ).toBeNull( );
	} );
} );
