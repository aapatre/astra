import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Section Content color option under the customizer', () => {
	it( 'content color option should apply correctly', async () => {
		const contentColor = {
			'enable-related-posts': 1,
			'related-posts-text-color': 'rgb(75, 0, 0)',
			'related-posts-meta-color': 'rgb(0, 34, 8)',
		};
		await setCustomize( contentColor );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'sample-post' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'test-post' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-related-post-content .entry-header .ast-related-post-title a' );
		await expect( {
			selector: '.ast-related-post-content .entry-header .ast-related-post-title a',
			property: 'color',
		} ).cssValueToBe( `${ contentColor[ 'related-posts-text-color' ] }` );

		await page.waitForSelector( '.ast-related-post-content .entry-meta' );
		await expect( {
			selector: '.ast-related-post-content .entry-meta',
			property: 'color',
		} ).cssValueToBe( `${ contentColor[ 'related-posts-meta-color' ] }` );
	} );
} );
