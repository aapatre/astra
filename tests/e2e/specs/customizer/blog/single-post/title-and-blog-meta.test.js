import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Single post in the customizer', () => {
	it( 'structure should apply corectly', async () => {
		const singlePostStructure = {
			'blog-single-post-structure': {
				'single-title-meta': 1,
			},
		};
		await setCustomize( singlePostStructure );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'hello world' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/hello-world' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.entry-header' );
		const titleMeta = await page.$eval( '.entry-header', ( element ) => element.getAttribute( '.ast-single-post-order' ) );
		await expect( titleMeta ).toBeNull( );
	} );
} );
