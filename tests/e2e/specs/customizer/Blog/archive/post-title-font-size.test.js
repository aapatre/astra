import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Blog Archive option under the customizer', () => {
	it( 'blog archive post font size options should apply correctly', async () => {
		const blogPostTitleFontSize = {
			'font-size-page-title': {
				desktop: '60',
				tablet: '40',
				mobile: '20',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( blogPostTitleFontSize );
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
		await page.waitForSelector( '.entry-title' );
		await expect( {
			selector: '.entry-title',
			property: 'font-size',
		} ).cssValueToBe( `${ blogPostTitleFontSize[ 'font-size-page-title' ].desktop }${ blogPostTitleFontSize[ 'font-size-page-title' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.entry-title',
			property: 'font-size',
		} ).cssValueToBe( `${ blogPostTitleFontSize[ 'font-size-page-title' ].tablet }${ blogPostTitleFontSize[ 'font-size-page-title' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.entry-title',
			property: 'font-size',
		} ).cssValueToBe( `${ blogPostTitleFontSize[ 'font-size-page-title' ].mobile }${ blogPostTitleFontSize[ 'font-size-page-title' ][ 'mobile-unit' ] }` );
	} );
} );
