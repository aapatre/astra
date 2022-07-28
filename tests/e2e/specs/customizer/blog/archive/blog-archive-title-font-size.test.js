import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Blog Archive option under the customizer', () => {
	it( 'blog Archive title font size options should apply correctly', async () => {
		const blogArchiveTitleFontSize = {
			'font-size-archive-summary-title': {
				desktop: '60',
				tablet: '40',
				mobile: '20',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
		};
		await setCustomize( blogArchiveTitleFontSize );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'Blog-post' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/author/admin' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-archive-description .ast-archive-title ' );
		await expect( {
			selector: '.ast-archive-description .ast-archive-title ',
			property: 'font-size',
		} ).cssValueToBe( `${ ( blogArchiveTitleFontSize[ 'font-size-archive-summary-title' ].desktop ) }${ blogArchiveTitleFontSize[ 'font-size-archive-summary-title' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-archive-description .ast-archive-title ',
			property: 'font-size',
		} ).cssValueToBe( `${ ( blogArchiveTitleFontSize[ 'font-size-archive-summary-title' ].tablet ) }${ blogArchiveTitleFontSize[ 'font-size-archive-summary-title' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-archive-description .ast-archive-title ',
			property: 'font-size',
		} ).cssValueToBe( `${ ( blogArchiveTitleFontSize[ 'font-size-archive-summary-title' ].mobile ) }${ blogArchiveTitleFontSize[ 'font-size-archive-summary-title' ][ 'mobile-unit' ] }` );
	} );
} );
