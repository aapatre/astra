import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { publishPost } from '../../../../utils/publish-post';
describe( 'Section title color option under the customizer', () => {
	it( 'section title color option should apply correctly', async () => {
		const titleColor = {
			'enable-related-posts': 1,
			'related-posts-title-color': 'rgb(184, 5, 97)',
		};
		await setCustomize( titleColor );
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
		await page.waitForSelector( '.ast-related-posts-title' );
		await expect( {
			selector: '.ast-related-posts-title',
			property: 'color',
		} ).cssValueToBe( `${ titleColor[ 'related-posts-title-color' ] }` );
	} );
} );
