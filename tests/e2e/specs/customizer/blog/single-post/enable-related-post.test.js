import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Enable related post option under the customizer', () => {
	it( 'enable related post options should apply correctly', async () => {
		const relatedPost = {
			'enable-related-posts': 1,
			'related-posts-title': ( 'Related Posts' ),
			'releted-posts-title-alignment': 'center',
		};
		await setCustomize( relatedPost );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'sample-post' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'test-post'	} );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-separate-container .ast-single-related-posts-container' );
		await expect( {
			selector: '.ast-related-posts-title ',
			property: 'text-align',
		} ).cssValueToBe( `${ relatedPost[ 'releted-posts-title-alignment' ] }` );
	} );
} );
