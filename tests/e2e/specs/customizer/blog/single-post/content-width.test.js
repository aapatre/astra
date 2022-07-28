import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { publishPost } from '../../../../utils/publish-post';
describe( 'Single post in the customizer', () => {
	it( 'content width default should apply corectly', async () => {
		const contentWidth = {
			'blog-single-width': 'default',
			'blog-single-max-width': 1200,
		};
		await setCustomize( contentWidth );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'hello world' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/hello-world' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.single-post .site-content > .ast-container' );
		await expect( {
			selector: '.single-post .site-content > .ast-container',
			property: 'max-width',
		} ).cssValueToBe( `${ contentWidth[ 'blog-single-max-width' ] + 40 }` + 'px' );
	} );

	it( 'content width custom should apply corectly', async () => {
		const contentWidth = {
			'blog-single-width': 'custom',
			'blog-single-max-width': 800,
		};
		await setCustomize( contentWidth );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'hello world' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/hello-world' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.single-post .site-content > .ast-container' );
		await expect( {
			selector: '.single-post .site-content > .ast-container',
			property: 'max-width',
		} ).cssValueToBe( `${ contentWidth[ 'blog-single-max-width' ] }` + 'px' );
	} );
} );

