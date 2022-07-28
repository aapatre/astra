import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Blog archive in the customizer', () => {
	it( 'post structure should apply correctly', async () => {
		const blogPostStructure = {
			'blog-post-structure': {
				'title-meta': 0,
			},
		};
		await setCustomize( blogPostStructure );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.click( '#wp-block-search__input-1' );
		await page.keyboard.type( 'test' );
		await page.keyboard.press( 'Enter' );
		await page.waitForSelector( '.ast-separate-container .site-main > .ast-row' );
		const postStructure = await page.$eval( '.ast-separate-container .site-main > .ast-row', ( element ) => element.getAttribute( '.entry-header' ) );
		await expect( postStructure ).toBeNull( );
	} );
} );
