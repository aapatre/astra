import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Blog archive in the customizer', () => {
	it( 'post structure should apply correctly', async () => {
		const blogPostStructure = {
			'blog-meta': {
				0: 'comments',
				1: 'category',
				2: 'author',
				3: 'date',
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

		await page.waitForSelector( '.entry-meta' );
		const comments = await page.$eval( '.entry-meta', ( element ) => element.getAttribute( '.comments-link' ) );
		await expect( comments ).toBeNull( );

		await page.waitForSelector( '.entry-meta' );
		const category = await page.$eval( '.entry-meta', ( element ) => element.getAttribute( '.cat-links' ) );
		await expect( category ).toBeNull( );

		await page.waitForSelector( '.entry-meta' );
		const authorName = await page.$eval( '.entry-meta', ( element ) => element.getAttribute( '.posted-by.vcard.author' ) );
		await expect( authorName ).toBeNull( );

		await page.waitForSelector( '.entry-meta' );
		const date = await page.$eval( '.entry-meta', ( element ) => element.getAttribute( '.posted-on' ) );
		await expect( date ).toBeNull( );
	} );
} );
