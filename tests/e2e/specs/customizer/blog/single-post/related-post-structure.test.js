import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Single post option under the customizer', () => {
	it( 'related post structure option should apply correctly', async () => {
		const relatedPostStructure = {
			'enable-related-posts': 1,
			'related-posts-structure': {
				'title-meta': 1,
			},
		};
		await setCustomize( relatedPostStructure );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test-post' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'sample-post' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/sample-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-related-post-content' );
		const relatedTitleMeta = await page.$eval( '.ast-related-post-content', ( element ) => element.getAttribute( '.entry-header .entry-meta' ) );
		await expect( relatedTitleMeta ).toBeNull( );
	} );
} );
