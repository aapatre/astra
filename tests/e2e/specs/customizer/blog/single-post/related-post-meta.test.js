import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Single post font option under the customizer', () => {
	it( 'related post meta option should apply correctly', async () => {
		const relatedPostMeta = {
			'enable-related-posts': 1,
			'related-posts-meta-structure': {
				0: 'comments',
				1: 'category',
				2: 'author',
				3: 'date',
			},
		};
		await setCustomize( relatedPostMeta );
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
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector( '.entry-header' );
		const Comment = await page.$eval( '.entry-header', ( element ) => element.getAttribute( '.comments-link' ) );
		await expect( Comment ).toBeNull();

		await page.waitForSelector( '.entry-header' );
		const Category = await page.$eval( '.entry-header', ( element ) => element.getAttribute( '.cat-links' ) );
		await expect( Category ).toBeNull();

		await page.waitForSelector( '.entry-header' );
		const Author = await page.$eval( '.entry-header', ( element ) => element.getAttribute( '.author-name' ) );
		await expect( Author ).toBeNull();

		await page.waitForSelector( '.entry-header' );
		const Date = await page.$eval( '.entry-header', ( element ) => element.getAttribute( 'posted-on' ) );
		await expect( Date ).toBeNull();
	} );
} );
