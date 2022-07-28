import { setCustomize } from '../../../../utils/customize';
import { createURL,	createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
describe( 'Testing site background gradient and content background gradient setting under the customizer', () => {
	it( 'site background gradient should apply correctly', async () => {
		const siteBgGradient = {
			'site-layout-outside-bg-obj-responsive': {
				desktop: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 31%, rgb(155, 81, 224) 64%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				tablet: {
					'background-color': 'linear-gradient(239deg, rgb(178, 250, 164) 22%, rgb(240, 178, 178) 93%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				mobile: {
					'background-color': 'linear-gradient(239deg, rgb(250, 248, 165) 22%, rgb(240, 188, 177) 93%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
			},
		};

		await setCustomize( siteBgGradient );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-separate-container' );
		await expect( {
			selector: '.ast-separate-container',
			property: 'background-image',
		} ).cssValueToBe(
			`${ siteBgGradient[ 'site-layout-outside-bg-obj-responsive' ].desktop[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-separate-container',
			property: 'background-image',
		} ).cssValueToBe(
			`${ siteBgGradient[ 'site-layout-outside-bg-obj-responsive' ].tablet[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-separate-container',
			property: 'background-image',
		} ).cssValueToBe(
			`${ siteBgGradient[ 'site-layout-outside-bg-obj-responsive' ].mobile[ 'background-color' ] }`,
		);
	} );

	it( 'content background gradient should apply correctly', async () => {
		const contentBgGradient = {
			'content-bg-obj-responsive': {
				desktop: {
					'background-color': 'linear-gradient(239deg, rgb(109, 103, 0) 22%, rgb(211, 211, 211) 93%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				tablet: {
					'background-color': 'linear-gradient(239deg, rgb(241, 249, 229) 22%, rgb(240, 220, 220) 85%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				mobile: {
					'background-color': 'linear-gradient(239deg, rgb(230, 236, 250) 22%, rgb(240, 221, 221) 85%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
			},
		};
		await setCustomize( contentBgGradient );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'post', title: 'test', content: 'test background gradient' } );
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
			`${ contentBgGradient[ 'content-bg-obj-responsive' ].desktop[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-separate-container .ast-article-post',
			property: 'background-image',
		} ).cssValueToBe(
			`${ contentBgGradient[ 'content-bg-obj-responsive' ].tablet[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-separate-container .ast-article-post',
			property: 'background-image',
		} ).cssValueToBe(
			`${ contentBgGradient[ 'content-bg-obj-responsive' ].mobile[ 'background-color' ] }`,
		);
	} );
} );
