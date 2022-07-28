import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'Related post option under the customizer', () => {
	it( 'post title font option should apply correctly', async () => {
		const postTitleFont = {
			'enable-related-posts': 1,
			'related-posts-title-font-family': "'Kirang Haerang', display",
			'related-posts-title-text-transform': 'uppercase',
			'related-posts-title-font-weight': '400',
			'related-posts-title-font-size': {
				desktop: 60,
				tablet: 40,
				mobile: 20,
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'related-posts-title-line-height': 0.99,
		};
		await setCustomize( postTitleFont );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'sample-post' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'post', title: 'test-post' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( 'sample-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-related-post-content .entry-header .ast-related-post-title a' );
		await expect( {
			selector: '.ast-related-post-content .entry-header .ast-related-post-title a',
			property: 'font-family',
		} ).cssValueToBe( `${ postTitleFont[ 'related-posts-title-font-family' ] }` );

		await expect( {
			selector: '.ast-related-post-content .entry-header .ast-related-post-title a',
			property: 'text-transform',
		} ).cssValueToBe( `${ postTitleFont[ 'related-posts-title-text-transform' ] }` );

		await expect( {
			selector: '.ast-related-post-content .entry-header .ast-related-post-title a',
			property: 'font-weight',
		} ).cssValueToBe( `${ postTitleFont[ 'related-posts-title-font-weight' ] }` );

		await expect( {
			selector: '.ast-related-post-content .entry-header .ast-related-post-title a',
			property: 'font-size',
		} ).cssValueToBe( `${ postTitleFont[ 'related-posts-title-font-size' ].desktop }${ postTitleFont[ 'related-posts-title-font-size' ][ 'desktop-unit' ] }` );

		// eslint-disable-next-line eslint-comments/disable-enable-pair
		/* eslint-disable jest/no-commented-out-tests */
		// GitHub action E2E fail case
		// await setBrowserViewport( 'medium' );
		// await expect( {
		// 	selector: '.ast-related-post-content .entry-header .ast-related-post-title a',
		// 	property: 'font-size',
		// } ).cssValueToBe( `${ postTitleFont[ 'related-posts-title-font-size' ].tablet }${ postTitleFont[ 'related-posts-title-font-size' ][ 'tablet-unit' ] }` );

		// await setBrowserViewport( 'small' );
		// await expect( {
		// 	selector: '.ast-related-post-content .entry-header .ast-related-post-title a',
		// 	property: 'font-size',
		// } ).cssValueToBe( `${ postTitleFont[ 'related-posts-title-font-size' ].mobile }${ postTitleFont[ 'related-posts-title-font-size' ][ 'mobile-unit' ] }` );

		await expect( {
			selector: '.ast-related-post-content .entry-header .ast-related-post-title a',
			property: 'line-height',
		} ).cssValueToBe( `${ postTitleFont[ 'related-posts-title-line-height' ] * postTitleFont[ 'related-posts-title-font-size' ].desktop }` + 'px' );
	} );
} );
