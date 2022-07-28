import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { publishPost } from '../../../../utils/publish-post';
describe( 'Section background color option under the customizer', () => {
	it( 'section background color option should apply correctly', async () => {
		const backgroundColor = {
			'enable-related-posts': 1,
			'related-posts-background-color': 'rgb(243, 254, 215)',
		};
		await setCustomize( backgroundColor );
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
		await page.waitForSelector( '.ast-single-related-posts-container' );
		await expect( {
			selector: '.ast-single-related-posts-container',
			property: 'background-color',
		} ).cssValueToBe( `${ backgroundColor[ 'related-posts-background-color' ] }` );
	} );
} );
