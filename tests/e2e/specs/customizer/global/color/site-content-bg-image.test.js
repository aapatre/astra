import { setCustomize } from '../../../../utils/customize';
import { createURL,	createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Testing site background image and content background image setting under the customizer', () => {
	it( 'site background image should apply correctly', async () => {
		const siteBgImage = {
			'site-layout-outside-bg-obj-responsive': {
				desktop: {
					'background-image': 'https://pd.w.org/2022/03/427622bb63c4a43e4.03862800-300x200.jpeg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				tablet: {
					'background-image': 'https://pd.w.org/2022/03/359622bb65ece8859.46427938-300x200.jpeg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://pd.w.org/2022/03/254622bb604263235.63460046-200x300.jpeg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
			},
		};

		await setCustomize( siteBgImage );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-separate-container' );
		await expect( {
			selector: '.ast-separate-container',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ siteBgImage[ 'site-layout-outside-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-separate-container',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ siteBgImage[ 'site-layout-outside-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-separate-container',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ siteBgImage[ 'site-layout-outside-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }`,
		);
	} );

	it( 'content background image should apply correctly', async () => {
		const contentBgImage = {
			'content-bg-obj-responsive': {
				desktop: {
					'background-image': 'https://pd.w.org/2022/03/532622cf651b6f630.19503963-200x300.jpg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				tablet: {
					'background-image': 'https://pd.w.org/2022/03/684622d0af70938e9.11913397-300x226.jpg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://pd.w.org/2022/03/623622bb5e8c163d5.06448947-300x200.jpeg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
			},
		};
		await setCustomize( contentBgImage );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test', content: 'test background image' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-separate-container .ast-article-post' );
		await expect( {
			selector: '.ast-separate-container .ast-article-post',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ contentBgImage[ 'content-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-separate-container .ast-article-post',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ contentBgImage[ 'content-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-separate-container .ast-article-post',
			property: 'background-image',
		} ).cssValueToBe(
			`url("${ contentBgImage[ 'content-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }`,
		);
	} );
} );
